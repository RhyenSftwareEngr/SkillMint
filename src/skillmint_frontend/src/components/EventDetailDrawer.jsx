import React from "react";
import { useNavigate } from "react-router-dom";

export default function EventDetailDrawer({ open, onClose, event, source }) {
  const navigate = useNavigate();
  if (!open || !event) return null;

  const handleShowMore = () => {
    if (source === "created") {
      navigate(`/created-event/${event.id}`);
    } else {
      navigate(`/event/${event.id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end bg-black bg-opacity-30">
      <div className="bg-white rounded-l-xl shadow-2xl w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[calc(100vh-32px)] mt-4 mb-4 mr-0 overflow-y-auto animate-fadeIn flex flex-col">
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
          <div>
            <h2 className="font-bold text-lg sm:text-xl mb-1">{event.title}</h2>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <span>Organized by</span>
              <span className="underline hover:text-blue-600 font-medium">
                {event.organizer}
              </span>
            </div>
          </div>
          {/* Key Dates/Status */}
          <div>
            <div className="font-semibold text-sm mb-1">Key Dates</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-gray-200 text-xs rounded mr-2">
                {event.type}
              </span>
              <span className="text-xs">
                <b>Start Date:</b> {event.startDate}
              </span>
              <span className="text-xs">
                <b>End Date:</b> {event.endDate} &nbsp; | &nbsp;
                <b>Time:</b> {event.time}
              </span>
            </div>
          </div>
          {/* Registration */}
          <div>
            <div className="font-semibold text-sm mb-1">Registration</div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-xs">
                {event.remaining} Spots Remaining
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
                {event.type}
              </span>
              {event.type === "Virtual" && (
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
            <button
              className="w-full py-2 rounded-full bg-gray-200 hover:bg-gray-300 font-medium text-xs sm:text-sm transition"
              onClick={handleShowMore}
            >
              Show more details
            </button>
            <button className="w-full py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow transition">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
