import { useQuery } from "@tanstack/react-query";
import { PokeInfoResult, PokemonInfo } from "../../types/PokemonTypes";
import PokemonCard from "../PokemonCard/PokemonCard";
import CardList from "../ui/CardList/CardList";
import Button from "../ui/Button/Button";

const fetchPokemonsInfo = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=20";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status ${response.status}`);
  }
  return response.json() as Promise<PokeInfoResult>;
};

function PokemonCardList() {
  const pokemonsInfoQuery = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemonsInfo,
  });
  const pokemonsInfo = pokemonsInfoQuery?.data?.results ?? [];

  const handleNextPageBtnClick = () => {
    console.log("NEXT PAGE")!;
  };

  return (
    <>
      <CardList>
        {pokemonsInfo.map((pokemonInfo: PokemonInfo) => (
          <PokemonCard key={pokemonInfo.name} pokemonInfo={pokemonInfo} />
        ))}
      </CardList>
      <Button onClick={handleNextPageBtnClick}>Next</Button>
    </>
  );
}

export default PokemonCardList;
