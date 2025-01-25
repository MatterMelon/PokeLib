import Card from "../ui/Card/Card";
import styles from "./PokemonCard.module.css";
import { Pokemon } from "../../types/PokemonTypes";
import Badge from "../ui/Badge/Badge";

interface Props {
  pokemon: Pokemon | undefined;
}

const formatId = (id: number | undefined) => {
  if (id) {
    const idStr = id.toString();
    return "#" + "0".repeat(4 - idStr.length) + idStr;
  }
};

function PokemonCard({ pokemon }: Props) {
  return (
    <Card>
      <img className={styles.image} src={pokemon?.sprites?.front_default}></img>
      <span className={styles.id}>{formatId(pokemon?.id)}</span>
      <h3 className={styles.name}>{pokemon?.name}</h3>
      <div className={styles.typeList}>
        {pokemon?.types.map((type, index) => (
          <Badge key={index}>{type.type.name}</Badge>
        ))}
      </div>
    </Card>
  );
}

export default PokemonCard;
