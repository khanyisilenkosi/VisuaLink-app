
import React from 'react';
import type { GeneratedContent } from '../types';
import { Icon } from './Icon';

interface ResultDisplayProps {
  generatedContent: GeneratedContent | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedContent }) => {
  if (!generatedContent) {
    return (
      <div className="w-full aspect-square bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-700 flex flex-col items-center justify-center text-center text-gray-500 p-4">
        <Icon type="image" className="h-12 w-12 mb-2" />
        <h3 className="font-semibold text-lg text-gray-400">Your new graphic will appear here</h3>
        <p className="text-sm">Upload an image and write a prompt to get started.</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-square bg-gray-900 rounded-lg overflow-hidden animate-fade-in">
      {generatedContent.imageUrl && (
        <img src={generatedContent.imageUrl} alt="Generated graphic" className="w-full h-full object-contain" />
      )}
      {generatedContent.text && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-sm">
          <p>{generatedContent.text}</p>
        </div>
      )}
    </div>
  );
};