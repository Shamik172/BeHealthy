import React from 'react';

const ReviewsTab = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-green-600 mb-4">Your Reviews</h3>
      <div className="space-y-4">
        <div className="border p-4 rounded-lg">
          <p className="text-gray-700">🌟🌟🌟🌟 - Loved the guided meditation session!</p>
          <p className="text-sm text-gray-500">Posted on: April 20, 2025</p>
        </div>
        <div className="border p-4 rounded-lg">
          <p className="text-gray-700">🌟🌟🌟 - Good session, but could include more breathing exercises.</p>
          <p className="text-sm text-gray-500">Posted on: April 15, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab;
