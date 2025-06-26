import { useDebouncedState } from '@mantine/hooks';
import React from 'react'
import { SearchContext } from 'src/hooks/useSearchContext';

interface SearchProviderProps {
    children?: React.ReactNode;
}

export const SearchProvider:React.FC<SearchProviderProps> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useDebouncedState("", 200);
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        {children}
    </SearchContext.Provider>
  )
}
