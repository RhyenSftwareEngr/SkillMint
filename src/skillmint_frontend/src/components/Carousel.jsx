import React from "react";

// Dummy data (for demo)
const cards = Array.from({ length: 11 });

export default function Carousel() {
  return (
    <div className="w-full flex justify-center mb-8">
      <div className="relative overflow-x-hidden max-w-[420px] sm:max-w-[630px] md:max-w-[840px]">
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
                  flex-shrink-0 h-44 rounded-xl shadow-lg
                  w-[120px] sm:w-[180px] md:w-[240px]
                  bg-gradient-to-br from-blue-200 to-blue-400
                  flex items-center justify-center
                "
              >
                <span className="text-white text-lg font-semibold tracking-wide">
                  Event {i + 1}
                </span>
              </div>
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
