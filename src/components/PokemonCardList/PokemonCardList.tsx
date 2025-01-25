import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { PokeInfoResult, Pokemon, PokemonInfo } from "../../types/PokemonTypes";
import PokemonCard from "../PokemonCard/PokemonCard";
import CardList from "../ui/CardList/CardList";
import Loader from "../ui/Loader/Loader";
import Button from "../ui/Button/Button";

interface Props {
  pokemonsInfo: PokeInfoResult | undefined;
}

function PokemonCardList({ pokemonsInfo }: Props) {
  console.log(pokemonsInfo);

  const fetchPokemonByUrl = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    }
    return response.json() as Promise<Pokemon>;
  };

  const pokemons = useQueries({
    queries: (pokemonsInfo?.results ?? []).map((pokemon: PokemonInfo) => {
      return {
        queryKey: ["pokemon", pokemon.name],
        queryFn: () => fetchPokemonByUrl(pokemon.url),
      };
    }),
  });

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
          <PokemonCard key={pokemon?.data?.id} pokemon={pokemon.data} />
        ))}
      </CardList>
      <Button onClick={handleNextPageBtnClick}>Next</Button>
    </>
  );
}

export default PokemonCardList;
