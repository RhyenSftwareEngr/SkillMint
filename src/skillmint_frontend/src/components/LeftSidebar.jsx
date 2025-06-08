import React, { useEffect, useState } from "react";
import { backend } from "../utils/backend";
import Modal from "./Modal";

export default function LeftSidebar() {
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await backend.getUpcomingEvents();
        setEvents(res);
      } catch (e) {
        console.error("Failed to fetch events:", e);
        setEvents([]);
      }
    }
    fetchEvents();
  }, []);

  const previewEvents = events.slice(0, 4);

  return (
    <aside className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="mb-4">
        <div className="font-bold text-lg mb-2">My Upcoming Events</div>
        {previewEvents.map(ev => (
          <div key={ev.id} className="flex flex-col gap-1 mb-4 p-3 rounded-lg border hover:shadow transition">
            <div className="font-semibold text-base truncate">{ev.info.profile.event_name}</div>
            <div className="text-xs text-gray-500">
              {new Date(Number(ev.info.profile.event_date) / 1_000_000).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-700 truncate">{ev.info.profile.event_description}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
