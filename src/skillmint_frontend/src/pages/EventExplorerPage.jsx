import React, { useState } from "react";
import NavBar from "../components/NavBar";
import EventCarousel from "../components/EventCarousel";
import ProfileDrawer from "../components/ProfileDrawer";
import EventGridWithTabs from "../components/EventGridWithTabs";

export default function DashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen flex flex-col font-sans">
      {/* NavBar */}
      <NavBar onProfileClick={() => setDrawerOpen(true)} />

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col">
        {/* Responsive max-width container */}
        <div className="max-w-7xl mx-auto w-full flex gap-6 px-2 md:px-4 py-8 min-h-[90vh]">
          {/* Sidebar */}
          <aside className="w-72 min-w-[210px] max-w-xs bg-white shadow-xl rounded-2xl px-4 py-5 flex flex-col gap-5">
            {/* Search bar */}
            <div className="flex items-center gap-2 bg-gray-100 px-2 py-1.5 rounded-lg mb-1">
              <svg
                className="w-5 h-5 text-gray-400"
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
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>
            {/* Upcoming Events */}
            <div>
              <h3 className="font-bold text-lg mb-3">My Upcoming Events</h3>
              <ul>
                {[
                  {
                    day: 6,
                    month: "June",
                    title: "Hackathon – Philippine Blockchain Week 2025",
                    time: "5:00PM - 8:00PM",
                    location: "SMX Manila",
                  },
                  {
                    day: 7,
                    month: "June",
                    title: "Hackathon – Philippine Blockchain Week 2025",
                    time: "5:00PM - 8:00PM",
                    location: "SMX Manila",
                  },
                  {
                    day: 8,
                    month: "June",
                    title: "Hackathon – Philippine Blockchain Week 2025",
                    time: "5:00PM - 8:00PM",
                    location: "SMX Manila",
                  },
                  {
                    day: 9,
                    month: "June",
                    title: "Hackathon – Philippine Blockchain Week 2025",
                    time: "5:00PM - 8:00PM",
                    location: "SMX Manila",
                  },
                ].map((event, i, arr) => (
                  <li
                    key={i}
                    className={`mb-2 ${
                      i !== arr.length - 1
                        ? "pb-2 border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-1.5 py-1.5">
                      <div className="w-8 h-10 flex flex-col items-center justify-center bg-white rounded shadow mr-1">
                        <span className="text-base font-bold text-gray-800 leading-4">
                          {event.day}
                        </span>
                        <span className="text-[9px] font-medium text-gray-500 uppercase tracking-wide">
                          {event.month}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-gray-900 truncate">
                          {event.title}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {event.time}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                <li className="mt-1 text-right">
                  <button className="text-xs text-blue-600 hover:underline">
                    Show All
                  </button>
                </li>
              </ul>
            </div>
            {/* Calendar */}
            <div className="bg-gray-50 shadow rounded-2xl p-3 mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">May 2025</span>
                <div>
                  <button className="text-xs p-1 rounded hover:bg-gray-200">
                    &#60;
                  </button>
                  <button className="text-xs p-1 rounded hover:bg-gray-200">
                    &#62;
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-gray-500 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="font-semibold">
                    {d}
                  </div>
                ))}
                {Array.from({ length: 31 + 3 }).map((_, i) =>
                  i < 3 ? (
                    <div key={i}></div>
                  ) : (
                    <div
                      key={i}
                      className="py-0.5 rounded hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
                    >
                      {i - 2}
                    </div>
                  )
                )}
              </div>
              <button className="mt-1 w-full text-xs text-blue-600 hover:underline">
                Show Calendar
              </button>
            </div>
          </aside>
          {/* Main Dashboard */}
          <main className="flex-1 flex flex-col min-w-0">
            {/* Event Carousel (top row) */}
            <EventCarousel />
            {/* Events Grid and Tabs */}
            <div className="mt-2">
              <EventGridWithTabs />
            </div>
          </main>
        </div>
      </div>
      {/* Profile Drawer */}
      <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-4 text-center text-sm mt-auto">
        &copy; 2025 SkillMint, all rights reserved.
      </footer>
    </div>
  );
}
