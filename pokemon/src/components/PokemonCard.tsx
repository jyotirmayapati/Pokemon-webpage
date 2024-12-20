interface PokemonCardProps {
    id: number;
    name: string;
    types: string[];
    sprite: string;
  }
  
  const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types, sprite }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform">
        <img src={sprite} alt={name} className="w-32 h-32 mx-auto" />
        <h2 className="text-xl font-bold text-center mt-2">{name}</h2>
        <p className="text-gray-500 text-center">#{id}</p>
        <div className="flex justify-center mt-2 space-x-2">
          {types.map(type => (
            <span key={type} className={`bg-blue-500 text-white text-xs px-2 py-1 rounded-full`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default PokemonCard;
  