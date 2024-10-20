import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetailData } from "../interfaces/PokemonInterfaces";
import Loader from "./common/Loader";

const PokemonDetail: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<PokemonDetailData | null>(null);

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${name}`
                );
                const data: PokemonDetailData = await response.json();
                setPokemon(data);
            } catch (error) {
                console.error("Failed to fetch Pokémon details:", error);
            }
        };

        fetchPokemonDetail();
    }, [name]);

    if (!pokemon) {
        return <Loader />;
    }

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    return (
        <div className="bg-bg-100 min-h-screen text-text-100 p-8">
            <h1 className="text-4xl font-bold mb-8 text-primary-200 capitalize">
                {pokemon.name}
            </h1>
            <img
                src={imageUrl}
                alt={pokemon.name}
                className="w-64 h-64 sm:w-96 sm:h-96 object-contain mx-auto mb-6"
            />

            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Abilities</h2>
                <ul>
                    {pokemon.abilities.map((ability, index) => (
                        <li key={index} className="text-text-200 capitalize">
                            {ability.ability.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">Types</h2>
                <ul>
                    {pokemon.types.map((type, index) => (
                        <li key={index} className="text-text-200 capitalize">
                            {type.type.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PokemonDetail;
