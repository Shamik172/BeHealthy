import React from 'react';

const ProgressTab = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-green-600 mb-4">Practice Progress</h3>
      <p><strong>Total Sessions:</strong> 30</p>
      <p><strong>Weekly Streak:</strong> 5 days 🔥</p>
      <p><strong>Favorite Body Focus:</strong> Core & Flexibility</p>

      <div className="mt-4">
        <h4 className="text-md font-semibold text-green-500 mb-2">Recent Practice</h4>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Warrior I - 20 mins</li>
          <li>Tree Pose - 15 mins</li>
          <li>Plank Sequence - 10 mins</li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressTab;
