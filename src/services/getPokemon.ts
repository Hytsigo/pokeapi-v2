import { PokemonApiResponse } from "../interfaces/ApiResponseInterfaces";

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
