export const AchievementSpotlight = ({ darkMode, streak }) => {
  const progressPercentage = Math.min((streak / 7) * 100, 100); // Cap at 100%

  const bgColorClass = darkMode ? "bg-gray-800" : "bg-white";
  const textColorClass = darkMode ? "text-white" : "text-gray-800";

  return (
    <div className={`shadow-md rounded-lg p-4 ${bgColorClass}`}>
      <h2 className={`text-lg font-semibold mb-2 ${textColorClass}`}>
        Streak Spotlight
      </h2>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          Current Streak: {streak} days 🔥
        </div>
        <span className="text-xs text-gray-500">{streak} / 7 days</span>
      </div>
      <div className="w-full bg-green-100 rounded-full h-2 mt-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};
