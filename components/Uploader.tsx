
import React, { useState, useCallback, useRef } from 'react';
import { useFileUploader } from '../hooks/useFileUploader';
import { FileUpload } from '../types';
import { FileProgress } from './FileProgress';
import { UploadCloudIcon } from './icons/UploadCloudIcon';

const Uploader: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { fileUploads, addFiles } = useFileUploader();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };


  return (
    <div className="bg-gray-medium rounded-lg shadow-xl p-6 transition-all duration-300">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-md p-8 text-center transition-colors duration-300 ${
          isDragging ? 'border-brand-blue bg-gray-light' : 'border-gray-lighter hover:border-gray-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center justify-center space-y-4">
          <UploadCloudIcon className="w-16 h-16 text-gray-500" />
          <p className="text-gray-300">
            <span className="font-semibold text-brand-blue cursor-pointer" onClick={triggerFileSelect}>
              Click to upload
            </span> or drag and drop
          </p>
          <p className="text-xs text-gray-400">Maximum file size 100GB</p>
        </div>
      </div>

      {fileUploads.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-200">Uploads</h2>
          {fileUploads.map((fileUpload) => (
            <FileProgress key={fileUpload.id} fileUpload={fileUpload} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Uploader;
