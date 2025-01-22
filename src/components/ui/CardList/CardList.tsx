import { ReactNode } from "react";
import styles from "./CardList.module.css";

interface props {
  children?: ReactNode;
}

function CardList({ children }: props) {
  return <div className={styles.cardList}>{children}</div>;
}

export default CardList;
