import React from "react";

function NavBar() {
  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      background: "#fff",
      borderBottom: "1px solid #eee"
    }}>
      <div style={{
        width: 36, height: 36, background: "#444", borderRadius: 8
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Search"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: 20,
            border: "1px solid #ccc"
          }}
        />
        <button
          style={{
            padding: "0.5rem 1.2rem",
            borderRadius: 20,
            border: "none",
            background: "#444",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Log in
        </button>
      </div>
    </nav>
  );
}

export default NavBar;