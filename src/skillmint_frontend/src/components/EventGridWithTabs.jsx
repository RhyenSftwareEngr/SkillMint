import React, { useState } from "react";

// Dummy Data
const createdEvents = [
  {
    id: 1,
    title: "Hackathon – Philippine Blockchain Week 2025",
    date: "May 26, 2025 – June 09, 2025",
    tags: ["Virtual", "Upcoming"],
    daysLeft: 12,
  },
  {
    id: 2,
    title: "AI Bootcamp 2025",
    date: "June 10, 2025 – June 12, 2025",
    tags: ["Onsite", "Upcoming"],
    daysLeft: 15,
  },
];

const allEvents = [
  ...createdEvents,
  {
    id: 3,
    title: "DevFest Luzon",
    date: "June 15, 2025",
    tags: ["Onsite", "Open"],
    daysLeft: 21,
  },
  {
    id: 4,
    title: "Women in Tech",
    date: "July 1, 2025",
    tags: ["Virtual", "Upcoming"],
    daysLeft: 37,
  },
  {
    id: 5,
    title: "Google I/O Extended PH",
    date: "June 20, 2025",
    tags: ["Onsite", "Upcoming"],
    daysLeft: 26,
  },
  {
    id: 6,
    title: "PyCon APAC",
    date: "August 10, 2025",
    tags: ["Onsite", "Open"],
    daysLeft: 77,
  },
];

export default function EventGridWithTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const [sort, setSort] = useState("latest");

  // For simplicity, no actual sort logic—just placeholder
  const displayedAllEvents = allEvents;
  const displayedCreatedEvents = createdEvents;

  return (
    // Responsive container: horizontal padding and no overflow
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 overflow-x-hidden">
      {/* Header, Tabs, Sort */}
      <div className="flex items-center justify-between mb-3 mt-">
        <h2 className="text-2xl font-bold">Events</h2>
        <div className="w-full flex justify-center">
          <div className="flex bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-1 rounded-full font-medium transition ${
                activeTab === "all"
                  ? "bg-gray-400 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveTab("created")}
              className={`px-5 py-1 rounded-full font-medium transition ${
                activeTab === "created"
                  ? "bg-gray-400 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Created Events
            </button>
          </div>
        </div>
        <select
          className="ml-2 px-3 py-1 rounded-full bg-gray-200 border-none text-sm focus:ring-0"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Sort</option>
          <option value="latest">Latest</option>
          <option value="soonest">Soonest</option>
        </select>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activeTab === "all" &&
          displayedAllEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}

        {activeTab === "created" && (
          <>
            {/* + Card */}
            <div
              className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl h-60 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => alert("Open create event modal!")}
            >
              <span className="text-5xl text-gray-400 font-light">+</span>
            </div>
            {displayedCreatedEvents.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 mt-12">
                You haven’t created any events yet.
              </div>
            ) : (
              displayedCreatedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-end min-h-[240px] hover:shadow-lg transition">
      <div className="h-24 bg-gray-200 rounded mb-2"></div>
      <div className="flex gap-2 text-xs mb-1 flex-wrap">
        {event.tags?.map((tag, i) => (
          <span key={i} className="bg-gray-200 rounded px-2 py-0.5">
            {tag}
          </span>
        ))}
        <span className="text-gray-400">{event.daysLeft} days left</span>
      </div>
      <div className="font-semibold text-sm truncate">{event.title}</div>
      <div className="text-xs text-gray-500">{event.date}</div>
      <div className="mt-1 text-xs">Badge</div>
    </div>
  );
}
