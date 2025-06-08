import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import EventDetailDrawer from "./EventDetailDrawer";
import { backend } from "../utils/backend";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EventsGrid({ onCreateEventClick, refreshSignal }) {
  const [tab, setTab] = useState("all"); // "all" or "created"
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAllModal, setShowAllModal] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const navigate = useNavigate();
  const { identity } = useAuth ? useAuth() : { identity: null };

  // Fetch all events from backend
  async function fetchEvents() {
    setLoading(true);
    setError("");
    try {
      const events = await backend.getEvents();
      setAllEvents(events);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, [refreshSignal]);

  // Helpers to normalize event data
  function getProfile(event) {
    return event.info?.profile || event.profile || event;
  }
  function getEventName(event) {
    const profile = getProfile(event);
    return profile.event_name || event.event_name || event.title || "Untitled Event";
  }
  function getEventImage(event) {
    const profile = getProfile(event);
    return (
      profile.banner_image ||
      profile.image ||
      (profile.badge && profile.badge.image_url) ||
      event.banner_image ||
      event.image ||
      (event.badge && event.badge.image_url) ||
      ""
    );
  }
  function getEventDate(event) {
    const profile = getProfile(event);
    return profile.event_date || event.event_date || null;
  }
  function getEventLocation(event) {
    const profile = getProfile(event);
    return profile.event_location?.city || event.event_location?.city || "";
  }
  function getEventDescription(event) {
    const profile = getProfile(event);
    return profile.event_description || event.event_description || "";
  }
  function getEventTags(event) {
    const profile = getProfile(event);
    return profile.tags || event.tags || [];
  }

  // Filter created events by current user
  const createdEvents = identity
    ? allEvents.filter(e => {
      const profile = getProfile(e);
      return (
        profile.organizer === identity.getPrincipal().toText() ||
        e.info?.organizer === identity.getPrincipal().toText() ||
        e.organizer === identity.getPrincipal().toText()
      );
    })
    : [];

  // Sorting
  const [sortBy, setSortBy] = useState("date");
  function sortEvents(events) {
    if (sortBy === "date") {
      return [...events].sort((a, b) => Number(getEventDate(a)) - Number(getEventDate(b)));
    } else if (sortBy === "name") {
      return [...events].sort((a, b) => getEventName(a).localeCompare(getEventName(b)));
    }
    return events;
  }
  const eventsToShow = sortEvents(tab === "all" ? allEvents : createdEvents);

  return (
    <div className="bg-[#F4F8FB] w-full">
      <div className="w-full flex items-center justify-between mb-6 relative">
        <h2 className="text-2xl font-bold">Events</h2>
        {/* Tabs */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex bg-gray-200 rounded-full p-1">
          <button
            className={`px-5 py-1 rounded-full font-medium transition ${tab === "all"
              ? "bg-gray-400 text-white"
              : "bg-gray-200 text-gray-800"
              }`}
            onClick={() => setTab("all")}
          >
            All Events
          </button>
          <button
            className={`px-5 py-1 rounded-full font-medium transition ${tab === "created"
              ? "bg-gray-400 text-white"
              : "bg-gray-200 text-gray-800"
              }`}
            onClick={() => setTab("created")}
          >
            Created Events
          </button>
        </div>
        <select className="ml-2 px-3 py-1 rounded-full bg-gray-200 border-none text-sm focus:ring-0" value={sortBy} onChange={e => setSortBy(e.target.value)} title="Sort events">
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>
      {loading && <div className="text-center py-8">Loading events...</div>}
      {error && <div className="text-center text-red-600 py-4">{error}</div>}
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
          <div key={event.id || event.event_id || event.info?.id} onClick={() => setSelectedEvent(event)}>
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
