import Card from "../ui/Card/Card";
import styles from "./PokemonCard.module.css";

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
