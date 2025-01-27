import { useQuery } from "@tanstack/react-query";
import { PokeInfoResult, PokemonInfo } from "../types/PokemonTypes";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import CardList from "../components/ui/CardList/CardList";
import Button from "../components/ui/Button/Button";
import { pokeApiUrl } from "../globals";
import { useState } from "react";
import PokemonMockCard from "../components/PokemonCard/PokemonMockCard";

const queryLimit = 24;
const fetchPokemonsInfoPaginated = async (page: number) => {
  const queryUrl =
    pokeApiUrl +
    "pokemon/?limit=" +
    queryLimit +
    "&offset=" +
    page * queryLimit;
  const response = await fetch(queryUrl);
  if (!response.ok) {
    throw new Error(`Response status ${response.status}`);
  }
  return response.json() as Promise<PokeInfoResult>;
};

function PokemonCardList() {
  const [page, setPage] = useState(0);
  const pokemonsInfoQuery = useQuery({
    queryKey: ["pokemon", { page }],
    queryFn: () => fetchPokemonsInfoPaginated(page),
  });
  console.log(pokemonsInfoQuery);
  const pokemonsInfo = pokemonsInfoQuery?.data?.results ?? [];

  return (
    <>
      <CardList>
        {pokemonsInfoQuery.isLoading
          ? [...Array(queryLimit)].map((_, i) => <PokemonMockCard key={i} />)
          : pokemonsInfo.map((pokemonInfo: PokemonInfo) => (
              <PokemonCard key={pokemonInfo.name} pokemonInfo={pokemonInfo} />
            ))}

        {pokemonsInfoQuery?.data?.previous ? (
          <Button onClick={() => setPage((p) => p - 1)}>Prev</Button>
        ) : null}

        {pokemonsInfoQuery?.data?.next ? (
          <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
        ) : null}
      </CardList>
      {}
    </>
  );
}

export default PokemonCardList;
