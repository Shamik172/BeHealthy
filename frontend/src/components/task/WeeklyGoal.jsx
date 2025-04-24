import { AchievementSpotlight } from "./AchievementSpotlight";
import { QuickStart } from "./QuickStart";

export const WeeklyGoal = ({ darkMode, achievements }) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Weekly Goal Setter */}
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
          Weekly Goal Settings
        </h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={achievements.weeklyGoal}
            onChange={(e) =>
              setAchievements((prev) => ({
                ...prev,
                weeklyGoal: Math.max(1, parseInt(e.target.value)),
              }))
            }
            className={`w-20 p-2 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-green-600 text-green-400"
                : "bg-white border-green-300 text-green-700"
            }`}
          />
          <span className={`${darkMode ? "text-gray-400" : "text-green-600"}`}>
            Days per week
          </span>
        </div>
      </div>
      <QuickStart darkMode={darkMode} />
      <AchievementSpotlight darkMode={darkMode} achievements={achievements} />
    </div>
  );
};
