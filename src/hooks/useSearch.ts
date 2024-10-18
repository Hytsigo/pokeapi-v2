import { useState, useRef } from "react";
import { PokemonDetailData } from "../interfaces/PokemonInterfaces";

const useSearch = (data: PokemonDetailData[]) => {
    const [searchResults, setSearchResults] = useState<
        PokemonDetailData[] | null
    >(null);
    const [loading, setLoading] = useState<boolean>(false);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setSearchResults(null);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=1000`
            );
            if (!response.ok) {
                return;
            }
            const allPokemons = await response.json();
            const filteredPokemons = allPokemons.results.filter(
                (pokemon: { name: string }) =>
                    pokemon.name.toLowerCase().includes(query.toLowerCase())
            );
            const detailedPokemons = await Promise.all(
                filteredPokemons.map(async (pokemon: { url: string }) => {
                    const res = await fetch(pokemon.url);
                    return res.json();
                })
            );
            setSearchResults(detailedPokemons);
        } catch {
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const debounceSearch = (query: string) => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        searchTimeout.current = setTimeout(() => {
            const localResults = data.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(localResults);
            handleSearch(query);
        }, 500);
    };

    return { searchResults, debounceSearch, loading };
};

export default useSearch;
