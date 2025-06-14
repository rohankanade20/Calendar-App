import React, { useState } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import EventModal from "./components/EventModal";
import events from "./data/events.json";
import "./index.css";

function App() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [eventsList, setEventsList] = useState(events);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState("month");

  const handlePrev = () =>
    setCurrentDate(currentDate.subtract(1, viewMode === "month" ? "month" : "week"));
  const handleNext = () =>
    setCurrentDate(currentDate.add(1, viewMode === "month" ? "month" : "week"));

  const handleAddEvent = (newEvent) => {
    setEventsList((prev) => [...prev, newEvent]);
  };

  const handleDeleteEvent = (targetEvent) => {
    setEventsList((prev) =>
      prev.filter((event) => JSON.stringify(event) !== JSON.stringify(targetEvent))
    );
    setSelectedEvent(null);
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] transition-colors p-6 sm:p-10">
        <div className="max-w-5xl mx-auto shadow-2xl rounded-3xl bg-white text-gray-900 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-10">
              <CalendarHeader
                currentDate={currentDate}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition"
              >
                {viewMode === "week" ? "Switch to Monthly View" : "Switch to Weekly View"}
              </button>
            </div>
          </div>
          <CalendarGrid
            currentDate={currentDate}
            events={eventsList}
            onDayClick={(date) => {
              setSelectedDate(date);
              setShowModal(true);
            }}
            onEventClick={(event) => setSelectedEvent(event)}
            viewMode={viewMode}
          />
        </div>
      </div>

      <EventModal
        show={showModal || !!selectedEvent}
        selectedDate={selectedDate}
        event={selectedEvent}
        onClose={() => {
          setShowModal(false);
          setSelectedEvent(null);
        }}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
}

export default App;