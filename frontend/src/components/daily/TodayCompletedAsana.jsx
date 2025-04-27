import React from 'react';

export default function TodayCompletedAsanas({ completedAsanas }) {
  return (
    <div className="bg-green-50 rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold text-green-700 mb-2">📅 Today's Completed Asanas</h2>
      <ul className="list-disc pl-5">
        {completedAsanas.length > 0 ? completedAsanas.map((asana, index) => (
          <li key={index}>{asana.name}</li>
        )) : (
          <p className="text-gray-500">No Asanas Completed Today</p>
        )}
      </ul>
    </div>
  );
}
