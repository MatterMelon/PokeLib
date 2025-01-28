import { ReactNode } from "react";
import styles from "./CardList.module.css";

interface props {
  children?: ReactNode;
}

function CardList({ children }: props) {
  return <ul className={styles.cardList}>{children}</ul>;
}

export default CardList;
