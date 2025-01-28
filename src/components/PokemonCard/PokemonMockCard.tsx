import Badge from "../ui/Badge/Badge";
import Card from "../ui/Card/Card";
import Loader from "../ui/Loader/Loader";
import styles from "./PokemonMockCard.module.css";

function PokemonMockCard() {
  return (
    <Card>
      <div className={styles.mockImage}>
        <Loader />
      </div>
      <span className={styles.mockId}>#0000</span>
      <h3 className={styles.mockName}>PokeLib</h3>
      <div className={styles.mockTypeList}>
        <Badge>badge</Badge>
        <Badge>badge</Badge>
        <Badge>badge</Badge>
      </div>
    </Card>
  );
}

export default PokemonMockCard;
