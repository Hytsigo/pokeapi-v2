import { useState, useEffect } from "react";
import { getPokemons } from "../services/getPokemon";
import {
    PokemonListItem,
    PokemonDetailData,
} from "../interfaces/PokemonInterfaces";

export const usePokemon = (limit: number = 20, offset: number = 0) => {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailData[]>(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPokemons(limit, offset);
                setPokemonList(data.results);

                const detailsPromises = data.results.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    return response.json();
                });

                const details = await Promise.all(detailsPromises);
                setPokemonDetails(details);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("Failed to load Pokémon data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [limit, offset]);

    return { pokemonList, pokemonDetails, loading, error };
};
