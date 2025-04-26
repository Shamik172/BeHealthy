import React from 'react';

export default function CompletionHistoryTable({ completionHistory }) {
  return (
    <div className="bg-green-50 rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold text-green-700 mb-2">📖 Completion History</h2>
      {completionHistory.length > 0 ? (
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-2 py-1 text-green-700">Date</th>
              <th className="px-2 py-1 text-green-700">Completed Asanas</th>
            </tr>
          </thead>
          <tbody>
            {completionHistory.map((entry, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{entry.date}</td>
                <td className="border px-2 py-1">{entry.completedAsanas.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No Completion History Available</p>
      )}
    </div>
  );
}
