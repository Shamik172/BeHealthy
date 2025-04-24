import Calendar from "react-calendar";
import { WeeklyPlanSection } from "./WeeklyPlanSection";

export const MainContent = ({
  darkMode,
  selectedDate,
  handleDateChange,
  yogaPlans,
  sessionTime,
  isYogaCompleted,
}) => {
  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const dailyPose = yogaPlans.week1[dayName] || {};

  const calendarClass = darkMode ? "text-white" : "text-gray-700";
  const calendarTileClass = ({ date }) =>
    `p-2 rounded-md transition-colors duration-200 ${
      isYogaCompleted(date)
        ? darkMode
          ? "bg-green-700 text-white"
          : "bg-green-100 text-green-700"
        : darkMode
        ? "hover:bg-gray-700 text-gray-300"
        : "hover:bg-green-50 text-green-700" // Light green hover
    }`;
  const sessionTimeColorClass = darkMode ? "text-white" : "text-gray-800";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar Section */}
      <div className="bg-white  shadow-md rounded-lg overflow-hidden">
        <div className="ml-4">
          <h2
            className={`text-lg font-semibold mb-4 p-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Meditation Calendar
          </h2>
          <div>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={calendarTileClass}
              className={calendarClass}
            />
          </div>
        </div>
      </div>

      {/* Daily Yoga Plan */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          {/* Session Timer */}
          {sessionTime > 0 && (
            <div className="mb-4 text-center">
              <div className={`text-2xl font-bold ${sessionTimeColorClass}`}>
                {Math.floor(sessionTime / 60)}:
                {String(sessionTime % 60).padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-500">Time Remaining</div>
            </div>
          )}

          <WeeklyPlanSection
            yogaPlans={yogaPlans.week1}
            selectedDate={selectedDate}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};
