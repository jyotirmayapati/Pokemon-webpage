import React from 'react';

const PokemonCardSkeleton: React.FC = () => (
  <div className="p-4 border rounded shadow-md w-48 h-64 bg-gray-300 animate-pulse">
    <div className="h-32 bg-gray-400 mb-4"></div>
    <div className="h-4 bg-gray-400 mb-2"></div>
    <div className="h-4 bg-gray-400"></div>
  </div>
);

export default PokemonCardSkeleton;
