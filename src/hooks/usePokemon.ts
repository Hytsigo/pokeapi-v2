import { useEffect, useState } from "react";
import { InfoPokemon } from "../interfaces/PokemonTypes";
import { pokeApi } from "../api/pokeApi";

export const usePokemon = (id: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemon, setPokemon] = useState<InfoPokemon>({} as InfoPokemon);

    const loadPokemon = async () => {
        const resp = await pokeApi.get<InfoPokemon>(`/${id}`);
        if (resp.status === 200) {
            setPokemon(resp.data);
        } else {
            setError(true);
        }
        setIsLoading(false);
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
