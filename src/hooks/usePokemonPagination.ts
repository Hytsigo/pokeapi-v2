import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePokemon } from "./usePokemon";
import useSearch from "./useSearch";
import { PokemonDetailData } from "../interfaces/PokemonTypes";

const usePokemonPagination = (limit: number) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const { pokemonDetails, loading, error } = usePokemon(
        limit,
        (currentPage - 1) * limit
    );
    const {
        searchResults,
        debounceSearch,
        loading: searchLoading,
    } = useSearch(pokemonDetails);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const pageParam = searchParams.get("page");
        const page = parseInt(pageParam || "1", 10);

        if (isNaN(page) || page < 1) {
            setCurrentPage(1);
            setSearchParams({ page: "1" });
        } else {
            setCurrentPage(page);
        }
    }, [searchParams, setSearchParams]);

    const handleNextPage = () => {
        if (!isSearching) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            setSearchParams({ page: nextPage.toString() });
        }
    };

    const handlePreviousPage = () => {
        if (!isSearching && currentPage > 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            setSearchParams({ page: prevPage.toString() });
        }
    };

    const handlePokemonClick = (name: string) => {
        navigate(`/pokemon/${name}`);
    };

    const handleSearch = (query: string) => {
        debounceSearch(query);
        setIsSearching(query.trim().length > 0);
        if (!query.trim()) {
            setCurrentPage(1);
            setSearchParams({ page: "1" });
        }
    };

    useEffect(() => {
        if (searchResults === null && isSearching) {
            setIsSearching(false);
            setCurrentPage(1);
            setSearchParams({ page: "1" });
        }
    }, [searchResults, isSearching, setSearchParams]);

    const displayedPokemons: PokemonDetailData[] =
        searchResults || pokemonDetails || [];

    return {
        currentPage,
        limit,
        loading,
        searchLoading,
        error,
        handleNextPage,
        handlePreviousPage,
        handlePokemonClick,
        displayedPokemons,
        debounceSearch: handleSearch,
    };
};

export default usePokemonPagination;
