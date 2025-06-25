import React, { useContext, useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { News } from "./News/News";
import axios from "axios";
import StreakCalendar from "./daily/StreakCalander";
import { AppContent } from "../context/AppContext";


const updates = [
  "New yoga session added this Sunday!",
  "Try the Warrior Pose challenge this week.",
  "Your streak is going strong! Keep it up!",
  "Join our live meditation session tomorrow!",
  "Yoga retreat registrations are open!",
  "10-minute yoga challenge starts today!",
];

export default function YogaSidebar() {
  const [notifications, setNotifications] = useState([]);
  const {backendUrl} = useContext(AppContent);
  useEffect(() => {
    axios
      .get(`${backendUrl}/notifications`)
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
      .catch(() => setNotifications([]));
  }, []);

  return (
    <div>
      <div className="bg-white px-4 sm:px-6 py-6 sm:py-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row lg:flex-col gap-6">
          {/* Notifications */}
          <div className="w-full md:w-1/2 lg:w-full">
            <h3 className="text-lg sm:text-xl font-bold text-green-700">
              Yoga Updates
            </h3>
            <div className="mt-3 sm:mt-4 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2 space-y-2 text-xs sm:text-sm">
              {updates.map((update, idx) => (
                <div key={idx} className="p-2 bg-gray-100 rounded-md">
                  {update}
                </div>
              ))}
            </div>
            {/* you can also show notifications here if desired */}
          </div>

          {/* Streak Calendar */}
          <StreakCalendar/>
        </div>
      </div>
      <News />
    </div>
  );
}
