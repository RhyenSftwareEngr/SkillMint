import React from "react";

export default function LeftSidebar() {
  return (
    <aside className="w-80 min-w-[180px] max-w-xs pr-2">
      <h3 className="font-bold text-[19px] mb-2 mt-1">My Upcoming Events</h3>
      <div className="flex items-center bg-gray-100 rounded h-8 px-2 mb-3">
        <svg
          className="w-4 h-4 text-gray-400 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none flex-1 text-xs"
        />
      </div>
      <ul className="space-y-2 mb-2">
        {[6, 7, 8, 9].map((d, idx) => (
          <li
            key={idx}
            className="bg-[#F4F4F4] border border-[#C6C6C6] rounded flex items-center px-2 py-2"
          >
            <div className="w-10 text-center border-r border-gray-300 pr-2 flex flex-col items-center">
              <span className="block font-bold text-[20px] leading-none">
                {d}
              </span>
              <span className="text-[11px] uppercase text-gray-500 leading-none mt-[1px]">
                June
              </span>
            </div>
            <div className="pl-2 flex-1 text-[12px] max-w-[230px]">
              <div className="font-semibold leading-snug break-words whitespace-normal">
                Hackathon – Philippine Blockchain Week 2025
              </div>
              <div className="text-gray-500 text-[10px]">
                May 26, 2025 – June 09, 2025 | 5:00PM - 8:00PM
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-right mb-3">
        <button className="text-xs text-[#393939] underline">Show All</button>
      </div>
      {/* Calendar */}
      <div className="bg-[#F4F4F4] rounded p-3 mt-2 border border-gray-200">
        <div className="flex justify-between items-center mb-1 text-xs">
          <span className="font-semibold">May 2025</span>
          <div>
            <button className="px-2 text-gray-700">&lt;</button>
            <button className="px-2 text-gray-700">&gt;</button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center text-[11px] text-gray-500 mb-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center text-xs">
          {Array.from({ length: 35 }).map((_, i) => (
            <span key={i} className="py-0.5">
              {i > 1 ? i - 1 : ""}
            </span>
          ))}
        </div>
        <button className="w-full text-xs text-[#393939] underline mt-2 text-right block">
          Show Calendar
        </button>
      </div>
    </aside>
  );
}
