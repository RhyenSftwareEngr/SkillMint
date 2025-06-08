import React, { useState, useMemo } from "react";

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getEventMap(events) {
    // Map date string (YYYY-MM-DD) to array of events
    const map = {};
    events.forEach(event => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const key = d.toISOString().slice(0, 10);
            if (!map[key]) map[key] = [];
            map[key].push(event);
        }
    });
    return map;
}

export default function Calendar({ events = [] }) {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipEvents, setTooltipEvents] = useState([]);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);
    const firstDay = useMemo(() => new Date(year, month, 1).getDay(), [year, month]);
    const eventMap = useMemo(() => getEventMap(events), [events]);

    function prevMonth() {
        if (month === 0) {
            setMonth(11);
            setYear(y => y - 1);
        } else {
            setMonth(m => m - 1);
        }
    }
    function nextMonth() {
        if (month === 11) {
            setMonth(0);
            setYear(y => y + 1);
        } else {
            setMonth(m => m + 1);
        }
    }

    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    function handleDayClick(e, dateStr, dayEvents) {
        setSelectedDay(dateStr);
        setTooltipEvents(dayEvents);
        setShowTooltip(true);
        // Position tooltip near the clicked day
        const rect = e.target.getBoundingClientRect();
        setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
    }

    function closeTooltip() {
        setShowTooltip(false);
        setSelectedDay(null);
        setTooltipEvents([]);
    }

    return (
        <div className="bg-white rounded shadow p-4 mb-6 max-w-xl mx-auto transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
                <button onClick={prevMonth} className="hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition"><span>&lt;</span></button>
                <div className="font-bold text-lg">{monthNames[month]} {year}</div>
                <button onClick={nextMonth} className="hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition"><span>&gt;</span></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {Array(firstDay).fill(null).map((_, i) => <div key={"empty-" + i}></div>)}
                {Array(daysInMonth).fill(null).map((_, i) => {
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
                    const dayEvents = eventMap[dateStr] || [];
                    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === i + 1;
                    const hasEvent = dayEvents.length > 0;
                    return (
                        <div
                            key={i}
                            className={`relative h-10 w-10 flex flex-col items-center justify-center rounded-lg cursor-pointer transition border border-transparent
                                ${isToday ? 'bg-blue-100 border-blue-400 font-bold' : 'hover:bg-gray-100'}
                                ${selectedDay === dateStr ? 'ring-2 ring-blue-400' : ''}
                                ${hasEvent ? 'bg-yellow-100 border-yellow-400' : ''}`}
                            onClick={hasEvent ? (e) => handleDayClick(e, dateStr, dayEvents) : undefined}
                            tabIndex={0}
                            title={hasEvent ? `${dayEvents.length} event(s)` : ''}
                        >
                            <span className="text-sm font-medium">{i + 1}</span>
                            <div className="flex flex-wrap gap-0.5 absolute bottom-1 left-1/2 -translate-x-1/2">
                                {dayEvents.map((ev, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-block w-2 h-2 rounded-full border border-white shadow"
                                        style={{ background: ev.color || '#4F46E5' }}
                                        title={ev.title || ev.event_name}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Tooltip for day events */}
            {showTooltip && tooltipEvents.length > 0 && (
                <div
                    className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm"
                    style={{ left: tooltipPos.x, top: tooltipPos.y + 30, minWidth: 220 }}
                    onMouseLeave={closeTooltip}
                >
                    <div className="font-semibold mb-1">Events on {selectedDay}</div>
                    <ul>
                        {tooltipEvents.map((ev, idx) => (
                            <li key={idx} className="mb-1">
                                <span className="font-bold text-blue-700">{ev.title || ev.event_name}</span><br />
                                <span className="text-gray-600">{ev.description || ev.event_description}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-2 text-xs text-blue-500 hover:underline" onClick={closeTooltip}>Close</button>
                </div>
            )}
        </div>
    );
} 