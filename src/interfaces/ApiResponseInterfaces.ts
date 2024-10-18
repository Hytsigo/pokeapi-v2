import { PokemonListItem } from "./PokemonInterfaces";

export interface PokemonApiResponse {
    count: number;
    next: string;
    previous: string | null;
    results: PokemonListItem[];
}
