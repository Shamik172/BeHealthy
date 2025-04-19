import React from "react";
import { useNotification } from "../../NotificationContext";
import "./NotificationStyles.css"; // Ensure you have the CSS for animations

const NotificationPopup = () => {
  const { current, remainingTime, progress } = useNotification();

  if (!current) return null;

  return (
    <div
      className="fixed top-5 right-5 bg-white text-black px-4 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 opacity-100"
      style={{
        animation: "fadeIn 0.5s ease-out", // Animation for smooth entry
      }}
    >
      <p>{current.message}</p>
      <p className="text-xs mt-2">{remainingTime}s left</p>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-300 mt-2 rounded">
        <div
          className="absolute top-0 left-0 h-full bg-green-600 rounded"
          style={{
            width: `${progress}%`,
            transition: "width 1s linear", // Smooth transition for progress
          }}
        ></div>
      </div>
    </div>
  );
};

export default NotificationPopup;
