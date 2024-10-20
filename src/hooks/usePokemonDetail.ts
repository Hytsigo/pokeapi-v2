import { useEffect, useState } from "react";
import { PokemonDetailData } from "../interfaces/PokemonInterfaces";

const usePokemonDetail = (name: string) => {
    const [pokemon, setPokemon] = useState<PokemonDetailData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${name}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch Pokémon details");
                }
                const data: PokemonDetailData = await response.json();
                setPokemon(data);
            } catch (error) {
                setError(
                    error instanceof Error ? error.message : "An error occurred"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetail();
    }, [name]);

    return { pokemon, loading, error };
};

export default usePokemonDetail;
