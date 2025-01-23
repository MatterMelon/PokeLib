import Card from "../ui/Card/Card";
import styles from "./PokemonCard.module.css";
import { Pokemon } from "../../types/PokemonTypes";

interface Props {
  pokemon: Pokemon | undefined;
}

function PokemonCard({ pokemon }: Props) {
  return (
    <Card>
      <img className={styles.image} src={pokemon?.sprites?.front_default}></img>
      <span className={styles.id}>{pokemon?.id}</span>
      <h3 className={styles.name}>{pokemon?.name}</h3>
      <p className={styles.description}>Description</p>
    </Card>
  );
}

export default PokemonCard;
