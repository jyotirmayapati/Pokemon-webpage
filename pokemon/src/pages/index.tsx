import React, { useState } from 'react';
import PokedexGrid from '../components/PokedexGrid';
import PokemonTypeFilter from '../components/PokemonTypeFilter';

const HomePage: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeSelect = (type: string) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-screen-xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-8 drop-shadow-lg">
          Pokemon Explorer
        </h1>

        <div className="mb-8">
          <PokemonTypeFilter
            availableTypes={['fire', 'water', 'grass', 'electric', 'flying']}
            selectedTypes={selectedTypes}
            onTypeSelect={handleTypeSelect}
          />
        </div>

        <PokedexGrid selectedTypes={selectedTypes} />
      </div>
    </div>
  );
};

export default HomePage;
