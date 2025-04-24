export const AchievementSpotlight = ({ darkMode, achievements }) => {
  return (
    <div
      className={`p-6 rounded-2xl shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-green-50"
      }`}
    >
      <h3
        className={`text-xl font-semibold mb-4 ${
          darkMode ? "text-green-400" : "text-green-700"
        }`}
      >
        Achievement Spotlight
      </h3>
      <div className="space-y-3">
        <div
          className={`p-3 rounded-lg ${
            darkMode ? "bg-green-900" : "bg-green-100"
          }`}
        >
          <div className="text-sm font-medium text-green-600">
            Current Streak: {achievements.streak} days 🔥
          </div>
          <div className="h-1 bg-green-200 rounded-full mt-2">
            <div
              className="h-1 bg-green-500 rounded-full"
              style={{ width: `${(achievements.streak / 7) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
