import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { PokeInfoResult } from "./types/PokemonTypes";
import PokemonCardList from "./components/PokemonCardList/PokemonCardList";
import Loader from "./components/ui/Loader/Loader";

const fetchPokemonsInfo = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=20";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status ${response.status}`);
  }
  return response.json() as Promise<PokeInfoResult>;
};

function App() {
  const pokemonsInfoQuery = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemonsInfo,
  });

  return (
    <>
      {!pokemonsInfoQuery.isLoading ? (
        <PokemonCardList pokemonsInfo={pokemonsInfoQuery} />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
