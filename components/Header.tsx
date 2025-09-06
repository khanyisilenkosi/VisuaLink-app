import React from 'react';
import { Icon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
        <div className="inline-flex items-center justify-center">
            <Icon type="logo" className="h-10 w-10 text-fuchsia-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-400 ml-3">
                VisuaLink
            </h1>
        </div>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            Link your visuals with AI. Upload an image, describe your vision, and watch it transform.
        </p>
    </header>
  );
};