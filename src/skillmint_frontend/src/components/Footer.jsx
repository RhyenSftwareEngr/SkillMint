import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#002C54] text-white text-center py-4 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
        <div className="text-sm">© {new Date().getFullYear()} SkillMint. All rights reserved.</div>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="/about" className="hover:underline">About</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
