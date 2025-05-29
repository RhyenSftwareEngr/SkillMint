import React from "react";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} />
      <div className={styles.actions}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />
        <button className={styles.loginBtn}>
          Log in
        </button>
      </div>
    </nav>
  );
}

export default NavBar;