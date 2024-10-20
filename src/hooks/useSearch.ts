import { useState, useRef } from "react";
import { PokemonDetailData } from "../interfaces/PokemonInterfaces";

const useSearch = (data: PokemonDetailData[]) => {
    const [searchResults, setSearchResults] = useState<
        PokemonDetailData[] | null
    >(null);
    const [loading, setLoading] = useState<boolean>(false);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchPokemonsFromAPI = async (query: string) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=1000`
            );
            if (!response.ok) {
                setSearchResults([]);
                return;
            }

            const allPokemons = await response.json();

            const filteredPokemons = allPokemons.results.filter(
                (pokemon: { name: string }) =>
                    pokemon.name.toLowerCase().includes(query.toLowerCase())
            );

            const detailedPokemons: PokemonDetailData[] = [];
            for (const pokemon of filteredPokemons.slice(0, 20)) {
                const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
                const detailedResponse = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
                );
                const detailedData = await detailedResponse.json();

                detailedPokemons.push({
                    id: detailedData.id,
                    name: detailedData.name,
                    abilities: detailedData.abilities,
                    types: detailedData.types,
                    sprites: {
                        front_default: detailedData.sprites.front_default,
                    },
                });
            }

            setSearchResults(detailedPokemons);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
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
            if (query.trim() === "") {
                setSearchResults(null);
                return;
            }

            const localResults = data.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );

            if (localResults.length > 0) {
                setSearchResults(localResults.slice(0, 20));
            } else {
                fetchPokemonsFromAPI(query);
            }
        }, 500);
    };

    return { searchResults, debounceSearch, loading };
};

export default useSearch;
