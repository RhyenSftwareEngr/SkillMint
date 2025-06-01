import React from "react";

export default function Navbar({ onProfileClick }) {
  return (
    <nav className="w-full h-12 bg-[#393939] flex items-center px-3 sticky top-0 z-30">
      <div className="w-6 h-6 rounded bg-gray-200 mr-2" />
      <span className="text-white font-bold tracking-wide text-lg">
        SkillMint
      </span>
      <div
        className="ml-auto w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer"
        onClick={onProfileClick}
      />
    </nav>
  );
}
