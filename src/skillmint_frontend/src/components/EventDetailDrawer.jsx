import React from "react";
import { Link } from "react-router-dom";

// You can pass event details as props or mock here for demo
const mockEvent = {
  image: "https://i.imgur.com/yU5rHNM.png", // Replace with your actual event image URL
  title: "Hackathon – Philippine Blockchain Week 2025",
  org: "Quezon City University",
  orgUrl: "#",
  status: "Upcoming",
  start: "May 26, 2025",
  end: "June 09, 2025",
  time: "5:00PM – 8:00PM",
  slots: "100",
  spotsRemaining: "10",
  setup: "Virtual",
  virtualLink: "https://meet.google.com/xyz-abcd-efg",
  tags: ["Hackathon", "Innovation", "TechForGood", "BuildWith"],
  description:
    "The PH Blockchain at PBW 2025 is a dynamic competition that challenges participants to design and develop tech-forward solutions in the blockchain and web3 space. Focused on innovation, collaboration, and problem-solving, the event invites amazing minds to tackle real-world challenges using new tools and exciting technologies. With guidance from industry mentors and the excitement of a fast-paced competition, participants will push boundaries, build impactful projects, and showcase their skills to a wider tech community.",
};

export default function EventDetailDrawer({
  open,
  onClose,
  event = mockEvent,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end bg-black bg-opacity-30">
      {/* Drawer */}
      <div
        className="
          bg-white rounded-l-xl shadow-2xl
          w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl
          max-h-[calc(100vh-32px)] mt-4 mb-4 mr-0 overflow-y-auto
          animate-fadeIn
          flex flex-col
        "
        style={{ scrollbarGutter: "stable" }} // for consistent scrollbars
      >
        {/* Header */}
        <div className="relative">
          <img
            src={event.image}
            alt="Event banner"
            className="w-full h-36 sm:h-48 object-cover rounded-tl-xl rounded-tr-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white/70 hover:bg-white rounded-full p-1 shadow text-2xl"
            aria-label="Close event drawer"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 flex-1 flex flex-col gap-3">
          {/* Title and org */}
          <div>
            <h2 className="font-bold text-lg sm:text-xl mb-1">{event.title}</h2>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <span>Organized by</span>
              <a
                href={event.orgUrl}
                className="underline hover:text-blue-600 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {event.org}
              </a>
            </div>
          </div>

          {/* Key Dates/Status */}
          <div>
            <div className="font-semibold text-sm mb-1">Key Dates</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-gray-200 text-xs rounded mr-2">
                {event.status}
              </span>
              <span className="text-xs">
                <b>Start Date:</b> {event.start}
              </span>
              <span className="text-xs">
                <b>End Date:</b> {event.end} &nbsp; | &nbsp;
                <b>Time:</b> {event.time}
              </span>
            </div>
          </div>

          {/* Registration */}
          <div>
            <div className="font-semibold text-sm mb-1">Registration</div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-xs">
                {event.spotsRemaining} Spots Remaining
              </span>
              <span className="text-xs text-gray-500">
                Make sure to register before spots run out.
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Registration Ends in:{" "}
              <span className="font-semibold">12 Days</span>
            </div>
          </div>

          {/* Setup / Virtual link */}
          <div>
            <div className="font-semibold text-sm mb-1">Setup</div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-gray-100 text-xs rounded">
                {event.setup}
              </span>
              {event.setup === "Virtual" && (
                <a
                  href={event.virtualLink}
                  className="ml-2 text-blue-600 underline break-all text-xs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.virtualLink}
                </a>
              )}
            </div>
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Description */}
          <div>
            <div className="font-semibold text-sm mb-1">Description</div>
            <div className="text-xs text-gray-700 whitespace-pre-line">
              {event.description}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 my-2">
            {event.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-200 px-2 py-0.5 rounded text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-2 flex flex-col gap-2">
            <Link
              to={`/event/${event.id || "demo"}`} // Use event.id for real data
              className="w-full py-2 rounded-full bg-gray-200 hover:bg-gray-300 font-medium text-xs sm:text-sm transition text-center block"
            >
              Show more details
            </Link>
            <button className="w-full py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow transition">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
