import { useQueries, useQuery } from "@tanstack/react-query";
import "./App.css";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import CardList from "./components/ui/CardList/CardList";
import { PokemonInfo, PokeInfoResult, Pokemon } from "./types/PokemonTypes";

const fetchPokemonsInfo = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=20";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status ${response.status}`);
  }
  return response.json() as Promise<PokeInfoResult>;
};

const fetchPokemonByUrl = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status ${response.status}`);
  }
  return response.json() as Promise<Pokemon>;
};

function App() {
  const pokemonsInfoQuery = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemonsInfo,
  });

  const pokemons = useQueries({
    queries: (pokemonsInfoQuery?.data?.results ?? []).map(
      (pokemon: PokemonInfo) => {
        return {
          queryKey: ["pokemon", pokemon.name],
          queryFn: () => fetchPokemonByUrl(pokemon.url),
        };
      }
    ),
  });

  return (
    <CardList>
      {pokemons.map((pokemon) => (
        <PokemonCard key={crypto.randomUUID()} pokemon={pokemon.data} />
      ))}
    </CardList>
  );
}

export default App;
