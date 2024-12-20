import { useState } from 'react';

/**
 * Custom hook for managing Pokemon type filters.
 * @param initialTypes - The initial selected types.
 * @returns An array with the current selected types and a function to toggle types.
 */
const useTypeFilter = (initialTypes: string[] = []) => {
  // State to manage selected types
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);

  /**
   * Toggle a Pokemon type in the selectedTypes state.
   * If the type is already selected, remove it, otherwise add it.
   * @param type - The Pokemon type to toggle.
   */
  const toggleType = (type: string) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  return [selectedTypes, toggleType] as const; // Using `as const` to ensure the return type is inferred correctly
};

export default useTypeFilter;
