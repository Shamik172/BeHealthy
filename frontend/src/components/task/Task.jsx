import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { yogaPlans } from "./yogaPlans.jsx";
import { MainContent } from "./MainContent.jsx";
import { WeeklyPlanSection } from "./WeeklyPlanSection.jsx";
import { AchievementBadge } from "./AchievementBadge.jsx";
import { YogaPoseCard } from "./YogaPoseCard.jsx";
// import { Button } from "./Button.jsx";
import { WeeklyGoal } from "./WeeklyGoal.jsx";
import { AchievementSpotlight } from "./AchievementSpotlight.jsx";
import { NotificationIcon } from "./NotificationIcon.jsx";
const Task = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [completedDates, setCompletedDates] = useState(new Set());
  const [achievements, setAchievements] = useState({
    streak: 0,
    totalDays: 0,
    weeklyGoal: 7,
  });
  const [notificationVisible, setNotificationVisible] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const startYogaSession = (duration) => {
    setSessionTime(duration * 60);
  };

  useEffect(() => {
    let interval;
    if (sessionTime > 0) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionTime]);

  const isYogaCompleted = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return completedDates.has(dateString);
  };

  const handleYogaCompletion = () => {
    const dateString = selectedDate.toISOString().split("T")[0];
    setCompletedDates((prev) => {
      const newDates = new Set(prev);
      const isCompleted = newDates.has(dateString);

      if (!isCompleted) {
        const yesterday = new Date(selectedDate);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];

        setAchievements((prev) => ({
          ...prev,
          totalDays: prev.totalDays + 1,
          streak: completedDates.has(yesterdayString) ? prev.streak + 1 : 1,
        }));
      } else {
        setAchievements((prev) => ({
          ...prev,
          totalDays: prev.totalDays - 1,
          streak: Math.max(0, prev.streak - 1),
        }));
      }

      isCompleted ? newDates.delete(dateString) : newDates.add(dateString);
      return newDates;
    });
  };

  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const dailyPose = yogaPlans.week1[dayName] || {};
  const weeklyProgress =
    achievements.weeklyGoal > 0
      ? (achievements.totalDays / achievements.weeklyGoal) * 100
      : 0;

  const headerTextColorClass = darkMode ? "text-white" : "text-green-500"; // Green header
  // notification
  // Function to schedule the notification
  const scheduleDailyNotification = () => {
    const now = new Date();
    const notificationTime = new Date(now);
    notificationTime.setHours(7, 0, 0, 0); // Set time for 9:00 AM

    if (now > notificationTime) {
      notificationTime.setDate(notificationTime.getDate() + 1); // Schedule for tomorrow if it's past 9 AM today
    }

    const timeUntilNotification = notificationTime.getTime() - now.getTime();

    setTimeout(() => {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: "It's time for your daily yoga!",
        },
      ]);
    }, timeUntilNotification);
  };

  useEffect(() => {
    scheduleDailyNotification();

    const interval = setInterval(
      scheduleDailyNotification,
      24 * 60 * 60 * 1000
    ); // Repeat daily

    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleNotificationClick = () => {
    setNotificationVisible(true); // Show notifications
  };

  const closeNotifications = () => {
    setNotificationVisible(false); // Hide notifications
    setNotifications([]); // Clear notifications when closed
  };

  return (
    <div
      className={`min-h-screen py-10 px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-green-50 text-gray-700" // Light green background
      }`}
    >
      {/* Header Section */}
      <header className="mb-8 text-center">
        {/* Dark mode toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-700 transition-colors duration-300" // Light green hover
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>

        <h1 className={`text-3xl font-bold mb-2 ${headerTextColorClass}`}>
          Yoga Planner
        </h1>
        <p className="text-gray-500 mb-4">Your personalized yoga journey</p>

        {/* Progress and Notifications */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <AchievementBadge
            icon="🔥"
            value={achievements.streak}
            label="Streak"
            darkMode={darkMode}
          />
          {/* <AchievementBadge
            icon="⏳"
            value={`${Math.floor(sessionTime / 60)}:${String(
              sessionTime % 60
            ).padStart(2, "0")}`}
            label="Session"
            darkMode={darkMode}
          /> */}
          <NotificationIcon count={notifications.length} darkMode={darkMode} />
        </div>

        {/* Weekly Progress Bar */}
        <div className="w-full bg-green-100 rounded-full h-4 mb-4">
          <div
            className="bg-green-400 h-4 rounded-full transition-all duration-500"
            style={{ width: `${weeklyProgress}%` }}
          ></div>
        </div>
      </header>

      {/* ******************************************* */}
      {/* Notification Modal/Display */}
      {notificationVisible && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 border overflow-y-auto h-full w-full"
          onClick={closeNotifications}
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Notifications
            </h3>
            <ul>
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className="py-2 border-b border-gray-200 dark:border-gray-700 dark:text-gray-300"
                >
                  {notif.message}
                </li>
              ))}
            </ul>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={closeNotifications}
            >
              <span>X</span>
            </button>
          </div>
        </div>
      )}

      {/* ******************************************* */}
      <div className="mt-8">
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
        />
      </div>
      {/* Main Content Grid */}
      <MainContent
        darkMode={darkMode}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        yogaPlans={yogaPlans}
        sessionTime={sessionTime}
        isYogaCompleted={isYogaCompleted}
      />

      {/* New Features Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeeklyGoal darkMode={darkMode} achievements={achievements} />
        <AchievementSpotlight
          darkMode={darkMode}
          streak={achievements.streak}
        />
      </div>
    </div>
  );
};

export default Task;
