import { Link } from "react-router-dom";
import Navbar from "../ui/Navbar/Navbar";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link to={"pokemons"} className={styles.header__logo}>
        <span className={styles.logo__poke}>Poke</span>Lib
      </Link>
      <Navbar />
    </header>
  );
}

export default Header;
