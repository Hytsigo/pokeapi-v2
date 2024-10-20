import { useState, useEffect } from "react";
import { PokemonDetailData } from "../interfaces/PokemonTypes";
import { fetchPokemonDetail } from "../services/pokemon.service";

const usePokemonDetail = (name: string) => {
    const [pokemon, setPokemon] = useState<PokemonDetailData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            try {
                const data = await fetchPokemonDetail(name);
                setPokemon(data);
                setError(null);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
                setPokemon(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [name]);

    return { pokemon, loading, error };
};

export default usePokemonDetail;
