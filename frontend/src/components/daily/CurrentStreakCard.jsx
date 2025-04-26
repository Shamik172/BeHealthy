import React from 'react';

export default function CurrentStreakCard({ streak }) {
  return (
    <div className="bg-green-100 rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold text-green-700 mb-2">🔥 Current Streak</h2>
      <p className="text-green-800">Current: {streak?.currentStreak || 0} days</p>
      <p className="text-green-600">Best: {streak?.bestStreak || 0} days</p>

      {/* <span>Minimum streak: {streak?.min ?? 0} days</span> */}

    </div>
  );
}
