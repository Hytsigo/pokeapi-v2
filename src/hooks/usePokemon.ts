import { useEffect, useState } from "react";
import { InfoPokemon } from "../interfaces/PokemonTypes";
import { pokeApi } from "../api/pokeApi";

export const usePokemon = (id: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemon, setPokemon] = useState<InfoPokemon | null>(null);

    const loadPokemon = async () => {
        try {
            const resp = await pokeApi.get<InfoPokemon>(`/${id}`);
            setPokemon(resp.data);
        } catch {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPokemon();
    }, []);

    return {
        isLoading,
        error,
        pokemon,
    };
};
