import React from "react";

export default function EventCard() {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[210px] hover:shadow-lg transition">
      <div className="h-20 bg-gray-200 rounded mb-2"></div>
      <div className="flex gap-2 text-xs mb-1 flex-wrap">
        <span className="bg-gray-200 rounded px-2 py-0.5">Virtual</span>
        <span className="bg-gray-200 rounded px-2 py-0.5">Upcoming</span>
        <span className="text-gray-400">12 days left</span>
      </div>
      <div className="font-semibold text-sm truncate">
        Hackathon – Philippine Blockchain Week 2025
      </div>
      <div className="text-xs text-gray-500">May 26, 2025 – June 09, 2025</div>
      <div className="mt-1 text-xs">Badge</div>
    </div>
  );
}
