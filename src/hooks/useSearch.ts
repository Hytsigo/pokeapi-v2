import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PokemonDetailData } from "../interfaces/PokemonTypes";
import { getPokemons, fetchPokemonDetail } from "../services/pokemon.service";

const useSearch = (data: PokemonDetailData[]) => {
    const [searchResults, setSearchResults] = useState<
        PokemonDetailData[] | null
    >(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get("page");

        if (page) {
            setCurrentPage(Number(page));
        }
    }, [location.search]);

    const fetchPokemonsFromAPI = async (query: string, page: number = 1) => {
        setLoading(true);
        try {
            const limit = 20;
            const offset = (page - 1) * limit;

            const allPokemons = await getPokemons(1000, 0);

            const filteredPokemons = allPokemons.results.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(query.toLowerCase())
            );

            const detailedPokemons: PokemonDetailData[] = [];
            for (const pokemon of filteredPokemons.slice(
                offset,
                offset + limit
            )) {
                const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
                const detailedData = await fetchPokemonDetail(pokemonId!);
                detailedPokemons.push(detailedData);
            }

            setSearchResults(detailedPokemons);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const debounceSearch = (query: string, page: number = 1) => {
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
                setSearchResults(
                    localResults.slice((page - 1) * 20, page * 20)
                );
            } else {
                fetchPokemonsFromAPI(query, page);
            }

            navigate(`?page=${page}`);
        }, 500);
    };

    return {
        searchResults,
        debounceSearch,
        loading,
        currentPage,
        setCurrentPage,
    };
};

export default useSearch;
