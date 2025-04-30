// src/components/meditation/StreakData.jsx
import React, { useState } from "react";

const StreakData = () => {
  const [streak, setStreak] = useState(5); // Example value for streak

  return (
    <div className="bg-yellow-100 p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Meditation Streak</h3>
      <p className="text-center text-2xl">{streak} days</p>
    </div>
  );
};

export default StreakData;
