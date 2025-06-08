import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function EventDetailDrawer({ open, onClose, event, source }) {
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const navigate = useNavigate();

  // Reset register modal state when closing
  React.useEffect(() => {
    if (!open) {
      setShowRegisterModal(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (event) {
      // Debug output for event object
      console.log('EventDetailDrawer event:', event);
    }
  }, [event]);

  if (!open || !event) {
    return <div style={{ display: "none" }} />;
  }

  // Now it's safe to access event
  const profile = event.info?.profile || event;
  console.log('EventDetailDrawer profile:', profile);

  const handleShowMore = () => {
    if (source === "created") {
      navigate(`/created-event/${event.id}`);
    } else {
      navigate(`/event/${event.id}`);
    }
  };

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
  const badge = event.badge;
  const hasBadge = badge && badge.name;

  // Helper to get the best image
  const getEventImage = () => {
    return (
      event.banner_image ||
      event.image ||
      (event.badge && event.badge.image_url) ||
      event.info?.profile?.banner_image ||
      event.info?.profile?.image ||
      (event.info?.profile?.badge && event.info.profile.badge.image_url) ||
      ''
    );
  };
  // Helper to get the best date/time
  const getDate = () => profile.event_date || profile.start_date || profile.startDate || profile.date || event.event_date || event.start_date || event.startDate || event.date || null;
  const getEndDate = () => {
    const end = profile.event_end_date || profile.end_date || profile.endDate || event.event_end_date || event.end_date || event.endDate || null;
    return end || getDate();
  };
  const getTime = () => event.event_time || event.time || null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 ${open && event ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-0 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative rounded-t-xl overflow-hidden">
          {getEventImage() ? (
            <img
              src={getEventImage()}
              alt="Event banner"
              className="w-full h-48 object-cover rounded-t-xl"
              onError={e => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400 rounded-t-xl">No image available</div>
          )}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl bg-white bg-opacity-80 rounded-full px-2"
          >
            &times;
          </button>
        </div>
        {/* Content */}
        <div className="px-8 py-6 flex-1 flex flex-col gap-3">
          <div>
            <h2 className="font-bold text-2xl mb-1">{event.event_name || event.title}</h2>
            <div className="flex items-center text-xs text-gray-500 gap-1 mb-2">
              <span>Organized by</span>
              <span className="underline hover:text-blue-600 font-medium">
                {event.organizer || event.org || "SkillMint"}
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
          </div>
          {/* Key Dates/Status */}
          <div>
            <div className="font-semibold text-sm mb-1">Key Dates</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-gray-200 text-xs rounded mr-2">
                {event.status || "Ongoing"}
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
                {event.max_attendees ? `${event.max_attendees} Spots` : "Limited Spots"}
              </span>
              <span className="text-xs text-gray-500">
                Make sure to register before spots run out.
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Registration Ends: {formatDate(event.registration_end)}
            </div>
          </div>
          {/* Setup / Virtual link */}
          <div>
            <div className="font-semibold text-sm mb-1">Setup</div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-gray-100 text-xs rounded">
                {event.event_mode ? (typeof event.event_mode === 'string' ? event.event_mode : Object.keys(event.event_mode)[0]) : "Virtual"}
              </span>
              {event.virtual_link && (
                <a
                  href={event.virtual_link}
                  className="ml-2 text-blue-600 underline break-all text-xs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.virtual_link}
                </a>
              )}
            </div>
            <hr className="my-2 border-gray-200" />
          </div>
          {/* Description */}
          <div>
            <div className="font-semibold text-sm mb-1">Description</div>
            <div className="text-xs text-gray-700 whitespace-pre-line">
              {event.event_detail || event.event_description || event.description}
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 my-2">
            {event.tags && event.tags.map((tag, i) => (
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
            <button
              className="w-full py-2 rounded-full bg-gray-200 hover:bg-gray-300 font-medium text-xs sm:text-sm transition"
              onClick={handleShowMore}
            >
              Show more details
            </button>
            <button className="w-full py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow transition"
              onClick={() => setShowRegisterModal(true)}
            >
              Register Now
            </button>
          </div>
        </div>
        {/* Register Success Modal */}
        <Modal open={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="text-green-500 text-5xl mb-2">✔️</div>
            <div className="font-bold text-lg mb-2 text-center">You have been registered for this event!</div>
            <div className="text-gray-600 text-sm mb-4 text-center">Check your email for confirmation and event details.</div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold" onClick={() => setShowRegisterModal(false)}>Close</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

