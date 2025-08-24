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
import { motion, AnimatePresence } from "framer-motion";

const Festival = () => {
  const [events, setEvents] = useState([]);
  const [closestEvent, setClosestEvent] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [viewMonth, setViewMonth] = useState(new Date());
  const [modalEvent, setModalEvent] = useState(null);

  const baseUrl = useApi();

  // **Minimal Dark Blue Color Palette**
  const colors = {
    primary: "#1e40af", // Royal Blue
    secondary: "#2563eb", // Bright Blue
    accent: "#3b82f6", // Light Blue
    dark: "#1e3a8a", // Dark Blue
    neutral: "#64748b", // Slate Gray
    light: "#f8fafc", // Almost White
    white: "#ffffff",
    success: "#10b981", // Green accent
    warning: "#f59e0b", // Amber
    danger: "#ef4444", // Red
  };

  // **Enhanced cursor tracking with blue colors**
  const calendarRef = useRef(null);
  const [mousePos, setMousePos] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/events`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
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
      // Blue confetti colors
      confetti({
        colors: [
          colors.primary,
          colors.secondary,
          colors.accent,
          colors.success,
        ],
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
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

    // **Responsive Week day headers**
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekDaysMobile = ["S", "M", "T", "W", "T", "F", "S"];

    const weekHeader = (
      <div
        key="header"
        className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3"
      >
        {weekDays.map((dayName, index) => (
          <div
            key={dayName}
            className="flex items-center justify-center h-8 sm:h-10 text-xs font-semibold rounded-lg bg-gray-50 border"
            style={{
              color: colors.dark,
              borderColor: colors.light,
            }}
          >
            <span className="hidden sm:inline">{dayName}</span>
            <span className="sm:hidden">{weekDaysMobile[index]}</span>
          </div>
        ))}
      </div>
    );

    weeks.push(weekHeader);

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

        let dayStyle = {};
        let dayClasses =
          "flex items-center justify-center h-10 sm:h-12 md:h-14 cursor-pointer text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl transition-all duration-300 relative overflow-hidden border bg-white";

        if (!isCurrentMonth) {
          dayStyle = {
            color: colors.neutral,
            borderColor: "transparent",
            backgroundColor: "transparent",
          };
        } else if (isToday) {
          dayStyle = {
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.dark})`,
            color: "white",
            borderColor: colors.primary,
            boxShadow: `0 2px 8px ${colors.primary}40`,
          };
          dayClasses += " shadow-lg";
        } else if (eventForDay && !isToday) {
          dayStyle = {
            background: `linear-gradient(135deg, ${colors.secondary}20, ${colors.accent}15)`,
            color: colors.secondary,
            borderColor: `${colors.secondary}30`,
            boxShadow: `0 1px 4px ${colors.secondary}20`,
          };
          dayClasses += " hover:scale-105 hover:shadow-lg";
        } else if (isClosest && !isToday) {
          dayStyle = {
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
            color: "white",
            borderColor: colors.accent,
            boxShadow: `0 2px 8px ${colors.accent}40`,
          };
          dayClasses += " animate-pulse shadow-lg";
        } else if (isCurrentMonth) {
          dayStyle = {
            backgroundColor: colors.white,
            color: colors.dark,
            borderColor: colors.light,
          };
          dayClasses += " hover:scale-105 hover:shadow-md";
        }

        days.push(
          <motion.div
            key={currentDate.toString()}
            whileHover={{ scale: eventForDay || isCurrentMonth ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => eventForDay && setModalEvent(eventForDay)}
            className={dayClasses}
            style={dayStyle}
          >
            {/* Sacred dot for events - responsive sizing */}
            {eventForDay && (
              <div
                className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                style={{
                  backgroundColor: isToday ? "white" : colors.secondary,
                }}
              />
            )}
            <span className="text-xs sm:text-sm">{currentDate.getDate()}</span>

            {/* Hover glow effect */}
            {(eventForDay || isCurrentMonth) && (
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl"
                style={{
                  background: `radial-gradient(circle, ${
                    eventForDay ? colors.secondary : colors.primary
                  }20 0%, transparent 70%)`,
                }}
              />
            )}
          </motion.div>
        );
        day = addDays(day, 1);
      }

      weeks.push(
        <div key={w} className="grid grid-cols-7 gap-1 sm:gap-2">
          {days}
        </div>
      );
    }

    return weeks;
  };

  // **Enhanced cursor glow with blue colors**
  const handleMouseMove = (e) => {
    if (!calendarRef.current) return;
    const rect = calendarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos(null);

  return (
    <section className="relative py-8 sm:py-12 lg:py-16 w-full overflow-hidden min-h-screen bg-transparent">
      {/* **Minimal Background Elements - Responsive** */}
      <div className="absolute inset-0">
        {/* Subtle pattern - smaller on mobile */}
        <div
          className="absolute inset-0 opacity-3 sm:opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, ${colors.primary} 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, ${colors.secondary} 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px, 50px 50px",
          }}
        />

        {/* Animated subtle auras - responsive sizing */}
        <motion.div
          className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-48 h-48 sm:w-96 sm:h-96 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-3 sm:opacity-5"
          style={{ backgroundColor: colors.primary }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-10 sm:top-20 right-0 w-40 h-40 sm:w-96 sm:h-96 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-3 sm:opacity-5"
          style={{ backgroundColor: colors.secondary }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.02, 0.06, 0.02],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6">
        {/* **Responsive Container** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl border shadow-lg bg-white"
          style={{
            borderColor: colors.light,
            boxShadow: `0 10px 25px ${colors.primary}08, 0 4px 10px ${colors.primary}05`,
          }}
        >
          <div
            ref={calendarRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="p-4 sm:p-6 lg:p-8"
            style={{
              background: mousePos
                ? `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, 
                    ${colors.primary}08, 
                    ${colors.secondary}04 40%, 
                    ${colors.accent}02 70%, 
                    transparent 80%)`
                : "transparent",
              transition: "background 0.3s ease",
            }}
          >
            {/* **Responsive Header** */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-6 sm:mb-8 lg:mb-10"
            >
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mr-2 sm:mr-3 lg:mr-4"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.dark})`,
                    boxShadow: `0 2px 8px ${colors.primary}30`,
                  }}
                >
                  <span className="text-white text-sm sm:text-lg lg:text-xl">
                    ॥
                  </span>
                </motion.div>
                <motion.h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
                  style={{ color: colors.dark }}
                >
                  <span className="hidden sm:inline">
                    Sacred Festival Calendar
                  </span>
                  <span className="sm:hidden">Festival Calendar</span>
                </motion.h2>
              </div>

              <div
                className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 mx-auto rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent}, ${colors.secondary})`,
                }}
              />
            </motion.div>

            {/* **Responsive Next Event Countdown** */}
            <AnimatePresence>
              {closestEvent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-6 sm:mb-8 text-center"
                >
                  <div
                    className="rounded-xl sm:rounded-2xl p-4 sm:p-6 border bg-white shadow-sm"
                    style={{
                      borderColor: `${colors.secondary}30`,
                      boxShadow: `0 4px 15px ${colors.secondary}10`,
                    }}
                  >
                    <motion.h3
                      className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3"
                      style={{ color: colors.secondary }}
                    >
                      🎉{" "}
                      <span className="hidden sm:inline">
                        Next Sacred Event:
                      </span>{" "}
                      {closestEvent.name}
                    </motion.h3>
                    <p
                      className="mb-3 sm:mb-4 text-sm sm:text-base"
                      style={{ color: colors.neutral }}
                    >
                      {closestEvent.description} —{" "}
                      <span className="hidden sm:inline">
                        {format(parseISO(closestEvent.date), "MMMM do, yyyy")}
                      </span>
                      <span className="sm:hidden">
                        {format(parseISO(closestEvent.date), "MMM do")}
                      </span>
                    </p>
                    <motion.div
                      className="text-xl sm:text-2xl lg:text-3xl font-bold"
                      style={{ color: colors.primary }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {countdown}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* **Responsive Calendar Navigation** */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeMonth(-1)}
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium border transition-all duration-200 bg-white text-xs sm:text-sm"
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              >
                <span className="hidden sm:inline">← Previous</span>
                <span className="sm:hidden">←</span>
              </motion.button>

              <h4
                className="text-lg sm:text-xl font-bold"
                style={{ color: colors.dark }}
              >
                <span className="hidden sm:inline">
                  {format(viewMonth, "MMMM yyyy")}
                </span>
                <span className="sm:hidden">
                  {format(viewMonth, "MMM yyyy")}
                </span>
              </h4>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeMonth(1)}
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium border transition-all duration-200 bg-white text-xs sm:text-sm"
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              >
                <span className="hidden sm:inline">Next →</span>
                <span className="sm:hidden">→</span>
              </motion.button>
            </div>

            {/* **Responsive Calendar Grid** */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-1 sm:space-y-2 relative rounded-xl sm:rounded-2xl p-2 sm:p-4 bg-gray-50 border"
              style={{
                borderColor: colors.light,
              }}
            >
              {renderCalendar()}
            </motion.div>

            {/* **Responsive Events List** */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 sm:mt-8 space-y-2 sm:space-y-3"
            >
              <h3
                className="text-base sm:text-lg font-bold mb-3 sm:mb-4"
                style={{ color: colors.dark }}
              >
                <span className="hidden sm:inline">Upcoming Sacred Events</span>
                <span className="sm:hidden">Upcoming Events</span>
              </h3>

              {events.length === 0 ? (
                <div
                  className="text-center py-6 sm:py-8 rounded-xl border bg-white"
                  style={{
                    borderColor: colors.light,
                    color: colors.neutral,
                  }}
                >
                  <div className="text-2xl sm:text-4xl mb-2">🕉️</div>
                  <p className="text-sm sm:text-base px-4">
                    <span className="hidden sm:inline">
                      No events scheduled yet. Stay tuned for divine
                      celebrations!
                    </span>
                    <span className="sm:hidden">No events scheduled yet.</span>
                  </p>
                </div>
              ) : (
                events.map((e, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => setModalEvent(e)}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer border transition-all duration-300 bg-white shadow-sm"
                    style={{
                      borderColor: colors.light,
                      boxShadow: `0 1px 4px ${colors.primary}08`,
                    }}
                  >
                    <h4
                      className="text-sm sm:text-base lg:text-lg font-semibold"
                      style={{ color: colors.dark }}
                    >
                      {e.name}
                    </h4>
                    <p
                      className="text-xs sm:text-sm mt-1"
                      style={{ color: colors.neutral }}
                    >
                      {e.description} —{" "}
                      <span className="hidden sm:inline">
                        {format(parseISO(e.date), "MMMM do, yyyy")}
                      </span>
                      <span className="sm:hidden">
                        {format(parseISO(e.date), "MMM do")}
                      </span>
                    </p>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* **Responsive Modal** */}
      <AnimatePresence>
        {modalEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setModalEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm sm:max-w-md w-full rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden bg-white"
              style={{
                borderColor: colors.light,
              }}
            >
              <div
                className="p-4 sm:p-6 border-b bg-gray-50"
                style={{
                  borderColor: colors.light,
                }}
              >
                <h3
                  className="text-lg sm:text-xl lg:text-2xl font-bold"
                  style={{ color: colors.primary }}
                >
                  {modalEvent.name}
                </h3>
                <p
                  className="mt-2 text-sm sm:text-base"
                  style={{ color: colors.neutral }}
                >
                  {modalEvent.description}
                </p>
                <p
                  className="mt-2 text-xs sm:text-sm font-medium"
                  style={{ color: colors.secondary }}
                >
                  📅{" "}
                  <span className="hidden sm:inline">
                    {format(parseISO(modalEvent.date), "EEEE, MMMM do, yyyy")}
                  </span>
                  <span className="sm:hidden">
                    {format(parseISO(modalEvent.date), "MMM do, yyyy")}
                  </span>
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-lg sm:rounded-xl font-semibold text-white shadow-sm transition-all duration-200 text-sm sm:text-base"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.dark})`,
                  }}
                  onClick={() => setModalEvent(null)}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Festival;
