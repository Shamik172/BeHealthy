import React, { useState, useEffect, useContext } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from "framer-motion";
import { AppContent } from "../../context/AppContext";
import axios from "axios";

const StreakHeatmap = () => {
  const [completedDates, setCompletedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData, backendUrl } = useContext(AppContent);

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/streak/completed`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log("response : ", response.data.streak.history);
        const   history  = response.data.streak.history || {};
        console.log("History : ", history);
        setCompletedDates(history || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching streak data:", error);
        setLoading(false);
      }
    };

    fetchStreakData();
  }, [backendUrl]);

  const today = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(today.getFullYear() - 1);

  const activeDays = new Set(
    (completedDates || []).map((date) => new Date(date).toDateString())
  );

  const getValueForDay = (date) =>
    activeDays.has(new Date(date).toDateString()) ? 1 : 0;

  const generateHeatmapValues = () => {
    const values = [];
    const curr = new Date(yearAgo);
    while (curr <= today) {
      values.push({
        date: curr.toISOString().split("T")[0],
        count: getValueForDay(curr),
      });
      curr.setDate(curr.getDate() + 1);
    }
    return values;
  };

  const heatmapValues = generateHeatmapValues();

  const { currentStreak, longestStreak, totalActiveDays } = (() => {
    let curr = 0,
      longest = 0,
      temp = 0;
    heatmapValues.forEach((v) => {
      if (v.count > 0) {
        temp++;
        longest = Math.max(longest, temp);
      } else temp = 0;
    });
    for (let i = heatmapValues.length - 1; i >= 0; i--) {
      if (heatmapValues[i].count > 0) curr++;
      else break;
    }
    return {
      currentStreak: curr,
      longestStreak: longest,
      totalActiveDays: heatmapValues.filter((v) => v.count > 0).length,
    };
  })();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 bg-yellow-50 rounded-2xl shadow-lg w-full max-w-5xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#2e7d32] mb-4">
          Your Yoga Streak 🔥
        </h2>
        <div className="flex flex-wrap justify-center gap-8 text-lg">
          <div className="text-green-600 font-semibold">
            Current Streak: {currentStreak} 🔥
          </div>
          <div className="text-blue-600 font-semibold">
            Longest Streak: {longestStreak} 🏆
          </div>
          <div className="text-purple-600 font-semibold">
            Total Active Days: {totalActiveDays} 📅
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="overflow-x-auto"
      >
        <CalendarHeatmap
          startDate={yearAgo}
          endDate={today}
          values={heatmapValues}
          showWeekdayLabels
          classForValue={(value) =>
            !value || value.count === 0
              ? "color-empty"
              : `color-scale-${value.count}`
          }
          tooltipDataAttrs={(value) => {
            if (!value || !value.date) return null;
            const d = new Date(value.date);
            const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
            const formatted = d.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            return {
              "data-tooltip-id": "heatmap-tooltip",
              "data-tooltip-content": `${weekday}, ${formatted}: ${
                value.count > 0 ? "Activity done 🧘‍♀️" : "No activity ❌"
              }`,
            };
          }}
        />
        <Tooltip id="heatmap-tooltip" />
      </motion.div>
    </motion.div>
  );
};

export default StreakHeatmap;
