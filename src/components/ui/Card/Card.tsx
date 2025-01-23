import { ReactNode } from "react";
import styles from "./Card.module.css";

interface props {
  children: ReactNode;
}

function Card({ children }: props) {
  return <li className={styles.card}>{children}</li>;
}

export default Card;
