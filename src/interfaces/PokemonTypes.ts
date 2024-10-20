export interface Ability {
    ability: {
        name: string;
    };
}

export interface Type {
    type: {
        name: string;
    };
}

export interface PokemonListItem {
    name: string;
    url: string;
    image: string;
}

export interface Sprites {
    front_default: string;
    back_default?: string;
}

export interface PokemonDetailData {
    id: number;
    name: string;
    abilities: Ability[];
    types: Type[];
    sprites: Sprites;
}

export interface PokemonWithColor extends PokemonDetailData {
    color: string;
}

export interface PokemonApiResponse {
    count: number;
    next: string;
    previous: string | null;
    results: PokemonListItem[];
}
