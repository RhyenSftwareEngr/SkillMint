import React from "react";
import NavBar from "../components/NavBar";
import EventCarousel from "../components/EventCarousel"; // This is your new top events + filter/tabs bar

export default function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <NavBar />

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-80 bg-white shadow-lg rounded-2xl px-6 py-6 flex flex-col gap-6">
          {/* Search bar */}

          {/* Upcoming Events */}
          <div>
            <h3 className="font-bold text-lg mb-4">My Upcoming Events</h3>
            <ul>
              {[
                {
                  day: 6,
                  month: "June",
                  title: "Hackathon – Philippine Blockchain Week 2025",
                  time: "8:00AM - 8:00PM",
                  location: "SMX Manila",
                },
                {
                  day: 7,
                  month: "June",
                  title: "Hackathon – Philippine Blockchain Week 2025",
                  time: "8:00AM - 8:00PM",
                  location: "SMX Manila",
                },
                {
                  day: 8,
                  month: "June",
                  title: "Hackathon – Philippine Blockchain Week 2025",
                  time: "8:00AM - 8:00PM",
                  location: "SMX Manila",
                },
                {
                  day: 9,
                  month: "June",
                  title: "Hackathon – Philippine Blockchain Week 2025",
                  time: "8:00AM - 8:00PM",
                  location: "SMX Manila",
                },
              ].map((event, i, arr) => (
                <li
                  key={i}
                  className={`mb-3 ${
                    i !== arr.length - 1 ? "pb-3 border-b border-gray-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-2">
                    <div className="w-10 flex flex-col items-center justify-center bg-white rounded-md mr-2 py-1 shadow">
                      <span className="text-xl font-bold text-gray-800 leading-5">
                        {event.day}
                      </span>
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                        {event.month}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 truncate">
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-500">{event.time}</div>
                      <div className="text-xs text-gray-400">
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
          <div className="bg-gray-50 shadow rounded-2xl p-4 mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">May 2025</span>
              <div>
                <button className="text-xs p-1 rounded hover:bg-gray-200">
                  &#60;
                </button>
                <button className="text-xs p-1 rounded hover:bg-gray-200">
                  &#62;
                </button>
              </div>
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="font-semibold text-[11px]">
                  {d}
                </div>
              ))}
              {Array.from({
                length: 31 + 3,
              }) /* 3 = days before start of month for May 2025 (starts Wed) */
                .map((_, i) =>
                  i < 3 ? (
                    <div key={i}></div>
                  ) : (
                    <div
                      key={i}
                      className="py-1 rounded hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
                    >
                      {i - 2}
                    </div>
                  )
                )}
            </div>
            <button className="mt-2 w-full text-xs text-blue-600 hover:underline">
              Show Calendar
            </button>
          </div>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-1 px-8 py-6">
          {/* 🚀 Replace top event row and filter bar with carousel */}
          <EventCarousel />

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col"
              >
                <div className="h-28 bg-gray-200 rounded-t-2xl"></div>
                {/* Event details */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs text-gray-400 mb-1 flex items-center justify-between">
                    <span>Open • Ongoing</span>
                    <span className="text-xs text-gray-400">12 days left</span>
                  </div>
                  <div className="font-semibold text-sm text-gray-900 truncate mb-1">
                    Hackathon – Philippine Blockchain Week 2025
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    June 6-9, 2025 &bull; SMX Manila
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">
                      Badge
                    </span>
                    {/* Add icon here if you like */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          <div className="flex justify-center my-8">
            <button className="px-6 py-2 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-800 transition">
              Show More
            </button>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-4 text-center text-sm mt-auto">
        &copy; 2025 SkillMint, all rights reserved.
      </footer>
    </div>
  );
}
