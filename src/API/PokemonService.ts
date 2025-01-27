import { pokeApiUrl } from "../globals";
import { PokeInfoResult, Pokemon } from "../types/PokemonTypes";

async function fetchUrl(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status ${response.status}`);
    }
    return response.json();
};

export default class PokemonService {
   static fetchPokemonsInfoPaginated = async (page: number, limit: number) => {
        const queryUrl =
          pokeApiUrl +
          "pokemon/?limit=" +
          limit +
          "&offset=" +
          page * limit;
        return fetchUrl(queryUrl) as Promise<PokeInfoResult>;
    }

    static fetchPokemonByUrl = async (url: string) => {
        return fetchUrl(url) as Promise<Pokemon>;
    };
}