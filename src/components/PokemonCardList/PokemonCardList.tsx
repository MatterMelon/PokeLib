import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { PokeInfoResult, Pokemon, PokemonInfo } from "../../types/PokemonTypes";
import PokemonCard from "../PokemonCard/PokemonCard";
import CardList from "../ui/CardList/CardList";
import Loader from "../ui/Loader/Loader";
import Button from "../ui/Button/Button";

interface Props {
  pokemonsInfo: UseQueryResult<PokeInfoResult, Error>;
}

function PokemonCardList({ pokemonsInfo }: Props) {
  const fetchPokemonByUrl = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    }
    return response.json() as Promise<Pokemon>;
  };

  const pokemons = useQueries({
    queries: (pokemonsInfo?.data?.results ?? []).map((pokemon: PokemonInfo) => {
      return {
        queryKey: ["pokemon", pokemon.name],
        queryFn: () => fetchPokemonByUrl(pokemon.url),
      };
    }),
  });

  console.log(pokemons);

  const handleNextPageBtnClick = () => {
    console.log("NEXT PAGE")!;
  };

  const isLoading = pokemons.some((query) => query.isLoading);

  if (isLoading) {
    return (
      <CardList>
        {pokemons.map((_, index) => (
          <Loader key={index} />
        ))}
      </CardList>
    );
  }

  return (
    <>
      <CardList>
        {pokemons.map((pokemon) => (
          <PokemonCard key={crypto.randomUUID()} pokemon={pokemon.data} />
        ))}
      </CardList>
      <Button onClick={handleNextPageBtnClick}>Next</Button>
    </>
  );
}

export default PokemonCardList;
