import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__list}>
        <li className={styles.navbar__item}>
          <Link to="/pokemons" className={styles.navbar__link}>
            Pokemons
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link to="/berries" className={styles.navbar__link}>
            Berries
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link to="/pokemons" className={styles.navbar__link}>
            Pokemons
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
