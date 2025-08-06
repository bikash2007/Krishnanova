import React, { useEffect, useState, useRef } from "react";
import {
  parseISO,
  differenceInSeconds,
  isSameDay,
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
} from "date-fns";
import confetti from "canvas-confetti";
import { useApi } from "../../Context/baseUrl";

const Festival = () => {
  const [events, setEvents] = useState([]);
  const [closestEvent, setClosestEvent] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [viewMonth, setViewMonth] = useState(new Date());
  const [modalEvent, setModalEvent] = useState(null);

  const baseUrl = useApi();

  // For glowing cursor effect
  const calendarRef = useRef(null);
  const [mousePos, setMousePos] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(`${baseUrl}/api/events`);
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, [baseUrl]);

  useEffect(() => {
    const futureEvents = events
      .map((e) => ({ ...e, dateObj: parseISO(e.date) }))
      .filter((e) => e.dateObj > new Date())
      .sort((a, b) => a.dateObj - b.dateObj);

    if (futureEvents.length) {
      setClosestEvent(futureEvents[0]);
      updateCountdown(futureEvents[0].dateObj);

      const interval = setInterval(() => {
        updateCountdown(futureEvents[0].dateObj);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [events]);

  const updateCountdown = (targetDate) => {
    const diff = differenceInSeconds(targetDate, new Date());
    if (diff <= 0) {
      setCountdown("🎉 Happening Now!");
      confetti();
      return;
    }
    const d = Math.floor(diff / (60 * 60 * 24));
    const h = Math.floor((diff / (60 * 60)) % 24);
    const m = Math.floor((diff / 60) % 60);
    const s = Math.floor(diff % 60);

    setCountdown(`${d}d ${h}h ${m}m ${s}s`);
  };

  const changeMonth = (direction) => {
    setViewMonth(addMonths(viewMonth, direction));
  };

  const renderCalendar = () => {
    const start = startOfWeek(startOfMonth(viewMonth), { weekStartsOn: 0 });
    const today = new Date();

    const weeks = [];
    let day = start;

    for (let w = 0; w < 6; w++) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const currentDate = day;
        const isCurrentMonth = currentDate.getMonth() === viewMonth.getMonth();
        const isToday = isSameDay(currentDate, today);
        const eventForDay = events.find((e) =>
          isSameDay(parseISO(e.date), currentDate)
        );
        const isClosest =
          closestEvent && isSameDay(currentDate, parseISO(closestEvent.date));

        days.push(
          <div
            key={currentDate}
            onClick={() => eventForDay && setModalEvent(eventForDay)}
            className={`flex items-center justify-center h-14 cursor-pointer text-sm font-medium rounded-md transition
              ${!isCurrentMonth ? "text-gray-400" : ""}
              ${isToday ? "bg-blue-500 text-white" : ""}
              ${
                eventForDay && !isToday
                  ? "bg-green-200 text-green-900 hover:bg-green-300"
                  : ""
              }
              ${isClosest && !isToday ? "bg-yellow-300 animate-pulse" : ""}
              ${
                !eventForDay && isCurrentMonth && !isToday
                  ? "hover:bg-gray-100"
                  : ""
              }
            `}
          >
            {currentDate.getDate()}
          </div>
        );
        day = addDays(day, 1);
      }

      weeks.push(
        <div key={w} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
    }

    return weeks;
  };

  // Cursor glow handlers
  const handleMouseMove = (e) => {
    if (!calendarRef.current) return;
    const rect = calendarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos(null);

  return (
    <section className="relative py-10 w-full overflow-hidden font-[Inter,-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* subtle pattern */}
      <div className="absolute inset-0 bg-[url('/dots.svg')] opacity-10 z-0"></div>

      {/* animated blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-ping z-0"></div>

      <div className="relative z-10 max-w-xl mx-auto overflow-hidden bg-white/50 backdrop-blur-2xl rounded-lg ">
        <div
          ref={calendarRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className=" p-4"
          style={{
            background: mousePos
              ? `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 248, 251, 0.25), transparent 80%)`
              : "transparent",
            transition: "background 0.2s ease",
          }}
        >
          <h2 className="text-4xl text-center mb-8 font-semibold text-gray-800">
Festival Calendar
          </h2>

          {closestEvent && (
            <div className="mb-6 text-center">
              <h3 className="text-2xl text-blue-600 font-bold mb-2 bg-white/40 backdrop-blur-3xl rounded-xl py-2 ">
Upcoming Event: {closestEvent.name}
              </h3>
              <p className="text-gray-500">
                {closestEvent.description} —{" "}
                {format(parseISO(closestEvent.date), "MMMM do")}
              </p>
              <div className="text-3xl mt-1 text-blue-600 font-bold ">
                {countdown}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => changeMonth(-1)}
              className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              ← Prev
            </button>
            <h4 className="text-lg font-medium text-gray-700">
              {format(viewMonth, "MMMM yyyy")}
            </h4>
            <button
              onClick={() => changeMonth(1)}
              className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Next →
            </button>
          </div>

          {/* Calendar grid with glow */}
          <div className="space-y-1 relative rounded-lg p-2">
            {renderCalendar()}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {events.map((e, i) => (
              <div
                key={i}
                onClick={() => setModalEvent(e)}
                className="bg-gray-100 p-3 rounded hover:bg-gray-200 cursor-pointer shadow-sm transition"
              >
                <h4 className="text-lg text-gray-800">{e.name}</h4>
                <p className="text-sm text-gray-500">
                  {e.description} — {format(parseISO(e.date), "MMMM do")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      {modalEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setModalEvent(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-700 p-6 rounded-xl max-w-md w-full shadow-lg animate-scale-up"
          >
            <h3 className="text-2xl text-blue-600">{modalEvent.name}</h3>
            <p className="mt-2">{modalEvent.description}</p>
            <p className="mt-1 text-gray-500">
              {format(parseISO(modalEvent.date), "MMMM do yyyy")}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setModalEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Festival;
