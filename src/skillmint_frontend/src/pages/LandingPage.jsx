import React from "react";
import NavBar from "../components/NavBar";

function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #888 0%, #ccc 100%)",
      position: "relative"
    }}>
      <NavBar />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh"
      }}>
        <h2 style={{ color: "#fff", fontSize: "2.5rem", margin: 0, fontWeight: 600 }}>SkillMInt</h2>
        <h1 style={{ color: "#fff", fontSize: "4rem", margin: "1rem 0 0.5rem 0", fontWeight: 700 }}>Unleash Verified Talent</h1>
        <p style={{ color: "#eee", fontSize: "1.3rem", maxWidth: 600, textAlign: "center", marginBottom: "2rem" }}>
          Empower students with blockchain-based credentials—whether you're recognizing real-world skills or connecting future-ready talent to opportunities.
        </p>
        <button style={{
          padding: "0.8rem 2.5rem",
          borderRadius: 30,
          border: "none",
          background: "#fff",
          color: "#222",
          fontWeight: 600,
          fontSize: "1.1rem",
          cursor: "pointer"
        }}>
          Join Us
        </button>
      </div>
    </div>
  );
}

export default LandingPage;