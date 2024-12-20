import React from 'react';

interface PokemonTypeFilterProps {
  availableTypes: string[];
  selectedTypes: string[];
  onTypeSelect: (type: string) => void;
}

const PokemonTypeFilter: React.FC<PokemonTypeFilterProps> = ({
  availableTypes,
  selectedTypes,
  onTypeSelect,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {availableTypes.map((type) => (
        <button
          key={type}
          onClick={() => onTypeSelect(type)}
          className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform ease-in-out ${
            selectedTypes.includes(type)
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-800 hover:bg-purple-500 hover:text-white'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default PokemonTypeFilter;
