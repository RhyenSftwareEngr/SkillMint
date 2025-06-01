import React from "react";

export default function Carousel() {
  return (
    <div className="w-full mb-8 relative">
      <div className="flex items-center gap-3">
        <button className="w-8 h-44 rounded-full bg-gradient-to-r from-white via-gray-100 to-transparent shadow absolute left-0 top-0 z-10 flex items-center justify-center text-2xl">
          {"<"}
        </button>
        <div className="flex-1 flex justify-center gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="w-[310px] h-44 rounded-2xl bg-white shadow"
            ></div>
          ))}
        </div>
        <button className="w-8 h-44 rounded-full bg-gradient-to-l from-white via-gray-100 to-transparent shadow absolute right-0 top-0 z-10 flex items-center justify-center text-2xl">
          {">"}
        </button>
      </div>
    </div>
  );
}
