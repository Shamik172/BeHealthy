export const WeeklyPlanSection = ({ yogaPlans, selectedDate, darkMode }) => {
  const bgColorClass = darkMode ? "bg-gray-800" : "bg-white";
  const textColorClass = darkMode ? "text-white" : "text-gray-800";
  const planBgColorClass = darkMode ? "bg-gray-700" : "bg-green-50"; // Light green

  return (
    <div className={`shadow-md rounded-lg p-4 ${bgColorClass}`}>
      <h2 className={`text-lg font-semibold mb-4 ${textColorClass}`}>
        Weekly Plan
      </h2>
      <div className="space-y-3">
        {Object.entries(yogaPlans).map(([day, plan]) => (
          <div key={day} className={`rounded-md p-3 ${planBgColorClass}`}>
            <div className="flex justify-between items-center mb-1">
              <span
                className={`font-semibold ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {day}
              </span>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {plan.duration}
              </span>
            </div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {plan.pose}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
