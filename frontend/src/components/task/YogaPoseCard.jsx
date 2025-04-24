export const YogaPoseCard = ({
  pose, // Ensure this is a single pose object
  onComplete,
  isCompleted,
  darkMode,
  startSession,
}) => {
  // Add null checks and default values
  if (!pose) return <div>No yoga pose scheduled for today</div>;

  return (
    <div
      className={`group relative p-6 rounded-xl shadow-lg transition-all ${
        darkMode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3
          className={`text-xl font-bold ${
            darkMode ? "text-green-400" : "text-green-700"
          }`}
        >
          {pose?.pose || "Daily Yoga Practice"}
        </h3>
        <span
          className={`text-sm px-2 py-1 rounded ${
            darkMode
              ? "bg-green-900 text-green-400"
              : "bg-green-100 text-green-700"
          }`}
        >
          {pose?.duration || "15 mins"}
        </span>
      </div>
      <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {pose?.instructions ||
          "Start your practice with mindful breathing exercises"}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {/* Buttons remain the same */}
        <button
          className={`p-3 rounded-lg transition-all ${
            darkMode
              ? "bg-green-700 hover:bg-green-600 text-green-100"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
