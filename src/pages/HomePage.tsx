import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { usePokemonsPagination } from "../hooks/usePokemonsPagination";
import { OnePokemon } from "../interfaces/PokemonTypes";
import { ErrorComponent } from "../components/ErrorComponent";
import Search from "../components/Search";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

export const HomePage: React.FC = () => {
    const {
        isLoading,
        loadPokemons,
        simplePokemonList,
        error,
        currentPage,
        onNextPage,
        onPrevPage,
        getAllPokemons,
    } = usePokemonsPagination();
    const [query, setQuery] = useState("");
    const [filterPokemons, setFilterPokemos] = useState<OnePokemon[]>([]);

    useEffect(() => {
        if (query.trim().length === 0) {
            loadPokemons(currentPage);
        }
        if (query.trim().length === 1) {
            getAllPokemons();
        }
    }, [currentPage, query]);

    useEffect(() => {
        if (query.trim().length === 0) {
            setFilterPokemos(() => simplePokemonList);
        } else {
            setFilterPokemos(() =>
                simplePokemonList.filter((item) =>
                    item.name.toLowerCase().includes(query.trim().toLowerCase())
                )
            );
        }
    }, [query, simplePokemonList]);

    if (error) return <ErrorComponent />;

    return (
        <section className="bg-bg-100 min-h-screen text-text-100 p-8">
            <h1 className="text-3xl font-bold mb-8 text-primary-200 text-center">
                Pokémon List
            </h1>
            <Search onSearch={setQuery} />
            <div className="relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader />
                    </div>
                )}
                <ul
                    className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ${
                        isLoading ? "opacity-50" : ""
                    }`}
                >
                    {filterPokemons.map((pokemon) => (
                        <PokemonCard pokemon={pokemon} />
                    ))}
                </ul>
            </div>
            {!(query.length > 0) && (
                <Pagination
                    currentPage={currentPage}
                    onPrevious={onPrevPage}
                    onNext={onNextPage}
                />
            )}
        </section>
    );
};
