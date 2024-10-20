import React from "react";
import { PokemonDetailData } from "../interfaces/PokemonTypes";

interface PokemonListProps {
    pokemons: PokemonDetailData[];
    onPokemonClick: (name: string) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({
    pokemons,
    onPokemonClick,
}) => (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
            <li
                key={pokemon.name}
                className="bg-bg-200 p-4 rounded-lg shadow-lg hover:bg-bg-300 transition-all hover:scale-105 cursor-pointer"
                onClick={() => onPokemonClick(`pokemon/${pokemon.name}`)}
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
);

export default PokemonList;
