import { IMAGE_URL } from "../constants";
import { OnePokemon, Result } from "../interfaces/PokemonTypes";

export const modelPokemons = (pokemon: Result[]) => {
    const newPoke: OnePokemon[] = pokemon.map((poke) => {
        const urlPath = poke.url.split("/");
        const id = urlPath[urlPath.length - 2];
        const imgUrl = `${IMAGE_URL}/${id}.png`;

        return {
            id,
            name: poke.name,
            imgUrl,
        };
    });
    return newPoke;
};
