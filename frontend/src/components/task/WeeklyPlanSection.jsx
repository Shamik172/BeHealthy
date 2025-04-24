// WeeklyPlanSection.js
import React from "react";
const WeeklyPlanDay = ({ day, pose, duration, isCurrentDay, darkMode }) => (
  <div
    className={`p-4 text-center border-2 rounded-xl transition-all ${
      isCurrentDay
        ? `${
            darkMode
              ? "border-green-500 bg-green-900"
              : "border-green-400 bg-green-100"
          }`
        : `${
            darkMode
              ? "border-gray-700 hover:border-green-500"
              : "border-green-100 hover:border-green-300"
          }`
    }`}
  >
    <h4
      className={`font-semibold ${
        darkMode ? "text-green-400" : "text-green-700"
      } mb-2`}
    >
      {day}
    </h4>
    <p
      className={`text-sm ${
        darkMode ? "text-green-300" : "text-green-600"
      } font-medium mb-1`}
    >
      {pose}
    </p>
    <p className={`text-xs ${darkMode ? "text-green-400" : "text-green-500"}`}>
      {duration}
    </p>
  </div>
);
export const WeeklyPlanSection = ({ yogaPlans, selectedDate, darkMode }) => {
  const days = Object.entries(yogaPlans).map(([dayName, details]) => ({
    day: dayName,
    ...details,
  }));

  return (
    <div
      className={`mt-8 p-6 rounded-2xl shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-green-50"
      }`}
    >
      <h2
        className={`text-2xl font-semibold mb-6 ${
          darkMode ? "text-green-400" : "text-green-700"
        }`}
      >
        Weekly Practice Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {days.map((dayPlan) => (
          <WeeklyPlanDay
            key={dayPlan.day}
            day={dayPlan.day}
            pose={dayPlan.pose}
            duration={dayPlan.duration}
            isCurrentDay={
              dayPlan.day ===
              selectedDate.toLocaleDateString("en-US", { weekday: "long" })
            }
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};
