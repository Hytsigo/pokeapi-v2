import { useState, useEffect } from "react";
import { getPokemons } from "../services/getPokemon";
import {
    PokemonListItem,
    PokemonWithColor,
} from "../interfaces/PokemonInterfaces";

export const usePokemon = (limit: number = 20, offset: number = 0) => {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonWithColor[]>(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPokemons(limit, offset);
                setPokemonList(data.results);

                const detailsPromises = data.results.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    const pokemonData = await response.json();

                    const speciesResponse = await fetch(
                        pokemonData.species.url
                    );
                    const speciesData = await speciesResponse.json();

                    return {
                        ...pokemonData,
                        color: speciesData.color.name,
                    } as PokemonWithColor;
                });

                const details = await Promise.all(detailsPromises);
                setPokemonDetails(details);
            } catch (err) {
                console.log(err);
                setError("Failed to load Pokémon data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [limit, offset]);

    return { pokemonList, pokemonDetails, loading, error };
};
