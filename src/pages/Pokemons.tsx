import { useQuery } from "@tanstack/react-query";
import { PokemonInfo } from "../types/PokemonTypes";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import CardList from "../components/ui/CardList/CardList";
import Button from "../components/ui/Button/Button";
import { useState } from "react";
import PokemonMockCard from "../components/PokemonCard/PokemonMockCard";
import PokemonService from "../API/PokemonService";

function PokemonCardList() {
  const queryLimit = 24;
  const [page, setPage] = useState(0);

  const pokemonsInfoQuery = useQuery({
    queryKey: ["pokemon", { page }],
    queryFn: () => PokemonService.fetchPokemonsInfoPaginated(page, queryLimit),
  });

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
