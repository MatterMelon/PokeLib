import { useParams } from "react-router-dom";
import { pokeApiUrl } from "../globals";
import { Pokemon } from "../types/PokemonTypes";
import { useQuery } from "@tanstack/react-query";

const fetchPokemonByName = async (name: string) => {
  const url = pokeApiUrl + "pokemon/" + name;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status ${response.status}`);
  }
  return response.json() as Promise<Pokemon>;
};

function PokemonPage() {
  const { name } = useParams();
  const pokemon = useQuery({
    queryKey: ["pokemons", name],
    queryFn: () => fetchPokemonByName(name),
  });

  console.log(pokemon);

  return (
    <div>
      <h1>{pokemon.data?.name}</h1>
      <img src={pokemon.data?.sprites.front_default} alt={pokemon.data?.name} />
    </div>
  );
}

export default PokemonPage;
