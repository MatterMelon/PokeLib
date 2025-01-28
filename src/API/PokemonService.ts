import { POKEMON_API } from "../globals";
import { PokeInfoResult, Pokemon } from "../types/PokemonTypes";

async function fetchUrl<T>(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status ${response.status}`);
    }
    return response.json() as T;
};

export default class PokemonService {
    static fetchPokemonsInfoPaginated = async (page: number, limit: number) => {
        const offset = page * limit;
        const url = POKEMON_API + `pokemon?offset=${offset}&limit=${limit}`;
        return fetchUrl<PokeInfoResult>(url);
    }

    static fetchPokemonByUrl = async (url: string) => {
        return fetchUrl<Pokemon>(url);
    };
}