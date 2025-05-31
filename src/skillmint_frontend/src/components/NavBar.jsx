import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* You can replace this with your logo image */}
          <span className="text-xl font-bold text-blue-700 tracking-tight">
            SkillMint
          </span>
        </Link>
        {/* Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/events" className="text-gray-700 hover:text-blue-600 transition">
            Events
          </Link>
          <Link to="/scope" className="text-gray-700 hover:text-blue-600 transition">
            Scope
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
            Contact
          </Link>
        </div>
        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/signup"
            className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Join Now
          </Link>
        </div>
        {/* Mobile Menu Button (optional, basic placeholder) */}
        <div className="md:hidden">
          <button className="p-2 rounded hover:bg-gray-100">
            {/* Hamburger icon */}
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
