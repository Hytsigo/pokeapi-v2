import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";
import Loader from "./common/Loader";

const PokemonDetail: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const { pokemon, loading, error } = usePokemonDetail(name!);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!pokemon) {
        return <div>No Pokémon found</div>;
    }

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    return (
        <div className="bg-bg-100 min-h-screen flex flex-col items-center p-4 sm:p-8">
            <div className="bg-gradient-to-br from-primary-300 to-primary-500 shadow-2xl rounded-lg p-6 max-w-md w-full text-center relative">
                <button
                    className="absolute top-4 left-4 block sm:hidden bg-primary-500 text-white p-2 rounded-md shadow-md hover:bg-primary-400 transition-colors"
                    onClick={() => navigate("/")}
                >
                    Back
                </button>

                <h1 className="text-3xl font-bold mb-4 text-white capitalize">
                    {pokemon.name}
                </h1>
                <img
                    src={imageUrl}
                    alt={pokemon.name}
                    className="w-48 h-48 sm:w-64 sm:h-64 object-contain mx-auto mb-4 transition-transform transform hover:scale-105"
                />

                <p className="text-lg text-gray-200 mb-4 italic">
                    Pokémon ID: {pokemon.id}
                </p>

                <div className="mb-4 border-t border-gray-300 pt-4">
                    <h2 className="text-xl font-bold mb-2 text-white">
                        Abilities
                    </h2>
                    <ul className="grid grid-cols-2 gap-2">
                        {pokemon.abilities.map((ability, index) => (
                            <li
                                key={index}
                                className="p-2 rounded-lg text-white capitalize shadow bg-gray-600"
                            >
                                {ability.ability.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="border-t border-gray-300 pt-4">
                    <h2 className="text-xl font-bold mb-2 text-white">Types</h2>
                    <ul className="grid grid-cols-2 gap-2">
                        {pokemon.types.map((type, index) => (
                            <li
                                key={index}
                                className="p-2 rounded-lg text-white capitalize shadow bg-gray-600"
                            >
                                {type.type.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;
