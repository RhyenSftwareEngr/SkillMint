import React, { useState, useRef, useEffect } from "react";
import UserMenu from "./UserMenu";

export default function Navbar({ onProfileClick }) {
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
    <nav className="w-full h-12 bg-[#393939] flex items-center px-3 sticky top-0 z-30">
      {/* Logo */}
      <div className="w-6 h-6 rounded bg-gray-200 mr-2" />
      <span className="text-white font-bold tracking-wide text-lg">
        SkillMint
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* SMT Tokens (hidden on xs) */}
      <span className="text-white text-xs mr-6 hidden sm:inline-block">
        SMT Tokens
      </span>

      {/* User Profile Dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center gap-2"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
            {/* Avatar/initial */}
            <span className="text-white font-bold">A</span>
          </div>
          <span className="text-white text-xs hidden sm:inline">
            Angela Tallon
          </span>
        </button>
        {menuOpen && (
          <UserMenu
            onProfileClick={() => {
              setMenuOpen(false);
              onProfileClick();
            }}
          />
        )}
      </div>
    </nav>
  );
}
