import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

const updates = [
  "New yoga session added this Sunday!",
  "Try the Warrior Pose challenge this week.",
  "Your streak is going strong! Keep it up!",
  "Join our live meditation session tomorrow!",
  "Yoga retreat registrations are open!",
  "10-minute yoga challenge starts today!",
];

function YogaSidebar() {
  const [streak, setStreak] = useState([2, 5, 7, 10, 12, 14, 18, 21, 25, 28]);
  const [currentMonth, setCurrentMonth] = useState([]);
  const today = new Date();

  useEffect(() => {
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    const daysArray = eachDayOfInterval({ start, end });
    setCurrentMonth(daysArray);
  }, []);

  return (
    <div className="bg-white px-4 sm:px-6 py-6 sm:py-8 rounded-lg shadow-lg">
      {/* Use responsive flex direction: col -> row (md) -> col (lg) */}
      <div className="flex flex-col md:flex-row lg:flex-col gap-6">
        {/* Notifications Section */}
        <div className="w-full md:w-1/2 lg:w-full">
          <h3 className="text-lg sm:text-xl font-bold text-green-700">Yoga Updates</h3>
          <div className="mt-3 sm:mt-4 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2 space-y-2 text-xs sm:text-sm">
            {updates.map((update, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded-md">{update}</div>
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="w-full md:w-1/2 lg:w-full">
          <h3 className="text-lg sm:text-xl font-bold text-green-700 mt-6 md:mt-0 lg:mt-6">Your Yoga Streak</h3>
          <div className="grid grid-cols-7 gap-0.5 mt-4 text-[10px] sm:text-xs text-gray-800">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={index} className="text-center font-bold">{day}</div>
            ))}
            {Array(getDay(startOfMonth(today)))
              .fill(null)
              .map((_, index) => (
                <div key={`empty-${index}`} className="w-6 h-6 sm:w-7 sm:h-7"></div>
              ))}
            {currentMonth.map((date) => {
              const dayNumber = format(date, "d");
              const isStreak = streak.includes(parseInt(dayNumber));
              return (
                <div
                  key={dayNumber}
                  className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md ${
                    isStreak ? "bg-green-500 text-white font-bold" : "bg-gray-200"
                  }`}
                >
                  {dayNumber}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YogaSidebar;
