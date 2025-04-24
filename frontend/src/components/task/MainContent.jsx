import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { YogaPoseCard } from "./YogaPoseCard";
import { WeeklyPlanSection } from "./WeeklyPlanSection";
import yogaPlans from "./yogaPlans";

export const MainContent = ({ darkMode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionTime, setSessionTime] = useState(0);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const dailyPose = yogaPlans.week1[dayName] || {};

  const [completedDates, setCompletedDates] = useState(new Set());

  useEffect(() => {
    let interval;
    if (sessionTime > 0) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionTime]);

  // Handling Yoga Complition
  const handleYogaCompletion = () => {
    const dateString = selectedDate.toISOString().split("T")[0];
    setCompletedDates((prev) => {
      const newDates = new Set(prev);
      const isCompleted = newDates.has(dateString);

      if (isCompleted) {
        newDates.delete(dateString);
        setAchievements((prev) => ({ ...prev, totalDays: prev.totalDays - 1 }));
      } else {
        newDates.add(dateString);
        setAchievements((prev) => ({
          ...prev,
          totalDays: prev.totalDays + 1,
          streak: prev.streak + 1,
        }));
      }
      return newDates;
    });
  };

  const startYogaSession = (duration) => {
    setSessionTime(duration * 60);
  };

  const isYogaCompleted = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return completedDates.has(dateString);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendar Section */}
      <div
        className={`p-6 rounded-2xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-green-50"
        }`}
      >
        <h2
          className={`text-2xl font-semibold mb-4 ${
            darkMode ? "text-green-400" : "text-green-700"
          }`}
        >
          Meditation Calendar
        </h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) =>
            `p-2 rounded-lg transition-colors ${
              isYogaCompleted(date)
                ? `${darkMode ? "bg-green-900" : "bg-green-200"}`
                : `${darkMode ? "hover:bg-gray-700" : "hover:bg-green-100"}`
            }`
          }
          className={darkMode ? "text-green-200" : "text-green-700"}
        />
      </div>

      {/* Daily Yoga Plan */}
      <div
        className={`p-6 rounded-2xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-green-50"
        }`}
      >
        {/* Session Timer */}
        {sessionTime > 0 && (
          <div className="mb-6 text-center">
            <div
              className={`text-2xl font-bold ${
                darkMode ? "text-green-400" : "text-green-700"
              }`}
            >
              {Math.floor(sessionTime / 60)}:
              {String(sessionTime % 60).padStart(2, "0")}
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Time Remaining
            </div>
          </div>
        )}

        {/* Yoga Pose Card */}
        <YogaPoseCard
          pose={yogaPlans.week1[dayName]}
          onComplete={handleYogaCompletion}
          isCompleted={isYogaCompleted(selectedDate)}
          darkMode={darkMode}
          startSession={startYogaSession}
        />

        <WeeklyPlanSection
          yogaPlans={yogaPlans.week1}
          selectedDate={selectedDate}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};
