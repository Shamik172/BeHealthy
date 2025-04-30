import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import DailyChallenge from './DailyChallenge';
import CountdownTimer from './CountdownWatch';
import StreakCalendar from './StreakCalander';
import HonestyQuotes from './HonestyQuote';
import { AppContent } from '../../context/AppContext';


const bgColors = [
  "#e0f7fa", // light cyan
  "#f1f8e9", // light green
  "#fff9c4", // light yellow
  "#fce4ec", // light pink
];

const StreakPage = () => {
  const { isLoggedin } = useContext(AppContent); // 👈 Access login state

  return (
    <motion.div
      className="flex flex-col lg:flex-row w-full min-h-screen p-6"
      initial={{ backgroundColor: bgColors[0] }}
      animate={{ backgroundColor: bgColors }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    >
      {/* Left: Daily Challenge (80%) */}
      <motion.div
        className="w-full lg:w-4/5 bg-yellow-80 p-6 rounded shadow-md mb-6 lg:mb-0 lg:mr-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <DailyChallenge />
      </motion.div>

      {/* Right Sidebar: only if user is logged in */}
      {isLoggedin && (
        <motion.div
          className="w-full lg:w-1/5 flex flex-col space-y-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-red-50 p-4 rounded shadow-md min-h-fit">
            <StreakCalendar />
          </div>
          <div className="bg-orange-100 p-4 rounded shadow-md h-50">
            <CountdownTimer />
          </div>
          <div className="bg-red-50 p-4 rounded shadow-md min-h-70">
            <HonestyQuotes />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StreakPage;
