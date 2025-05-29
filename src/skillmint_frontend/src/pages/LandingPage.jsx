import React from "react";
import NavBar from "../components/NavBar";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.landingRoot}>
      <NavBar />
      <div className={styles.heroContent}>
        <h2 className={styles.logoText}>SkillMInt</h2>
        <h1 className={styles.headline}>Unleash Verified Talent</h1>
        <p className={styles.description}>
          Empower students with blockchain-based credentials—whether you're recognizing real-world skills or connecting future-ready talent to opportunities.
        </p>
        <button className={styles.ctaBtn}>
          Join Us
        </button>
      </div>
    </div>
  );
}

export default LandingPage;