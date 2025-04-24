export const QuickStart = ({ darkMode }) => {
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
        Quick Start Sessions
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {[5, 10, 15, 20].map((mins) => (
          <button
            key={mins}
            onClick={() => startYogaSession(mins)}
            className={`p-3 rounded-lg transition-all ${
              darkMode
                ? "bg-green-700 hover:bg-green-600 text-green-100"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {mins} Minute Session
          </button>
        ))}
      </div>
    </div>
  );
};
