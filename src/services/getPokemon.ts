import { PokemonApiResponse } from "../interfaces/ApiResponseInterfaces";
import { PokemonDetailData } from "../interfaces/PokemonInterfaces";

export const getPokemons = async (
    limit: number = 20,
    offset: number = 0
): Promise<PokemonApiResponse> => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch Pokémon");
    }
    const data: PokemonApiResponse = await response.json();
    return data;
};

export const searchPokemons = async (
    name: string
): Promise<PokemonDetailData> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon with name: ${name}`);
    }
    const data: PokemonDetailData = await response.json();
    return data;
};
