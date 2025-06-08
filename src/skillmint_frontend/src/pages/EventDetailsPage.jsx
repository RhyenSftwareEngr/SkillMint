import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDrawer from "../components/ProfileDrawer";
import { getEventInfo } from "../utils/backend";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Details");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      try {
        console.log('[EventDetailsPage] id param:', id);
        const eventData = await getEventInfo(BigInt(id));
        console.log('[EventDetailsPage] raw eventData:', eventData);
        // If eventData is an array, extract the first element
        const eventObj = Array.isArray(eventData) ? eventData[0] : eventData;
        console.log('[EventDetailsPage] eventObj used for display:', eventObj);
        setEvent(eventObj);
      } catch (err) {
        console.error('[EventDetailsPage] Error fetching event:', err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading event...</div>;
  }
  if (!event || (event && !event.event_name && !event.title && !event.info?.profile?.event_name)) {
    console.error('[EventDetailsPage] Event not found or is unavailable. event:', event);
    return <div className="min-h-screen flex items-center justify-center text-red-600">Event not found or is unavailable.</div>;
  }

  const tabNames = ["Details", "Attachment"];

  // Helper functions for formatting
  const formatDate = (nanos) => {
    if (!nanos) return "";
    const date = new Date(Number(nanos) / 1_000_000);
    return date.toLocaleDateString();
  };
  const formatTime = (nanos) => {
    if (!nanos) return "";
    const date = new Date(Number(nanos) / 1_000_000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Extract profile if present
  const profile = event.info?.profile || event;
  console.log('[EventDetailsPage] extracted profile:', profile);
  console.log('[EventDetailsPage] event_name:', profile.event_name || event.info?.event_name || event.event_name);
  console.log('[EventDetailsPage] start_date:', profile.event_date || event.info?.event_date || event.event_date);
  console.log('[EventDetailsPage] end_date:', profile.event_end_date || event.info?.event_end_date || event.event_end_date);
  console.log('[EventDetailsPage] description:', profile.event_description || event.info?.event_description || event.event_description);
  const badge = profile.badge || event.badge;
  const hasBadge = badge && badge.name;

  // Helper to get the best image
  const getEventImage = () => {
    return (
      profile.banner_image ||
      profile.image ||
      (profile.badge && profile.badge.image_url) ||
      event.banner_image ||
      event.image ||
      (event.badge && event.badge.image_url) ||
      ''
    );
  };
  // Helper to get the best date/time
  const getDate = () => profile.event_date || profile.start_date || profile.startDate || profile.date || event.info?.event_date || event.event_date || event.start_date || event.startDate || event.date || null;
  const getEndDate = () => profile.event_end_date || profile.end_date || profile.endDate || event.info?.event_end_date || event.event_end_date || event.end_date || event.endDate || null;
  const getTime = () => profile.event_time || profile.time || event.info?.event_time || event.event_time || event.time || null;

  // Helper to render Motoko enum objects as strings
  function renderEnum(enumObj) {
    if (typeof enumObj === 'string') return enumObj;
    if (typeof enumObj === 'object' && enumObj !== null) {
      return Object.keys(enumObj)[0];
    }
    return '';
  }

  return (
    <div className="min-h-screen bg-[#F4F8FB] flex flex-col">
      {/* Padding for fixed nav (if any) */}
      <Navbar onProfileClick={() => setDrawerOpen(true)} />
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
          {getEventImage() ? (
            <img
              src={getEventImage()}
              alt="Event banner"
              className="w-full h-32 sm:h-40 md:h-52 object-cover"
            />
          ) : (
            <div className="w-full h-32 sm:h-40 md:h-52 flex items-center justify-center bg-gray-100 text-gray-400">No image available</div>
          )}
        </div>

        {/* Main Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-b-xl shadow-lg p-4">
          {/* Left/Main info */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="font-bold text-xl sm:text-2xl mb-0">
              {profile.event_name || profile.title || event.info?.event_name || event.event_name || event.title}
            </h2>
            <div className="flex items-center text-xs text-gray-500 gap-1 mb-1">
              <span>Organized by</span>
              <span className="underline hover:text-blue-600 font-medium">
                {profile.organizer || profile.org || event.info?.organizer || event.info?.org || event.organizer || event.org || "SkillMint"}
              </span>
            </div>
            {/* Badges */}
            {hasBadge && (
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full font-semibold text-xs shadow">
                  🏅 {badge.name}
                </span>
                <span className="text-xs text-gray-600">{badge.description}</span>
              </div>
            )}
            {/* Key Dates */}
            <div className="mb-2">
              <div className="font-semibold text-sm mb-1">Key Dates</div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-200 text-xs rounded">
                  {renderEnum(profile.status || event.info?.status || event.status || "Ongoing")}
                </span>
                <span className="text-xs">
                  <b>Start Date:</b> {formatDate(getDate()) || <span className="text-gray-400">N/A</span>}
                </span>
                <span className="text-xs">
                  <b>End Date:</b> {formatDate(getEndDate()) || <span className="text-gray-400">N/A</span>}
                </span>
                {getTime() && (
                  <span className="text-xs">
                    <b>Time:</b> {formatTime(getTime())}
                  </span>
                )}
              </div>
            </div>
            {/* Registration */}
            <div>
              <div className="font-semibold text-sm mb-1">Registration</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-xs">
                  {profile.max_attendees || event.info?.max_attendees || event.max_attendees ? `${profile.max_attendees || event.info?.max_attendees || event.max_attendees} Spots` : "Limited Spots"}
                </span>
                <span className="text-xs text-gray-500">
                  Make sure to register before spots run out.
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Registration Ends: {formatDate(profile.registration_end || event.info?.registration_end || event.registration_end)}
              </div>
            </div>
            {/* Setup */}
            <div>
              <div className="font-semibold text-sm mb-1">Setup</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-gray-100 text-xs rounded">
                  {profile.event_mode ? (typeof profile.event_mode === 'string' ? profile.event_mode : Object.keys(profile.event_mode)[0]) : event.info?.event_mode ? (typeof event.info.event_mode === 'string' ? event.info.event_mode : Object.keys(event.info.event_mode)[0]) : event.event_mode ? (typeof event.event_mode === 'string' ? event.event_mode : Object.keys(event.event_mode)[0]) : "Virtual"}
                </span>
                {(profile.virtual_link || event.info?.virtual_link || event.virtual_link) && (
                  <a
                    href={profile.virtual_link || event.info?.virtual_link || event.virtual_link}
                    className="ml-2 text-blue-600 underline break-all text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.virtual_link || event.info?.virtual_link || event.virtual_link}
                  </a>
                )}
              </div>
            </div>
            {/* Description */}
            <div>
              <div className="font-semibold text-sm mb-1">Description</div>
              <div className="text-xs text-gray-700 whitespace-pre-line">
                {profile.event_detail || profile.event_description || profile.description || event.info?.event_detail || event.info?.event_description || event.info?.description || event.event_detail || event.event_description || event.description}
              </div>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 my-2">
              {(profile.tags || event.info?.tags || event.tags) && (profile.tags || event.info?.tags || event.tags).map((tag, i) => (
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
                className={`flex-1 px-2 py-1 text-sm font-semibold border-b-2 transition ${tab === "Details"
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500"
                  }`}
                onClick={() => setTab("Details")}
              >
                Details
              </button>
              <button
                className={`flex-1 px-2 py-1 text-sm font-semibold border-b-2 transition ${tab === "Attachment"
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
                  {/* Dummy details or real details if present */}
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      How to Join
                    </div>
                    <ul className="list-disc ml-4 text-sm space-y-1">
                      <li>Register via the official event page or contact the organizer.</li>
                      <li>Check your email for confirmation and event details.</li>
                      <li>Attend the orientation session if required.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      What to Prepare
                    </div>
                    <ul className="list-disc ml-4 text-sm space-y-1">
                      <li>Laptop or desktop with a working mic and camera</li>
                      <li>Stable internet connection</li>
                      <li>Active Google account (for shared folders and submission)</li>
                      <li>Your preferred tools (e.g., Figma, VS Code, Canva, Github)</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      What Happens During the Event
                    </div>
                    <ul className="list-disc ml-4 text-sm space-y-1">
                      <li>Theme Reveal: Announced at the start of the event</li>
                      <li>Brainstorming and development with your team</li>
                      <li>Submission: Upload your final files before the deadline</li>
                      <li>Pitching: Submit a short pitch/demo video</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      Judging Criteria
                    </div>
                    <ul className="list-disc ml-4 text-sm space-y-1">
                      <li>Innovation and Creativity</li>
                      <li>Functionality and Execution</li>
                      <li>Relevance to the Theme</li>
                      <li>Quality of Technical Implementation</li>
                      <li>Quality of Presentation</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-xs text-gray-600">
                      Prizes
                    </div>
                    <ul className="list-disc ml-4 text-sm space-y-1">
                      <li>Top 3 Teams will win:</li>
                      <li>Digital certificates</li>
                      <li>Tech goodies</li>
                      <li>Featured on the official event site and social media pages</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <a
                    href="/Event_Guide.pdf"
                    className="text-blue-600 underline text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Event_Guide.pdf (2.1 MB)
                  </a>
                </div>
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

