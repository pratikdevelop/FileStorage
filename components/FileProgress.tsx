
import React from 'react';
import { FileUpload, ChunkStatus } from '../types';
import { FileIcon } from './icons/FileIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

const getStatusColor = (status: ChunkStatus) => {
  switch (status) {
    case ChunkStatus.Uploading:
      return 'bg-brand-blue';
    case ChunkStatus.Success:
      return 'bg-success';
    case ChunkStatus.Error:
      return 'bg-error';
    case ChunkStatus.Pending:
    default:
      return 'bg-gray-lighter';
  }
};

const ChunkProgress: React.FC<{ status: ChunkStatus }> = ({ status }) => {
  const color = getStatusColor(status);
  return <div className={`w-2 h-2 rounded-sm ${color} transition-colors duration-300`} title={`Chunk status: ${status}`}></div>;
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};


export const FileProgress: React.FC<{ fileUpload: FileUpload }> = ({ fileUpload }) => {
  return (
    <div className="bg-gray-light p-4 rounded-md">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <FileIcon className="w-10 h-10 text-gray-400" />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-center">
             <p className="text-sm font-medium text-gray-200 truncate pr-2">{fileUpload.file.name}</p>
             {fileUpload.status === 'completed' && <CheckCircleIcon className="w-5 h-5 text-success" />}
             {fileUpload.status === 'error' && <XCircleIcon className="w-5 h-5 text-error" />}
          </div>
         
          <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
             <span>{formatBytes(fileUpload.file.size)}</span>
             <span className="text-gray-500">&bull;</span>
             <span>{Math.round(fileUpload.progress)}%</span>
          </div>

          <div className="w-full bg-gray-lighter rounded-full h-1.5 mt-2">
            <div
              className="bg-brand-blue h-1.5 rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${fileUpload.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-0.5">
        {fileUpload.chunks.map(chunk => (
          <ChunkProgress key={chunk.id} status={chunk.status} />
        ))}
      </div>
    </div>
  );
};
