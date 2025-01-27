import { pokeApiUrl } from "../globals";
import { PokeInfoResult } from "../types/PokemonTypes";

export default class PokemonService {
   static fetchPokemonsInfoPaginated = async (page: number, limit: number) => {
        const queryUrl =
          pokeApiUrl +
          "pokemon/?limit=" +
          limit +
          "&offset=" +
          page * limit;
        const response = await fetch(queryUrl);
        if (!response.ok) {
          throw new Error(`Response status ${response.status}`);
        }
        return response.json() as Promise<PokeInfoResult>;
      };
};