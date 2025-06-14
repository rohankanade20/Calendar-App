import React, { useState, useEffect } from "react";

function EventModal({ show, selectedDate, event, onClose, onAddEvent, onDeleteEvent }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setTime(event.time);
    } else {
      setTitle("");
      setTime("");
    }
  }, [event]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !time) return;

    onAddEvent({
      date: selectedDate,
      time,
      title,
    });

    setTitle("");
    setTime("");
    onClose();
  };

  const handleDelete = () => {
    if (event) {
      onDeleteEvent(event);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {event ? "Event Details" : "Add New Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="e.g. Meeting with client"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            {event && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                🗑️ Delete
              </button>
            )}
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {event ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
