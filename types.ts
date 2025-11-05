
export enum ChunkStatus {
  Pending = 'pending',
  Uploading = 'uploading',
  Success = 'success',
  Error = 'error',
}

export interface Chunk {
  id: number;
  blob: Blob;
  status: ChunkStatus;
  progress: number; // 0-100
}

export interface FileUpload {
  id: string;
  file: File;
  chunks: Chunk[];
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'completed' | 'error';
}
