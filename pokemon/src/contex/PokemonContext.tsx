import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PokemonContextType {
  searchTerm: string;
  selectedTypes: string[];
  currentPage: number;
  setSearchTerm: (term: string) => void;
  setSelectedTypes: (types: string[]) => void;
  setCurrentPage: (page: number) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

interface PokemonProviderProps {
  children: ReactNode; // Define 'children' as a prop of type ReactNode
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <PokemonContext.Provider
      value={{
        searchTerm,
        selectedTypes,
        currentPage,
        setSearchTerm,
        setSelectedTypes,
        setCurrentPage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};
