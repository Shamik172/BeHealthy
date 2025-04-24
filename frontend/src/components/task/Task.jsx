import { useState } from "react";
import { YogaPoseCard } from "./YogaPoseCard";
import { AchievementBadge } from "./AchievementBadge";
import yogaPlans from "./yogaPlans.js";
import "react-calendar/dist/Calendar.css";
import { WeeklyGoal } from "./WeeklyGoal.jsx";
import { WeeklyPlanSection } from "./WeeklyPlanSection.jsx";
import { MainContent } from "./MainContent.jsx";

const Task = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [completedDates, setCompletedDates] = useState(new Set());
  const [achievements, setAchievements] = useState({
    streak: 0,
    totalDays: 0,
    weeklyGoal: 5,
  });
  const [darkMode, setDarkMode] = useState(false);
  // const [showSettings, setShowSettings] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  // Dark Mode Toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  <WeeklyPlanSection
    yogaPlans={yogaPlans}
    selectedDate={selectedDate}
    darkMode={darkMode}
  />;

  // Notification Icon Component
  const NotificationIcon = ({ count }) => (
    <div className="relative">
      <svg
        className={`w-8 h-8 ${darkMode ? "text-white" : "text-green-600"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {count}
        </span>
      )}
    </div>
  );

  // Then use it like this:
  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const dailyPose = yogaPlans.week1[dayName] || {};
  // Yoga Session Starter
  const startYogaSession = (duration) => {
    setSessionTime(duration * 60);
  };

  const weeklyProgress =
    achievements.weeklyGoal > 0
      ? (achievements.totalDays / achievements.weeklyGoal) * 100
      : 0;
  // Existing functions
  const isYogaCompleted = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return completedDates.has(dateString);
  };

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
  // Update where you're using the YogaPoseCard in the main component

  <YogaPoseCard
    pose={
      yogaPlans.week1[
        selectedDate.toLocaleDateString("en-US", { weekday: "long" })
      ]
    }
    onComplete={handleYogaCompletion}
    isCompleted={isYogaCompleted(selectedDate)}
    darkMode={darkMode}
    startSession={startYogaSession}
  />;

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Header Section */}
      <header className="mb-8 text-center">
        {/* Dark mode Section  */}
        <div className="flex justify-between  items-center mb-4">
          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            Yoga Planner
          </h1>
          {/* <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              darkMode ? "bg-green-600" : "bg-green-100"
            } hover:bg-green-200 transition-colors`}
          >
            {darkMode ? "🌞" : "🌙"}
          </button> */}
        </div>

        {/* Progress and Notifications */}
        <div className="flex justify-center items-center space-x-6">
          <div className="flex items-center space-x-4">
            <AchievementBadge
              icon="🔥"
              value={achievements.streak}
              label="Day Streak"
              darkMode={darkMode}
            />
            <AchievementBadge
              icon="⏳"
              value={`${Math.floor(sessionTime / 60)}:${sessionTime % 60}`}
              label="Current Session"
              darkMode={darkMode}
            />
          </div>
          <NotificationIcon count={notifications.length} />
        </div>

        {/* Weekly Progress Bar */}
        <div className="mt-6 w-full bg-gray-100 rounded-full h-4">
          <div
            className="bg-green-400 h-4 rounded-full transition-all duration-500"
            style={{ width: `${weeklyProgress}%` }}
          />
        </div>
      </header>
      <MainContent darkMode={darkMode} />
      {/* New Features Section */}
      <WeeklyGoal darkMode={darkMode} achievements={achievements} />
      {/* Weekly Plan Section */}
      <WeeklyPlanSection
        yogaPlans={yogaPlans.week1}
        selectedDate={selectedDate}
        darkMode={darkMode}
      />
    </div>
  );
};
(<AchievementBadge />), (<YogaPoseCard />);

export default Task;
