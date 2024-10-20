import React from "react";
import Loader from "./common/Loader";
import Search from "./Search";
import Pagination from "./Pagination";
import usePokemonPagination from "../hooks/usePokemonPagination";

const PokemonCard: React.FC = () => {
    const limit = 20;
    const {
        currentPage,
        loading,
        searchLoading,
        error,
        handleNextPage,
        handlePreviousPage,
        handlePokemonClick,
        displayedPokemons,
        debounceSearch,
    } = usePokemonPagination(limit);

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-bg-100 min-h-screen text-text-100 p-8">
            <h1 className="text-3xl font-bold mb-8 text-primary-200 text-center">
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
                    className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ${
                        loading || searchLoading ? "opacity-50" : ""
                    }`}
                >
                    {displayedPokemons.map((pokemon) => (
                        <li
                            key={pokemon.name}
                            className="bg-bg-200 p-4 rounded-lg shadow-xl transition-transform transform hover:scale-105 cursor-pointer border border-gray-300 hover:border-primary-200"
                            onClick={() => handlePokemonClick(pokemon.name)}
                        >
                            <img
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                className="w-full h-32 object-contain mb-2"
                            />
                            <p className="capitalize font-semibold text-text-200 text-lg text-center">
                                {pokemon.name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <Pagination
                currentPage={currentPage}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
            />
        </div>
    );
};

export default PokemonCard;
