import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationHistory = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5050/notifications")
      .then(res => {
        if (res.data.success) {
          setNotifications(
            res.data.notifications.map(n => ({
              id: n._id,
              message: n.message,
              time: new Date(n.date).toLocaleString(),
            }))
          );
        }
      })
      .catch(() => {
        setNotifications([]);
      });
  }, []);

  return (
    <div className="space-y-4 m-2">
      {notifications.length === 0 ? (
        <div className="text-sm text-gray-500 text-center italic">
          No notifications yet.
        </div>
      ) : (
        notifications.map((note) => (
          <div
            key={note.id}
            className="p-4 text-black bg-green-300 border-l-4 border-b-2 border-green-200 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="font-medium text-base">
              {note.message}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {note.time}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationHistory;
