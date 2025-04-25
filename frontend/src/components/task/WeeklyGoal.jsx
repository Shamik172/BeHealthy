import React, { useState } from "react";
import { AchievementBadge } from "./AchievementBadge";

export const WeeklyGoal = ({ darkMode, achievements, onGoalChange }) => {
  const [newGoal, setNewGoal] = useState(achievements.weeklyGoal); // Initialize with current goal
  const weeklyProgress =
    achievements.weeklyGoal > 0
      ? (achievements.totalDays / achievements.weeklyGoal) * 100
      : 0;

  const bgColorClass = darkMode ? "bg-gray-800" : "bg-white";
  const textColorClass = darkMode ? "text-white" : "text-gray-800";

  const handleGoalInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNewGoal(value);
  };

  const handleGoalSubmit = () => {
    if (typeof onGoalChange === "function") {
      onGoalChange(newGoal);
    }
  };

  return (
    <div className={`shadow-md rounded-lg p-4 ${bgColorClass}`}>
      <h2 className={`text-lg font-semibold mb-4 ${textColorClass}`}>
        Weekly Goal
      </h2>
      <div className="flex items-center justify-between mb-4">
        <AchievementBadge
          icon="🎯"
          value={achievements.weeklyGoal}
          label="Current Goal"
          darkMode={darkMode}
        />
        <AchievementBadge
          icon="📅"
          value={achievements.totalDays}
          label="Days Done"
          darkMode={darkMode}
        />
      </div>

      {/* <div className="mb-4">
        <label
          htmlFor="new-goal"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Set New Goal:
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            name="new-goal"
            id="new-goal"
            className="focus:ring-green-500 focus:border-green-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={newGoal}
            onChange={handleGoalInputChange}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none dark:text-gray-400">
            days
          </div>
        </div>
        <button
          onClick={handleGoalSubmit}
          className="mt-2 py-2 px-4 rounded-md font-semibold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Update Goal
        </button>
      </div> */}

      <div className="w-full bg-green-100 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${weeklyProgress}%` }}
        ></div>
      </div>
      <p
        className={`text-sm mt-2 text-gray-600 ${
          darkMode ? "text-gray-400" : ""
        }`}
      >
        {achievements.totalDays} of {achievements.weeklyGoal} days completed
      </p>
    </div>
  );
};
