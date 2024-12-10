import React from 'react';

const BubbleLoader: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 animate-pulse">
      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      <div className="w-3 h-3 bg-red-500 rounded-full animation-delay-200"></div>
      <div className="w-3 h-3 bg-red-500 rounded-full animation-delay-400"></div>
    </div>
  );
};

export default BubbleLoader;

