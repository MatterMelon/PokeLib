import { ReactNode } from "react";
import styles from "./Badge.module.css";

interface Props {
  children: ReactNode;
}

function Badge({ children }: Props) {
  return <span className={styles.badge}>{children}</span>;
}

export default Badge;
