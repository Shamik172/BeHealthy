export const AchievementBadge = ({ icon, value, label, darkMode }) => (
  <div
    className={`flex items-center space-x-2 p-3 rounded-xl ${
      darkMode ? "bg-green-900" : "bg-green-100"
    }`}
  >
    <span
      className={`text-2xl ${darkMode ? "text-green-400" : "text-green-600"}`}
    >
      {icon}
    </span>
    <div>
      <div
        className={`text-xl font-bold ${
          darkMode ? "text-green-400" : "text-green-700"
        }`}
      >
        {value}
      </div>
      <div
        className={`text-xs ${darkMode ? "text-green-300" : "text-green-600"}`}
      >
        {label}
      </div>
    </div>
  </div>
);
