import React, { useRef } from 'react';
import { Icon } from './Icon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  uploadedImagePreview: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-400 mb-2">1. Upload Image</label>
      <div
        className="relative w-full aspect-square bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-600 hover:border-fuchsia-500 transition-colors duration-300 flex items-center justify-center cursor-pointer group"
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {uploadedImagePreview ? (
          <img src={uploadedImagePreview} alt="Uploaded preview" className="object-cover w-full h-full rounded-lg" />
        ) : (
          <div className="text-center text-gray-500">
            <Icon type="upload" className="mx-auto h-12 w-12 group-hover:text-fuchsia-500 transition-colors duration-300" />
            <p className="mt-2 text-sm">Click to browse or drag & drop</p>
            <p className="text-xs">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};
