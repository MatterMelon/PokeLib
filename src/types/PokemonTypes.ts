export type PokemonInfo = {
    name: string;
    url: string;
};

export type PokeInfoResult = {
    results: PokemonInfo[],
    previous: string,
    next: string,
};

export type PokemonSprites = {
    back_default: string,
    back_female: string,
    back_shiny: string,
    back_shiny_female: string,
    front_default: string,
    front_female: string,
    front_shiny: string,
    front_shiny_female: string,
};

export type PokemonType = {
    name: string,
    url: string
}


export type PokemonTypeContainer = {
    slot: number,
    type: PokemonType
}

export type Pokemon = {
    id: number,
    name: string,
    imageUrl: string,
    sprites: PokemonSprites,
    types: PokemonTypeContainer[]
};