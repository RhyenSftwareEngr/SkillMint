import { ChevronLeft, ChevronRight } from "lucide-react"; // Or use your icon library

function EventCarousel() {
  return (
    <section className="w-full bg-gray-100 px-6 py-8 rounded-xl flex flex-col">
      {/* Carousel row */}
      <div className="flex items-center justify-between gap-4 mb-8">
        {/* Left gradient card with arrow */}
        <div className="w-36 h-40 rounded-xl flex items-center justify-center bg-gradient-to-r from-gray-300 via-white to-white relative">
          <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow hover:bg-gray-300">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Main featured cards */}
        <div className="flex-1 flex justify-center gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-60 h-40 rounded-xl bg-white shadow" />
          ))}
        </div>

        {/* Right gradient card with arrow */}
        <div className="w-36 h-40 rounded-xl flex items-center justify-center bg-gradient-to-l from-gray-300 via-white to-white relative">
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow hover:bg-gray-300">
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Events section below */}
      {/* <div className="flex items-center justify-between mt-6"> */}
      {/* Section title */}
      {/* <h2 className="text-lg font-bold ml-2">Events</h2> */}

      {/* Centered tabs */}
      {/* <div className="flex-1 flex justify-center gap-2">
          <button className="px-6 py-1 rounded-full bg-gray-400 text-white font-medium shadow">
            All Events
          </button>
          <button className="px-6 py-1 rounded-full bg-gray-200 text-gray-800 font-medium">
            Created Events
          </button>
        </div> */}

      {/* Sort dropdown right-aligned */}
      {/* <div>
          <select className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm border-none outline-none">
            <option>Sort</option>
            <option>Latest</option>
            <option>Soonest</option>
          </select>
        </div>
      </div> */}
    </section>
  );
}

export default EventCarousel;
