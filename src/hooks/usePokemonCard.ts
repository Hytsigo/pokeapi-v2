import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import useSearch from "../hooks/useSearch";
import { PokemonDetailData } from "../interfaces/PokemonInterfaces";

const usePokemonCard = (limit: number) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const { pokemonDetails, loading, error } = usePokemon(
        limit,
        currentPage * limit
    );
    const {
        searchResults,
        debounceSearch,
        loading: searchLoading,
    } = useSearch(pokemonDetails);
    const navigate = useNavigate();

    const handleNextPage = () => {
        if (!isSearching) {
            setCurrentPage((prevPage) => prevPage + 1);
            console.log("Se presionó");
        }
    };

    const handlePreviousPage = () => {
        if (!isSearching) {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
        }
    };

    const handlePokemonClick = (name: string) => {
        navigate(`/pokemon/${name}`);
    };

    const handleSearch = (query: string) => {
        debounceSearch(query);
        setIsSearching(query.trim().length > 0);
        if (!query.trim()) {
            setCurrentPage(0);
        }
    };

    useEffect(() => {
        if (searchResults === null && isSearching) {
            setIsSearching(false);
            setCurrentPage(0);
        }
    }, [searchResults, isSearching]);

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

export default usePokemonCard;
