import React from 'react';

function PrimaryButton({ children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
