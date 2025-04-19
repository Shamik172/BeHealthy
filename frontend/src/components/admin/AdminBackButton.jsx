import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminBackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admin')}
      className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      ← Back to Dashboard
    </button>
  );
}

export default AdminBackButton;