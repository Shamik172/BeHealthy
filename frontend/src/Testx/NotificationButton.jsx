import React from "react";
import { useNotification } from "../NotificationContext"; // Import NotificationContext

const NotificationButton = () => {
  const { showNotification } = useNotification(); // Get showNotification function

  const handleClick = () => {
    showNotification("New notification at " + new Date().toLocaleTimeString());
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Show Notification
    </button>
  );
};

export default NotificationButton;
