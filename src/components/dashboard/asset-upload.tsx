import React from 'react';
import clsx from 'clsx';
import { AssetHook } from '../hooks/assetupload-hook';
import { FileUploadProps } from '../../../types';

export function FileUpload({ 
  logo, 
  title, 
  maxFileSize, 
  className,  
  previousFile
}: FileUploadProps) {
  const { backgroundMutation } = AssetHook();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await backgroundMutation.mutateAsync(file);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <label
        htmlFor="dropzone-file"
        className={
          "relative flex flex-col items-center justify-center w-full h-40 " +
          "border-2 border-dashed rounded-lg cursor-pointer overflow-hidden " +
          "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 " +
          "border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
        }
      >
        {previousFile && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{ 
              backgroundImage: `url(${previousFile})`,
            }}
          />
        )}
        <div className="relative flex flex-col items-center justify-center pt-3 pb-4 z-10">
          {logo && (
            <div className="w-6 h-6 mb-3 text-primary dark:text-primary">
              {logo}
            </div>
          )}
          {title && (
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400 font-semibold">
              {title}
            </p>
          )}
          {maxFileSize && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {maxFileSize}
            </p>
          )}
        </div>
        <input 
          id="dropzone-file" 
          type="file" 
          className="hidden" 
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
