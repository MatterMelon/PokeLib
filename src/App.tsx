import { useQueries, useQuery } from "@tanstack/react-query";
import "./App.css";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import CardList from "./components/ui/CardList/CardList";

type PokemonInfo = {
  name: string;
  url: string;
};

type PokeInfoResult = {
  results: PokemonInfo[];
};

type PokemonSprites = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

type Pokemon = {
  id: number;
  name: string;
  imageUrl: string;
  sprites: PokemonSprites;
};

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
