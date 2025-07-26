import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDrawer from "../components/ProfileDrawer";

// --- Dummy Event Data (replace with real fetch if needed) ---
const mockEvent = {
  image: "https://i.imgur.com/5jCvBrU.png", // Replace with actual
  title: "Hackathon – Philippine Blockchain Week 2025",
  org: "Quezon City University",
  orgUrl: "#",
  status: "Ongoing",
  start: "May 26, 2025",
  end: "June 09, 2025",
  time: "5:00PM – 8:00PM",
  spotsRemaining: "10",
  setup: "Virtual",
  virtualLink: "https://meet.google.com/xyz-abcd-efg",
  tags: ["Hackathon", "Innovation", "TechForGood", "BuildWith"],
  description:
    "The iThink Hackathon at Philippine Blockchain Week 2025 is a dynamic competition that challenges participants to design and develop tech-forward solutions in the blockchain and AI space. Focused on innovation, collaboration, and problem-solving, the event invites creative minds to tackle real-world challenges using web3 tools and emerging technologies. With guidance from industry mentors and the excitement of a fast-paced environment, participants will push boundaries, build impactful projects, and showcase their skills to a wider tech community.",
  details: {
    "How to Join": (
      <ul className="list-disc ml-4 text-sm space-y-1">
        <li>
          Register: Fill out the official registration form (link provided by
          the organizers).
        </li>
        <li>
          <b>Team Setup:</b> You can register as a group or as an individual.
          Solo participants will be grouped with others.
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
        <li>💻 Laptop or desktop with a working mic and camera</li>
        <li>🌐 Stable internet connection</li>
        <li>🟩 Active Google account (for shared folders and submission)</li>
        <li>🧰 Your preferred tools (e.g., Figma, VS Code, Canva, Github)</li>
      </ul>
    ),
    "What Happens During the Event": (
      <ul className="list-disc ml-4 text-sm space-y-1">
        <li>
          <b>🎯 Theme Reveal:</b> Announced at the start of the hackathon – May
          26, 2025 at 9:00 AM
        </li>
        <li>
          <b>💡 Brainstorming:</b> Collaborate with your team to come up with
          your idea & development. Build your prototype within the 24-hour
          timeframe.
        </li>
        <li>
          <b>📤 Submission:</b> Upload your final files to the shared Google
          Drive by June 9, 2025 at 8:00 PM
        </li>
        <li>
          <b>📽️ Pitching:</b> Submit a short pitch/demo video (maximum 5
          minutes)
        </li>
      </ul>
    ),
    "Judging Criteria": (
      <ul className="list-disc ml-4 text-sm space-y-1">
        <li>💡 Innovation and Creativity</li>
        <li>🔧 Functionality and Execution</li>
        <li>🎯 Relevance to the Theme</li>
        <li>🛠️ Quality of Technical Implementation</li>
        <li>🎤 Quality of Presentation</li>
      </ul>
    ),
    Prizes: (
      <ul className="list-disc ml-4 text-sm space-y-1">
        <li>🏆 Top 3 Teams will win:</li>
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

// --- Dummy Attendees ---
const demoAttendees = [
  {
    id: 0,
    name: "Uzumaki Naruto",
    dateRegistered: "2025-05-01",
    status: "Confirmed",
  },
  {
    id: 1,
    name: "Uchiha Sasuke",
    dateRegistered: "2025-05-02",
    status: "Pending",
  },
  {
    id: 2,
    name: "Haruno Sakura",
    dateRegistered: "2025-05-03",
    status: "Confirmed",
  },
];

export default function CreatedEventDetailsPage() {
  const { id } = useParams();
  const [tab, setTab] = useState("Details");
  const tabNames = ["Details", "Attachment"];
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F4F8FB] flex flex-col">
      <Navbar onProfileClick={() => setDrawerOpen(true)} />
      <div className="pt-4 pb-2 max-w-6xl w-full mx-auto px-2 sm:px-6 flex-1">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-2 flex gap-1">
          <a href="/" className="hover:underline">
            Home
          </a>
          /
          <a href="/dashboard" className="hover:underline">
            Event
          </a>
          /<span>Show Event</span>
        </nav>

        {/* Main Banner */}
        <div className="rounded-t-xl overflow-hidden mb-2">
          <img
            src={mockEvent.image}
            alt="Event banner"
            className="w-full h-32 sm:h-40 md:h-52 object-cover"
          />
        </div>

        {/* Main Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-b-xl shadow-lg p-4">
          {/* Left/Main info */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="font-bold text-xl sm:text-2xl mb-0">
              {mockEvent.title}
            </h2>
            <div className="flex items-center text-xs text-gray-500 gap-1 mb-1">
              <span>Organized by</span>
              <a
                href={mockEvent.orgUrl}
                className="underline hover:text-blue-600 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {mockEvent.org}
              </a>
            </div>

            {/* Key Dates */}
            <div className="mb-2">
              <div className="font-semibold text-sm mb-1">Key Dates</div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-200 text-xs rounded">
                  {mockEvent.status}
                </span>
                <span className="text-xs">
                  <b>Start Date:</b> {mockEvent.start}
                </span>
                <span className="text-xs">
                  <b>End Date:</b> {mockEvent.end} &nbsp; | &nbsp;
                  <b>Time:</b> {mockEvent.time}
                </span>
              </div>
            </div>

            {/* Registration */}
            <div>
              <div className="font-semibold text-sm mb-1">Registration</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-xs">
                  {mockEvent.spotsRemaining} Spots Remaining
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
                  {mockEvent.setup}
                </span>
                {mockEvent.setup === "Virtual" && (
                  <a
                    href={mockEvent.virtualLink}
                    className="ml-2 text-blue-600 underline break-all text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {mockEvent.virtualLink}
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="font-semibold text-sm mb-1">Description</div>
              <div className="text-xs text-gray-700 whitespace-pre-line">
                {mockEvent.description}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 my-2">
              {mockEvent.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-2 py-0.5 rounded text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Edit/Cancel Buttons */}
            <div className="flex gap-2 mt-2">
              <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-xs font-medium">
                Edit Event
              </button>
              <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-xs font-medium">
                Cancel Event
              </button>
            </div>

            {/* --- Attendees Table --- */}
            <div className="mt-8">
              <div className="font-semibold text-2xl mb-2">Attendees</div>
              <hr className="mb-2" />
              <div className="flex flex-wrap gap-2 mb-2 items-center">
                {/* Search */}
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-64 max-w-full">
                  <svg
                    className="w-4 h-4 text-gray-400 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <circle cx={11} cy={11} r={8} />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent border-none outline-none flex-1 text-sm"
                  />
                </div>
                {/* Filter Button */}
                <button className="flex items-center bg-gray-100 rounded-full px-4 py-1 text-sm font-medium gap-1 hover:bg-gray-200 transition">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 5h18M6 8v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8M9 12h6" />
                  </svg>
                  Filter
                </button>
                {/* Spacer */}
                <div className="flex-1"></div>
                {/* Finalize & Export */}
                <button className="bg-gray-200 rounded-full px-5 py-1 text-sm font-medium hover:bg-gray-300 transition mr-2">
                  Finalize List
                </button>
                <button className="bg-gray-100 rounded-full px-5 py-1 text-sm font-medium flex items-center gap-1 hover:bg-gray-200 transition">
                  Export list
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 5v14m7-7H5" />
                  </svg>
                </button>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="px-3 py-2 w-6">
                        <input type="checkbox" />
                      </th>
                      <th className="px-3 py-2 font-medium text-left whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          id
                          <span className="text-xs">⇅</span>
                        </div>
                      </th>
                      <th className="px-3 py-2 font-medium text-left whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          Name
                          <span className="text-xs">⇅</span>
                        </div>
                      </th>
                      <th className="px-3 py-2 font-medium text-left whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          Date Registered
                          <span className="text-xs">⇅</span>
                        </div>
                      </th>
                      <th className="px-3 py-2 font-medium text-left whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          Status
                          <span className="text-xs">⇅</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoAttendees.map((att, idx) => (
                      <tr key={att.id} className={idx % 2 ? "bg-gray-50" : ""}>
                        <td className="px-3 py-2">
                          <input type="checkbox" />
                        </td>
                        <td className="px-3 py-2">{att.id}</td>
                        <td className="px-3 py-2">{att.name}</td>
                        <td className="px-3 py-2">{att.dateRegistered}</td>
                        <td className="px-3 py-2">{att.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right/Tabbed Details */}
          <div>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-2">
              {tabNames.map((t) => (
                <button
                  key={t}
                  className={`flex-1 px-2 py-1 text-sm font-semibold border-b-2 transition ${
                    tab === t
                      ? "border-blue-600 text-blue-700"
                      : "border-transparent text-gray-500"
                  }`}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="mt-2 min-h-[320px]">
              {tab === "Details" ? (
                <div className="space-y-4">
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      How to Join
                    </div>
                    {mockEvent.details["How to Join"]}
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      What to Prepare
                    </div>
                    {mockEvent.details["What to Prepare"]}
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      What Happens During the Event
                    </div>
                    {mockEvent.details["What Happens During the Event"]}
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      Judging Criteria
                    </div>
                    {mockEvent.details["Judging Criteria"]}
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      Prizes
                    </div>
                    {mockEvent.details["Prizes"]}
                  </div>
                </div>
              ) : (
                <div>{mockEvent.details["Attachment"]}</div>
              )}
            </div>
          </div>
        </div>
        <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
      <Footer />
    </div>
  );
}
