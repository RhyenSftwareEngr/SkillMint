import React from "react";
import EventCard from "./EventCard";

export default function EventsGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        <div className="flex items-center gap-3 mx-auto">
          <div className="flex bg-gray-200 rounded-full p-1">
            <button className="px-5 py-1 rounded-full font-medium transition bg-gray-400 text-white">
              All Events
            </button>
            <button className="px-5 py-1 rounded-full font-medium transition bg-gray-200 text-gray-800">
              Created Events
            </button>
          </div>
          <select className="ml-2 px-3 py-1 rounded-full bg-gray-200 border-none text-sm focus:ring-0">
            <option value="latest">Sort</option>
            <option value="latest">Latest</option>
            <option value="soonest">Soonest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <EventCard key={n} />
        ))}
      </div>
    </div>
  );
}
