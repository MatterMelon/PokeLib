import Card from "../ui/Card/Card";
import styles from "./PokemonCard.module.css";
import { PokemonInfo } from "../../types/PokemonTypes";
import Badge from "../ui/Badge/Badge";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader/Loader";
import { useNavigate } from "react-router-dom";
import PokemonService from "../../API/PokemonService";

interface Props {
  pokemonInfo: PokemonInfo;
}

const formatId = (id: number | undefined) => {
  if (id) {
    const idStr = id.toString();
    return "#" + "0".repeat(5 - idStr.length) + idStr;
  }
};

function PokemonCard({ pokemonInfo }: Props) {
  const navigate = useNavigate();
  const pokemonQuery = useQuery({
    queryKey: ["pokemon", pokemonInfo?.name],
    queryFn: () => PokemonService.fetchPokemonByUrl(pokemonInfo.url),
  });

  if (pokemonQuery.isLoading) {
    return (
      <Card>
        <div className={styles.mockImage}>
          <Loader />
        </div>
        <span className={styles.id}>#0000</span>
        <h3 className={styles.name}>PokeLib</h3>
        <div className={styles.typeList}>
          <Badge>badge</Badge>
          <Badge>badge</Badge>
          <Badge>badge</Badge>
        </div>
      </Card>
    );
  }

  const pokemon = pokemonQuery.data;

  return (
    <Card onClick={() => navigate(`/pokemons/${pokemon?.name}`)}>
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
