import { useState, useCallback, useRef } from 'react';
import { FileUpload, Chunk, ChunkStatus } from '../types';
import { CHUNK_SIZE, SIMULTANEOUS_UPLOADS } from '../constants';

export const useFileUploader = () => {
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([]);
  
  // Refs to manage upload queue and state without causing re-renders
  const fileUploadsRef = useRef<FileUpload[]>([]);
  fileUploadsRef.current = fileUploads;
  const uploadQueueRef = useRef<{ fileId: string; chunkId: number }[]>([]);
  const activeUploadsRef = useRef(0);

  // Function to update the progress and status of a specific chunk and the overall file
  const updateChunkState = (fileId: string, chunkId: number, status: ChunkStatus, progress: number) => {
    setFileUploads(prev => prev.map(fu => {
      if (fu.id === fileId) {
        const newChunks = fu.chunks.map(c => {
          if (c.id === chunkId) {
            return { ...c, progress, status };
          }
          return c;
        });
        
        const totalProgress = newChunks.reduce((acc, chunk) => acc + chunk.progress, 0) / newChunks.length;
        const isCompleted = newChunks.every(c => c.status === ChunkStatus.Success);
        const hasError = newChunks.some(c => c.status === ChunkStatus.Error);
        
        let fileStatus: FileUpload['status'] = 'uploading';
        if (isCompleted) fileStatus = 'completed';
        else if (hasError) fileStatus = 'error';

        return { ...fu, chunks: newChunks, progress: totalProgress, status: fileStatus };
      }
      return fu;
    }));
  };

  // The core function to upload a single chunk using XMLHttpRequest for progress tracking
  const uploadChunk = (fileUpload: FileUpload, chunk: Chunk) => {
    return new Promise<void>((resolve, reject) => {
      const { id: fileId, file } = fileUpload;
      const { id: chunkId, blob } = chunk;
      
      // This endpoint points to the Go backend service.
      // Ensure the Go backend is running on localhost:8080.
      const API_ENDPOINT = `http://localhost:8080/api/upload/${fileId}`;

      const xhr = new XMLHttpRequest();
      xhr.open('POST', API_ENDPOINT, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          updateChunkState(fileId, chunkId, ChunkStatus.Uploading, progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          updateChunkState(fileId, chunkId, ChunkStatus.Success, 100);
          resolve();
        } else {
          console.error(`[Upload Error] Chunk ${chunkId} for ${file.name} failed. Status: ${xhr.status} ${xhr.statusText}`);
          updateChunkState(fileId, chunkId, ChunkStatus.Error, 0);
          reject(new Error(xhr.statusText));
        }
      };

      xhr.onerror = () => {
        console.error(`[Upload Error] Network error for chunk ${chunkId} of ${file.name}.`);
        updateChunkState(fileId, chunkId, ChunkStatus.Error, 0);
        reject(new Error('Network Error'));
      };

      const formData = new FormData();
      formData.append('chunk', blob, `${file.name}-chunk-${chunkId}`);
      formData.append('index', String(chunkId));
      formData.append('total', String(fileUpload.chunks.length));
      formData.append('filename', file.name); // Add original filename for the backend
      
      // Set initial status to 'Uploading' before sending the request
      updateChunkState(fileId, chunkId, ChunkStatus.Uploading, 0);
      xhr.send(formData);
    });
  };

  const processQueue = useCallback(() => {
    while (activeUploadsRef.current < SIMULTANEOUS_UPLOADS && uploadQueueRef.current.length > 0) {
      const nextUpload = uploadQueueRef.current.shift();
      if (nextUpload) {
        const { fileId, chunkId } = nextUpload;

        const fileUpload = fileUploadsRef.current.find(f => f.id === fileId);
        const chunk = fileUpload?.chunks.find(c => c.id === chunkId);
        
        if (fileUpload && chunk) {
            activeUploadsRef.current++;
            
            uploadChunk(fileUpload, chunk)
              .catch(error => {
                // Error is logged inside uploadChunk
              })
              .finally(() => {
                activeUploadsRef.current--;
                processQueue();
              });
        }
      }
    }
  }, []); // Empty deps because we use refs to access dynamic data

  const addFiles = useCallback((files: File[]) => {
    const newFileUploads: FileUpload[] = files.map(file => {
      const fileId = `${file.name}-${file.size}-${Date.now()}`;
      const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
      const chunks: Chunk[] = Array.from({ length: chunkCount }, (_, i) => {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const blob = file.slice(start, end);
        return {
          id: i,
          blob,
          status: ChunkStatus.Pending,
          progress: 0,
        };
      });

      return {
        id: fileId,
        file,
        chunks,
        progress: 0,
        status: 'pending',
      };
    });
    
    setFileUploads(prev => [...prev, ...newFileUploads]);

    const newQueueItems = newFileUploads.flatMap(fu => fu.chunks.map(c => ({ fileId: fu.id, chunkId: c.id })));
    uploadQueueRef.current.push(...newQueueItems);
    
    processQueue();

  }, [processQueue]);

  return { fileUploads, addFiles };
};
