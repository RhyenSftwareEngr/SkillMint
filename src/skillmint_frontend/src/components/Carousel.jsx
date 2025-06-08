import React from "react";

// Dummy data (for demo)
const cards = Array.from({ length: 11 });

export default function Carousel({ featuredEvents }) {
  if (!featuredEvents || featuredEvents.length === 0) {
    return <div className="w-full flex justify-center items-center h-40 bg-gray-100 rounded-xl">No featured events</div>;
  }
  const event = featuredEvents[0];
  const profile = event.info?.profile || {};
  const bannerImage = profile.banner_image ? profile.banner_image + "?w=1200&auto=format" : null;
  return (
    <div className="w-full flex justify-center items-center">
      {bannerImage ? (
        <img
          src={bannerImage}
          alt={profile.event_name || "Featured Event"}
          className="w-full max-h-64 object-cover rounded-xl shadow"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">No image</div>
      )}
    </div>
  );
}
