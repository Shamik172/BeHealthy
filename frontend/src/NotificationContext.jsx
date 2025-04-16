import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [current, setCurrent] = useState(null);
  const [remainingTime, setRemainingTime] = useState(5); // 5 seconds countdown
  const [progress, setProgress] = useState(100); // Full progress initially

  const showNotification = (message) => {
    const newNote = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString(),
    };

    // Reset remaining time and progress when a new notification comes in
    setRemainingTime(5);
    setProgress(100);

    // Add the notification to the list and set the current notification
    setNotifications((prev) => [newNote, ...prev]);
    setCurrent(newNote);

    // Start the countdown and progress decrement
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0; // Stop countdown when it reaches 0
        }
        return prev - 1;
      });

      setProgress((prev) => {
        if (prev <= 0) {
          return 0; // Ensure progress doesn't go below 0
        }
        return prev - 20; // Decrease progress every second
      });
    }, 1000);

    setTimeout(() => {
      setCurrent(null); // Hide notification after 5 seconds
    }, 5000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        current,
        remainingTime,
        progress,
        showNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
