import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import Loader from "./common/Loader";
import Search from "./Search";
import useSearch from "../hooks/useSearch";
import { PokemonDetailData } from "../interfaces/PokemonInterfaces";

const PokeCard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const limit = 20;
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

    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () =>
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    const handlePokemonClick = (name: string) => {
        navigate(`/pokemon/${name}`);
    };

    const displayedPokemons = searchResults || pokemonDetails;

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-bg-100 min-h-screen text-text-100 p-8">
            <h1 className="text-3xl font-bold mb-8 text-primary-200">
                Pokémon List
            </h1>
            <Search onSearch={debounceSearch} />
            <div className="relative">
                {(loading || searchLoading) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader />
                    </div>
                )}
                <ul
                    className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${
                        loading || searchLoading ? "opacity-50" : ""
                    }`}
                >
                    {displayedPokemons.map((pokemon: PokemonDetailData) => (
                        <li
                            key={pokemon.name}
                            className="bg-bg-200 p-4 rounded-lg shadow-lg hover:bg-bg-300 transition-all cursor-pointer"
                            onClick={() => handlePokemonClick(pokemon.name)}
                        >
                            <img
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                className="w-full h-24 object-contain mb-2"
                            />
                            <p className="capitalize font-medium text-text-200">
                                {pokemon.name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            {searchResults === null && (
                <div className="mt-8 flex justify-center gap-8">
                    <button
                        className="w-32 bg-primary-100 text-text-100 px-4 py-2 rounded-lg hover:bg-primary-200 transition-all disabled:opacity-50"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>
                    <span className="text-text-100 font-medium flex items-center">
                        Page {currentPage + 1}
                    </span>
                    <button
                        className="w-32 bg-primary-100 text-text-100 px-4 py-2 rounded-lg hover:bg-primary-200 transition-all"
                        onClick={handleNextPage}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PokeCard;
