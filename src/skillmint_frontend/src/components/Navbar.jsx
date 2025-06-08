import React, { useState, useRef, useEffect } from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar({ onProfileClick }) {
  const { isAuthenticated, identity, logout } = useAuth();
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
    <nav className="w-full h-12 bg-[#002C54] flex items-center px-3 sticky top-0 z-30">
      {/* Logo */}
      {/* <div className="w-6 h-6 rounded bg-gray-200 mr-2" /> */}
      <img src="/logo.png" alt="SkillMint Logo" className="w-10 h-10 mr-2" />
      <span className="text-xl font-bold text-blue-700 tracking-tight">
        SkillMint
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* SMT Tokens (hidden on xs) */}
      <div className="flex items-center gap-4">
        <span className="text-yellow-500 font-bold text-lg">150 SMT</span>
        <span className="text-white text-xs mr-6 hidden sm:inline-block">
          SMT Tokens
        </span>
        <Link to="/dashboard" className="ml-4 px-3 py-1 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition">Dashboard</Link>
      </div>

      {/* User Profile Dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center gap-2"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
            {/* Avatar/initial */}
            <span className="text-white font-bold">
              {isAuthenticated && identity
                ? identity.getPrincipal().toText().slice(0, 2).toUpperCase()
                : "?"}
            </span>
          </div>
          <span className="text-white text-xs hidden sm:inline">
            {isAuthenticated && identity
              ? identity.getPrincipal().toText().slice(0, 10) + "..."
              : "Not signed in"}
          </span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-60 bg-white rounded shadow-lg z-50 p-3 text-sm animate-fadeIn">
            {isAuthenticated && identity ? (
              <div className="flex items-center gap-2 pb-3 border-b">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-700 font-bold">
                    {identity.getPrincipal().toText().slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-xs break-all">
                    {identity.getPrincipal().toText()}
                  </div>
                  <div className="text-xs text-gray-500">Internet Identity</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 pb-3 border-b">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div>
                  <div className="font-semibold text-xs">Not signed in</div>
                </div>
              </div>
            )}
            <button
              className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded mt-2"
              onClick={onProfileClick}
            >
              View Profile
            </button>
            {isAuthenticated && (
              <button
                className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded text-red-500"
                onClick={logout}
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
