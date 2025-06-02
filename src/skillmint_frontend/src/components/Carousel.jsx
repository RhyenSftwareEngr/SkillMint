import React from "react";

// Dummy data (for demo)
const cards = Array.from({ length: 11 });

export default function Carousel() {
  // Set your card widths (in px) for each breakpoint.
  // Example: 120px on mobile, 180px on sm, 240px on md+
  // For best results, make these numbers divisible by 2 for "peeking".

  return (
    <div
      className="
      w-full flex justify-center mb-8
      "
    >
      <div
        className="
          relative overflow-x-hidden
          max-w-[420px]   // 3.5 * 120px
          sm:max-w-[630px] // 3.5 * 180px
          md:max-w-[840px] // 3.5 * 240px
          "
      >
        <div className="relative">
          {/* Left arrow */}
          <button className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-44 items-center justify-center rounded-full bg-gradient-to-r from-white via-gray-100 to-transparent shadow text-2xl">
            {"<"}
          </button>

          {/* Cards */}
          <div className="flex gap-4">
            {cards.map((_, i) => (
              <div
                key={i}
                className="
                  flex-shrink-0 h-44 bg-white rounded-2xl shadow
                  w-[120px] sm:w-[180px] md:w-[240px]
                "
              ></div>
            ))}
          </div>

          {/* Right arrow */}
          <button className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-44 items-center justify-center rounded-full bg-gradient-to-l from-white via-gray-100 to-transparent shadow text-2xl">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
