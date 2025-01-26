import Card from "../ui/Card/Card";
import styles from "./PokemonCard.module.css";
import { Pokemon, PokemonInfo } from "../../types/PokemonTypes";
import Badge from "../ui/Badge/Badge";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader/Loader";

interface Props {
  pokemon?: Pokemon | undefined;
  pokemonInfo: PokemonInfo;
}

const formatId = (id: number | undefined) => {
  if (id) {
    const idStr = id.toString();
    return "#" + "0".repeat(4 - idStr.length) + idStr;
  }
};

const fetchPokemonByUrl = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status ${response.status}`);
  }
  return response.json() as Promise<Pokemon>;
};

function PokemonCard({ pokemonInfo }: Props) {
  const pokemonQuery = useQuery({
    queryKey: ["pokemon", pokemonInfo.name],
    queryFn: () => fetchPokemonByUrl(pokemonInfo.url),
  });

  if (pokemonQuery.isLoading) {
    return (
      <Card>
        <div className={styles.mockImage}>
          <Loader />
        </div>
      </Card>
    );
  }

  const pokemon = pokemonQuery.data;

  return (
    <Card>
      <img
        width="100"
        height="100"
        className={styles.image}
        src={pokemon?.sprites?.front_default}
      ></img>
      <span className={styles.id}>{formatId(pokemon?.id)}</span>
      <h3 className={styles.name}>{pokemon?.name}</h3>
      <div className={styles.typeList}>
        {pokemon?.types.map((type, index) => (
          <Badge key={index} type={type.type.name}>
            {type.type.name}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

export default PokemonCard;
