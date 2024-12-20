import * as React from 'react';
import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import PokemonCardSkeleton from './PokemonCardSkeleton'; // Import skeleton for lazy loading

// Lazy load the PokemonCard component
const PokemonCard = React.lazy(() => import('./PokemonCard'));

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

const PokedexGrid = ({ selectedTypes }: { selectedTypes: string[] }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        const pokemonData: Pokemon[] = await Promise.all(
          response.data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await axios.get(pokemon.url);
            return {
              id: res.data.id,
              name: res.data.name,
              sprite: res.data.sprites.front_default,
              types: res.data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
            };
          })
        );

        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchPokemon();
  }, []);

  // Filter Pokemon by search term and selected types
  const filteredPokemon = pokemonList.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTypes.length === 0 || pokemon.types.some((type) => selectedTypes.includes(type)))
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon"
        className="p-3 mb-6 rounded-full shadow-lg w-full max-w-md mx-auto focus:outline-none focus:ring-2 focus:ring-purple-500"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Suspense with fallback for lazy loading */}
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        {/* Adjusted grid layout for responsive design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {loading
            ? Array(8)
                .fill(null)
                .map((_, index) => <PokemonCardSkeleton key={index} />) // Show skeletons when loading
            : filteredPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  sprite={pokemon.sprite}
                  types={pokemon.types}
                />
              ))}
        </div>
      </Suspense>
    </div>
  );
};

export default PokedexGrid;
