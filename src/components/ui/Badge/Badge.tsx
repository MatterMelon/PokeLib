import { ReactNode } from "react";
import styles from "./Badge.module.css";

interface Props {
  children: ReactNode;
  type?: string;
}

function Badge({ children, type }: Props) {
  return (
    <span className={type ? styles.badge + " " + styles[type] : styles.badge}>
      {children}
    </span>
  );
}

export default Badge;
