import Card from "../ui/Card/Card";
import styles from "./PokemonCard.module.css";

interface Props {
  id: number;
  name: string;
  imageUrl: string;
}

function PokemonCard({ id, name, imageUrl }: Props) {
  return (
    <Card>
      <img className={styles.image} src={imageUrl}></img>
      <span className={styles.id}>{id}</span>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>Description</p>
    </Card>
  );
}

export default PokemonCard;
