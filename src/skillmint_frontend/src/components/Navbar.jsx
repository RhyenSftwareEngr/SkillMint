import React, { useState, useRef, useEffect } from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar({ onProfileClick }) {
  const { isAuthenticated, userProfile, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close menu if click outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <nav className="bg-blue-700 text-white flex items-center justify-between px-6 py-3 shadow">
      <div className="flex items-center cursor-pointer select-none">
        <img src="/logo.png" alt="SkillMint Logo" className="w-10 h-10 mr-2" />
        <span className="text-2xl font-bold text-white">SkillMint</span>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          userProfile && userProfile.first_name ? (
            <span className="font-semibold">{userProfile.first_name}</span>
          ) : (
            <span className="italic text-yellow-200">Profile not set up</span>
          )
        ) : (
          <button onClick={login} className="bg-white text-blue-700 px-4 py-2 rounded font-semibold">Login</button>
        )}
        {isAuthenticated && (
          <button onClick={logout} className="bg-blue-900 text-white px-3 py-1 rounded">Logout</button>
        )}
        <button onClick={onProfileClick} className="ml-2 bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded">Profile</button>
      </div>
    </nav>
  );
}
