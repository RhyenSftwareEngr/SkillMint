import { ChevronLeft, ChevronRight } from "lucide-react";

function EventCarousel() {
  return (
    <section className="w-full bg-gray-100 px-3 py-3 rounded-xl flex flex-col shadow">
      {/* Carousel row */}
      <div className="flex items-center justify-between gap-3 mb-2">
        {/* Left gradient card with arrow */}
        <div className="w-24 h-32 rounded-xl flex items-center justify-center bg-gradient-to-r from-gray-300 via-white to-white relative">
          <button className="absolute left-1 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-1.5 shadow hover:bg-gray-300">
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {/* Main featured cards */}
        <div className="flex-1 flex justify-center gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-52 h-32 rounded-xl bg-white shadow" />
          ))}
        </div>
        {/* Right gradient card with arrow */}
        <div className="w-24 h-32 rounded-xl flex items-center justify-center bg-gradient-to-l from-gray-300 via-white to-white relative">
          <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-1.5 shadow hover:bg-gray-300">
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </section>
  );
}
export default EventCarousel;
