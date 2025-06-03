import React, { useState } from "react";
import EventCard from "./EventCard"; // adjust the path if needed

export default function EventsGrid() {
  const [tab, setTab] = useState("all"); // "all" or "created"
  return (
    <div className="bg-[#F4F8FB] w-full">
      <div className="w-full flex items-center justify-between mb-6 relative">
        {/* Left: Events Title */}
        <h2 className="text-2xl font-bold">Events</h2>

        {/* Center: Tabs */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex bg-gray-200 rounded-full p-1">
          <button
            className={`px-5 py-1 rounded-full font-medium transition ${
              tab === "all"
                ? "bg-gray-400 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setTab("all")}
          >
            All Events
          </button>
          <button
            className={`px-5 py-1 rounded-full font-medium transition ${
              tab === "created"
                ? "bg-gray-400 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setTab("created")}
          >
            Created Events
          </button>
        </div>

        {/* Right: Sort Dropdown */}
        <select className="ml-2 px-3 py-1 rounded-full bg-gray-200 border-none text-sm focus:ring-0">
          <option value="latest">Sort</option>
          <option value="latest">Latest</option>
          <option value="soonest">Soonest</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {tab === "created" && (
          <div className="flex items-center justify-center min-h-[210px] border-2 border-dashed border-blue-400 rounded-xl cursor-pointer hover:bg-blue-50 transition">
            <span className="text-6xl text-blue-400 font-light">+</span>
          </div>
        )}
        {/* Example: use your real event data here */}
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <EventCard key={n} />
        ))}
      </div>
    </div>
  );
}
