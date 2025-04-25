export const AchievementBadge = ({ icon, value, label, darkMode }) => {
  const bgColorClass = darkMode ? "bg-gray-800" : "bg-white"; // White background
  const textColorClass = darkMode ? "text-white" : "text-gray-800"; // Dark text
  const iconColorClass = darkMode ? "text-gray-400" : "text-green-500"; // Green icon

  return (
    <div
      className={`flex items-center space-x-2 p-2 rounded-lg ${bgColorClass} shadow-sm`}
    >
      <span className={`text-xl ${iconColorClass}`}>{icon}</span>
      <div>
        <div className={`text-lg font-semibold ${textColorClass}`}>{value}</div>
        <div
          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
