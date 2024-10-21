import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { pokeApi } from "../api/pokeApi";
import { OnePokemon, PokemonPaginateRespon } from "../interfaces/PokemonTypes";
import { modelPokemons } from "../utils";

const PAGE_KEY = "page";

export const usePokemonsPagination = () => {
    const [params, setParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [simplePokemonList, setSimplePokemonList] = useState<OnePokemon[]>(
        []
    );

    const [currentPage, setCurrentPage] = useState(() => {
        const page = params.get(PAGE_KEY);
        const parsedPage = page ? Number(page) : 1;
        return isNaN(parsedPage) ? 1 : parsedPage;
    });

    const onSetPage = (page: number) => {
        setCurrentPage(page);
        setParams({ [PAGE_KEY]: String(page) });
    };

    const loadPokemons = async (page: number) => {
        setIsLoading(true);
        const limit = 20;
        const offset = page === 1 ? 0 : (limit * page) / 2;
        const resp = await pokeApi.get<PokemonPaginateRespon>("", {
            params: {
                offset,
                limit,
            },
        });
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
        const resp = await pokeApi.get<PokemonPaginateRespon>("", {
            params: {
                limit: 1200,
            },
        });
        if (resp.status === 200) {
            const result = modelPokemons(resp.data.results);
            setSimplePokemonList(result);
        } else {
            setError(true);
        }
        setIsLoading(false);
    };

    const onNextPage = () => {
        const nextPage = currentPage + 1;
        onSetPage(nextPage);
    };

    const onPrevPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            onSetPage(prevPage);
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
