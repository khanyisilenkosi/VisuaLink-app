
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">2. Describe Your Graphic</label>
        <textarea
            id="prompt"
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder="e.g., 'Add a retro 80s synthwave sunset and the text `COSMIC DRIFT` in a neon font'"
            rows={5}
            className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors duration-300 text-gray-200 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
    </div>
  );
};