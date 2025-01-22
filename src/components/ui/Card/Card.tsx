import { ReactNode } from "react";
import styles from "./Card.module.css";

interface props {
  children: ReactNode;
}

function Card({ children }: props) {
  return <div className={styles.card}>{children}</div>;
}

export default Card;
