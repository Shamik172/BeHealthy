import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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

  // Mark as seen when notifications are loaded
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("lastSeenNotificationId", notifications[0].id);
    }
  }, [notifications]);

  return (
    <div className="px-4 sm:px-6 lg:px-16 py-6 w-full">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500 text-center italic"
        >
          No notifications yet.
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notifications.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="p-5 bg-green-100 border-l-4 border-green-500 rounded-2xl shadow hover:shadow-xl transition-all"
            >
              <div className="font-semibold text-green-800 text-lg mb-2 break-words">
                {note.message}
              </div>
              <div className="text-xs text-gray-500">
                {note.time}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationHistory;
