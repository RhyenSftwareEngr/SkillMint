import React from "react";

function getUnsplashUrl(url) {
  if (!url) return null;
  // Only append params if not already present
  return url.includes("?") ? url : url + "?w=800&auto=format";
}

export default function EventCard({ event }) {
  // Debug log to check event data
  console.log("EventCard event:", event);
  // Map canister event structure to frontend fields
  const profile = event.info?.profile || {};
  const eventName = profile.event_name || "Untitled Event";
  const eventDescription = profile.event_description || "";
  const eventStart = profile.event_date ? new Date(Number(profile.event_date) / 1_000_000).toLocaleDateString() : "";
  const eventEnd = profile.event_end_date ? new Date(Number(profile.event_end_date) / 1_000_000).toLocaleDateString() : "";
  const organizer = event.info?.event_organizers && event.info.event_organizers.length > 0 ? event.info.event_organizers[0] : "";
  const bannerImage = getUnsplashUrl(profile.banner_image);

  return (
    <div className="bg-white rounded-xl shadow-lg p-0 flex flex-col min-h-[260px] hover:shadow-xl transition overflow-hidden border border-gray-100">
      {bannerImage && (
        <img
          src={bannerImage}
          alt={eventName || "Event banner"}
          className="w-full h-40 object-cover rounded-t-xl mb-2"
          onError={e => { e.target.style.display = 'none'; }}
        />
      )}
      <div className="flex-1 flex flex-col p-4">
        {/* Event Type Tag */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: event.color, color: '#fff' }}>
            {event.type}
          </span>
          {event.badge && <span className="text-yellow-500 text-xs ml-1" title="Badge">🏅</span>}
          {event.certificate && <span className="text-blue-500 text-xs ml-1" title="Certificate">📜</span>}
        </div>
        {/* Title and Organizer */}
        <div className="font-bold text-base mb-0.5 truncate" title={eventName}>{eventName}</div>
        <div className="text-xs text-gray-500 mb-1 truncate">
          {eventStart} {eventEnd && `- ${eventEnd}`}
        </div>
        {/* Description */}
        <div className="text-xs text-gray-700 mb-2 line-clamp-2">{eventDescription}</div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {event.tags && event.tags.map((tag, i) => (
            <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{tag}</span>
          ))}
        </div>
        {/* Organizer */}
        <div className="text-xs text-gray-400 mt-auto">{organizer ? `by ${organizer}` : null}</div>
      </div>
    </div>
  );
}
