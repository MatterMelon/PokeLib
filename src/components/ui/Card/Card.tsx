import { ReactNode } from "react";
import styles from "./Card.module.css";

interface props {
  children?: ReactNode;
  onClick?: () => void;
}

function Card({ children, onClick }: props) {
  return (
    <li className={styles.card} onClick={onClick}>
      {children}
    </li>
  );
}

export default Card;
