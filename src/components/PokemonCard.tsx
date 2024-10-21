import { OnePokemon } from "../interfaces/PokemonTypes";
import { useNavigate } from "react-router-dom";

interface Props {
    pokemon: OnePokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
    const navigation = useNavigate();

    return (
        <li
            key={pokemon.name}
            className="bg-bg-200 p-4 rounded-lg shadow-xl transition-transform transform hover:scale-105 cursor-pointer border border-gray-300 hover:border-primary-200"
            onClick={() => navigation(`/pokemon/${pokemon.id}`)}
        >
            <img
                src={pokemon.imgUrl}
                alt={pokemon.name}
                className="w-full h-32 object-contain mb-2"
            />
            <p className="capitalize font-semibold text-text-200 text-lg text-center">
                {pokemon.name}
            </p>
        </li>
    );
};

export default PokemonCard;
