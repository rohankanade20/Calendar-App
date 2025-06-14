import React from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarGrid({ currentDate, events, onDayClick, onEventClick, viewMode }) {
  const start = viewMode === "month"
    ? currentDate.startOf("month").startOf("week")
    : currentDate.startOf("week");
  const length = viewMode === "month" ? 42 : 7;
  const days = Array.from({ length }, (_, i) => start.add(i, "day"));

  const getEventsForDate = (date) =>
    events.filter((event) => event.date === date.format("YYYY-MM-DD"));

  return (
    <div>
      <div className="grid grid-cols-7 text-center font-semibold mb-3">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className={`py-2 uppercase tracking-wide text-sm sm:text-base ${
              index === 0 || index === 6 ? "text-red-500" : "text-gray-700"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const dayOfWeek = day.day();
          return (
            <DayCell
              key={index}
              day={day}
              isCurrentMonth={day.month() === currentDate.month()}
              isToday={day.isToday()}
              isWeekend={dayOfWeek === 0 || dayOfWeek === 6}
              events={dayEvents}
              onDayClick={onDayClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
}

function DayCell({ day, isCurrentMonth, isToday, isWeekend, events, onDayClick, onEventClick }) {
  return (
    <div
      className={`p-2 sm:p-3 h-28 sm:h-32 border rounded-xl relative transition-all duration-150 shadow-sm hover:shadow-md ${
        isToday
          ? "border-indigo-500 border-2 shadow-lg"
          : isWeekend
          ? "bg-gradient-to-br from-red-50 to-red-100 text-red-700"
          : isCurrentMonth
          ? "bg-white"
          : "bg-gray-50 text-gray-400"
      }`}
      aria-label={`Day ${day.format("D")}`}
    >
      <div className="text-sm font-bold flex justify-between items-center mb-1">
        <span>{day.date()}</span>
        <button
          onClick={() => onDayClick(day.format("YYYY-MM-DD"))}
          className="text-xs text-indigo-500 hover:underline"
          title="Add event"
        >
          ➕
        </button>
      </div>

      {events.map((event, i) => (
        <div
          key={i}
          className="mt-1 text-xs p-1 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-md text-gray-800 truncate cursor-pointer hover:bg-yellow-300"
          title={`${event.time} - ${event.title}`}
          onClick={() => onEventClick(event)}
        >
          🕒 {event.time} – {event.title}
        </div>
      ))}

      {events.length > 1 && (
        <div className="absolute bottom-1 right-1 text-xs text-red-500">
          ⚠️ Conflict
        </div>
      )}
    </div>
  );
}

export default CalendarGrid;