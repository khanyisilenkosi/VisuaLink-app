import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "w-full flex items-center justify-center text-lg font-semibold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "text-white bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-700 hover:to-indigo-700 focus:ring-fuchsia-400 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 shadow-lg hover:shadow-fuchsia-500/30",
    secondary: "text-gray-300 bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 disabled:bg-gray-800 disabled:text-gray-500"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  );
};