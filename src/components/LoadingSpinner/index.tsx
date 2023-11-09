// LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-opacity-75 bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
    </div>
  );
};

export {LoadingSpinner};