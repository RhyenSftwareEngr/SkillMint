import React, { useState } from "react";

// Dummy data (replace with real event object)
const mockEvent = {
  image: "https://i.imgur.com/yU5rHNM.png",
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
    "The PH Blockchain at PBW 2025 is a dynamic competition that challenges participants to design and develop tech-forward solutions in the blockchain and AI space. Focused on innovation, collaboration, and problem-solving, the event invites creative minds to tackle real-world challenges using new tools and emerging technologies. With guidance from industry mentors and the excitement of a fast-paced environment, participants will push boundaries, build impactful projects, and showcase their skills to a wider tech community.",
  details: {
    "How to Join": (
      <ul className="list-disc ml-4 text-sm space-y-1">
        <li>
          Register: Fill out the official registration form (link provided by
          the organizers).
        </li>
        <li>
          <b>Team Setup:</b> You can register as a group or an individual. Solo
          participants will be grouped with others.
        </li>
        <li>
          Confirmation: Check your email for confirmation, event guidelines, and
          resources.
        </li>
        <li>
          <b>Orientation:</b> Mandatory Orientation on June 7, 2025 at 5:00 PM
          via Google Meet.
        </li>
      </ul>
    ),
    "What to Prepare": (
      <ul className="list-disc ml-4 text-sm space-y-1">
        <li>Laptop or desktop with a working mic and camera</li>
        <li>Stable internet connection</li>
        <li>Active Google account (for shared folders and submission)</li>
        <li>Your preferred tools (e.g., Figma, VS Code, Canva, Github)</li>
      </ul>
    ),
    "What Happens During the Event": (
      <ul className="list-disc ml-4 text-sm space-y-1">
        <li>
          <b>Theme Reveal:</b> Announced at the start of the hackathon – May 26,
          2025 at 9:00 AM
        </li>
        <li>
          <b>Brainstorming:</b> Collaborate with your team to come up with your
          idea & development. Build your prototype within the 24-hour timeframe.
        </li>
        <li>
          <b>Submission:</b> Upload your final files to the shared Google Drive
          by June 9, 2025 at 8:00 PM
        </li>
        <li>
          <b>Pitching:</b> Submit a short pitch/demo video (maximum 5 minutes)
        </li>
      </ul>
    ),
    "Judging Criteria": (
      <ul className="list-disc ml-4 text-sm space-y-1">
        <li>Innovation and Creativity</li>
        <li>Functionality and Execution</li>
        <li>Relevance to the Theme</li>
        <li>Quality of Technical Implementation</li>
        <li>Quality of Presentation</li>
      </ul>
    ),
    Prizes: (
      <ul className="list-disc ml-4 text-sm space-y-1">
        <li>Top 3 Teams will win:</li>
        <li>Digital certificates</li>
        <li>Tech goodies</li>
        <li>Featured on the official event site and social media pages</li>
      </ul>
    ),
    Attachment: (
      <div>
        <a
          href="/Grow_A_Garden_Cheats.pdf"
          className="text-blue-600 underline text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Grow_A_Garden_Cheats.pdf (12.3 MB)
        </a>
      </div>
    ),
  },
};

export default function EventDetailsPage({ event = mockEvent }) {
  const [tab, setTab] = useState("Details");
  const tabNames = ["Details", "Attachment"];

  return (
    <div className="min-h-screen bg-[#F4F8FB] flex flex-col">
      {/* Padding for fixed nav (if any) */}
      <div className="pt-4 pb-2 max-w-6xl w-full mx-auto px-2 sm:px-6 flex-1">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-2 flex gap-1">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          /
          <a href="/dashboard" className="hover:underline">
            Event
          </a>{" "}
          /<span>Show Event</span>
        </nav>
        {/* Main Banner */}
        <div className="rounded-t-xl overflow-hidden mb-2">
          <img
            src={event.image}
            alt="Event banner"
            className="w-full h-32 sm:h-40 md:h-52 object-cover"
          />
        </div>

        {/* Main Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-b-xl shadow-lg p-4">
          {/* Left/Main info */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="font-bold text-xl sm:text-2xl mb-0">
              {event.title}
            </h2>
            <div className="flex items-center text-xs text-gray-500 gap-1 mb-1">
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
            {/* Key Dates */}
            <div className="mb-2">
              <div className="font-semibold text-sm mb-1">Key Dates</div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-200 text-xs rounded">
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
            {/* Setup */}
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
            {/* Register Button */}
            <button className="w-full sm:w-48 mt-2 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow transition">
              Register Now
            </button>
          </div>

          {/* Right/Tabbed Details */}
          <div>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-2">
              <button
                className={`flex-1 px-2 py-1 text-sm font-semibold border-b-2 transition ${
                  tab === "Details"
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setTab("Details")}
              >
                Details
              </button>
              <button
                className={`flex-1 px-2 py-1 text-sm font-semibold border-b-2 transition ${
                  tab === "Attachment"
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setTab("Attachment")}
              >
                Attachment
              </button>
            </div>
            {/* Tab Content */}
            <div className="mt-2 min-h-[320px]">
              {tab === "Details" ? (
                <div className="space-y-4">
                  {/* Your section order here */}
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      How to Join
                    </div>
                    {event.details["How to Join"]}
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      What to Prepare
                    </div>
                    {event.details["What to Prepare"]}
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      What Happens During the Event
                    </div>
                    {event.details["What Happens During the Event"]}
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      Judging Criteria
                    </div>
                    {event.details["Judging Criteria"]}
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      Prizes
                    </div>
                    {event.details["Prizes"]}
                  </div>
                </div>
              ) : (
                <div>{event.details["Attachment"]}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
