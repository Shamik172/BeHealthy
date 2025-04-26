import React from 'react';

export default function WeeklySummaryCard({ weeklySummary }) {
  return (
    <div className="bg-green-50 rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold text-green-700 mb-2">📆 Weekly Summary</h2>
      {weeklySummary.length > 0 ? weeklySummary.map((day, index) => (
        <div key={index}>
          <p className="text-green-700">{day.date}: {day.completedCount} Asanas</p>
        </div>
      )) : (
        <p className="text-gray-500">No Weekly Data</p>
      )}
    </div>
  );
}
