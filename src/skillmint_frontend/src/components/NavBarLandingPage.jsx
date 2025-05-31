import React from "react";

export default function NavBarLandingPage({ onProfileClick }) {
  return (
    <nav className="w-full bg-white shadow-sm px-8 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center">
        <span className="text-xl font-bold text-blue-700 tracking-tight">
          SkillMint
        </span>
      </div>

      {/* Middle: Nav Links */}
      {/* <div className="flex gap-8 ml-12">
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Events
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Scope
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          About
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Contact
        </a>
      </div> */}

      {/* Right: CTA + Icons */}
      <div className="flex items-center gap-3">
        <button className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700">
          Join Now
        </button>
        {/* Circle icons as placeholders */}
        <button
          className="ml-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
          onClick={onProfileClick}
        >
          {/* Simple user icon (SVG or your favorite icon) */}
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20c0-2.21 3.58-4 6-4s6 1.79 6 4" />
          </svg>
        </button>
        <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          {/* Search icon */}
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
      </div>
    </nav>
  );
}
