import React from "react";

export default function EventCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col min-h-[210px] hover:shadow-xl transition">
      {/* Placeholder image area */}
      <div className="h-20 bg-gradient-to-br from-blue-100 to-blue-300 rounded mb-2 flex items-center justify-center">
        <span className="text-blue-600 font-bold">IMG</span>
      </div>
      <div className="flex gap-2 text-xs mb-1 flex-wrap">
        <span className="bg-blue-100 text-blue-700 rounded px-2 py-0.5">
          Virtual
        </span>
        <span className="bg-blue-100 text-blue-700 rounded px-2 py-0.5">
          Upcoming
        </span>
        <span className="text-gray-400">12 days left</span>
      </div>
      <div className="font-semibold text-base truncate">
        Hackathon – Philippine Blockchain Week 2025
      </div>
      <div className="text-xs text-gray-500">May 26, 2025 – June 09, 2025</div>
      <div className="mt-1 text-xs text-blue-600">Badge</div>
    </div>
  );
}
