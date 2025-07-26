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
          File.pdf
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

