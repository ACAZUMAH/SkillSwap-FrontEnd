import { createContext, useContext } from "react";

interface SearchContext {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const SearchContext = createContext<SearchContext>({
    searchQuery: "",
    setSearchQuery: () => {},
})


export const useSearch = useContext(SearchContext);
