import React, { useState } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function CompleteAsanaForm({ onComplete }) {
  const [asanaName, setAsanaName] = useState('');

  const handleComplete = async () => {
    if (!asanaName) return;
    try {
      await axios.post('http://localhost:5050/streak/complete', 
        { asanaName }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAsanaName('');
      onComplete(); // refresh parent
    } catch (error) {
      console.error('Error marking asana complete:', error);
    }
  };

  return (
    <div className="bg-green-50 rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold text-green-700 mb-2">✅ Complete Today's Asana</h2>
      <input
        type="text"
        placeholder="Enter Asana Name"
        value={asanaName}
        onChange={(e) => setAsanaName(e.target.value)}
        className="border border-green-300 p-2 w-full rounded mb-2"
      />
      <button
        onClick={handleComplete}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full"
      >
        Complete Asana
      </button>
    </div>
  );
}
