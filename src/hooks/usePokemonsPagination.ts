import { useState } from "react";
import { OnePokemon, PokemonPaginateRespon } from "../interfaces/PokemonTypes";
import { pokeApi } from "../api/pokeApi";
import { modelPokemons } from "../utils";

export const usePokemonsPagination = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [currentPage, setCurretPage] = useState(1);
    const [simplePokemonList, setSimplePokemonList] = useState<OnePokemon[]>(
        []
    );

    const loadPokemons = async (page: number) => {
        setIsLoading(true);
        const limit = 20;
        const offset = page === 1 ? 0 : (limit * page) / 2;
        const resp = await pokeApi.get<PokemonPaginateRespon>(
            `?offset=${offset}&limit=${limit}`
        );
        if (resp.status === 200) {
            const result = modelPokemons(resp.data.results);
            setSimplePokemonList(result);
        } else {
            setError(true);
        }
        setIsLoading(false);
    };

    const getAllPokemons = async () => {
        setIsLoading(true);
        const resp = await pokeApi.get<PokemonPaginateRespon>("?&limit=1200");
        if (resp.status === 200) {
            const result = modelPokemons(resp.data.results);
            setSimplePokemonList(result);
        } else {
            setError(true);
        }
        setIsLoading(false);
    };

    const onNextPage = () => {
        setCurretPage((prev) => prev + 1);
    };

    const onPrevPage = () => {
        if (currentPage > 1) {
            setCurretPage((prev) => prev - 1);
        }
    };

    return {
        simplePokemonList,
        loadPokemons,
        isLoading,
        error,
        currentPage,
        onNextPage,
        onPrevPage,
        getAllPokemons,
    };
};
