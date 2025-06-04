export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col min-h-[210px] hover:shadow-xl transition">
      <div className="h-20 bg-gradient-to-br from-blue-100 to-blue-300 rounded mb-2 flex items-center justify-center">
        <img src={event.image} className="h-12 object-contain" alt="" />
      </div>
      <div className="flex gap-2 text-xs mb-1 flex-wrap">
        <span className="bg-blue-100 text-blue-700 rounded px-2 py-0.5">
          {event.type}
        </span>
        <span className="text-gray-400">{event.badge ? "Badge" : ""}</span>
      </div>
      <div className="font-semibold text-base truncate">{event.title}</div>
      <div className="text-xs text-gray-500">
        {event.startDate} – {event.endDate}
      </div>
    </div>
  );
}
