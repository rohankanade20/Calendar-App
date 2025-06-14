import React from "react";
import dayjs from "dayjs";

function CalendarHeader({ currentDate, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-10">
      <button
        onClick={onPrev}
        className="text-xl px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        ⬅️
      </button>
      <h1 className="text-2xl font-semibold text-gray-700">
        {currentDate.format("MMMM YYYY")}
      </h1>
      <button
        onClick={onNext}
        className="text-xl px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        ➡️
      </button>
    </div>
  );
}

export default CalendarHeader;
