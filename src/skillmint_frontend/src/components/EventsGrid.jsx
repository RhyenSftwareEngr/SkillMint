import React, { useState } from "react";
import EventCard from "./EventCard";
import EventDetailDrawer from "./EventDetailDrawer";

// Demo data for All Events
const allEvents = [
  {
    id: 1,
    title: "Hackathon – Philippine Blockchain Week 2025",
    organizer: "Quezon City University",
    image: "https://i.imgur.com/JgYD2Da.png",
    startDate: "May 26, 2025",
    endDate: "June 09, 2025",
    time: "5:00PM - 8:00PM",
    slots: "100",
    remaining: "25",
    virtualLink: "https://meet.google.com/xyz-abcd-efg",
    type: "Virtual",
    tags: ["Hackathon", "Innovation", "TechForGood", "BuildWith"],
    description: "The PH Blockchain at PBW 2025 is a dynamic competition...",
    badge: true,
    certificate: false,
    source: "all",
  },
  // ...add more demo events for All Events
];

// Demo data for Created Events
const createdEvents = [
  {
    id: 101,
    title: "Universa Hackathon",
    organizer: "Universa Org",
    image: "https://i.imgur.com/5jCvBrU.png",
    startDate: "May 26, 2025",
    endDate: "June 09, 2025",
    time: "5:00PM - 8:00PM",
    slots: "50",
    remaining: "10",
    virtualLink: "https://meet.google.com/xyz-abcd-efg",
    type: "Virtual",
    tags: ["Hackathon", "Innovation", "TechForGood", "BuildWith"],
    description: "Universa Hackathon is a sample created event...",
    badge: true,
    certificate: true,
    source: "created",
  },
  // ...add more demo events for Created Events
];

export default function EventsGrid({ onCreateEventClick }) {
  const [tab, setTab] = useState("all"); // "all" or "created"
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsToShow = tab === "all" ? allEvents : createdEvents;

  return (
    <div className="bg-[#F4F8FB] w-full">
      <div className="w-full flex items-center justify-between mb-6 relative">
        <h2 className="text-2xl font-bold">Events</h2>
        {/* Tabs */}
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
        <select className="ml-2 px-3 py-1 rounded-full bg-gray-200 border-none text-sm focus:ring-0">
          <option value="latest">Sort</option>
          <option value="latest">Latest</option>
          <option value="soonest">Soonest</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {tab === "created" && (
          <div
            className="flex items-center justify-center min-h-[210px] border-2 border-dashed border-blue-400 rounded-xl cursor-pointer hover:bg-blue-50 transition"
            onClick={onCreateEventClick}
          >
            <span className="text-6xl text-blue-400 font-light">+</span>
          </div>
        )}
        {eventsToShow.map((event) => (
          <div key={event.id} onClick={() => setSelectedEvent(event)}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
      <EventDetailDrawer
        open={!!selectedEvent}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        source={tab}
      />
    </div>
  );
}
