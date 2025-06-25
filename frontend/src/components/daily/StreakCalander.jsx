import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
} from 'date-fns';
import { AppContent } from '../../context/AppContext';

const StreakCalendar = () => {
  const [streakDays, setStreakDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState([]);
  const today = new Date();
   const {backendUrl} = useContext(AppContent);
  useEffect(() => {
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    setCurrentMonth(eachDayOfInterval({ start, end }));
   
    axios
      .get(`${backendUrl}/streak/completed`, { withCredentials: true })
      .then(res => {
        const history = res.data?.streak?.history || [];
        const days = history
          .map(d => new Date(d))
          .filter(d => isSameMonth(d, today))
          .map(d => d.getDate());
        setStreakDays(days);
      })
      .catch(err => {
        console.error('Error fetching streak:', err);
        setStreakDays([]);
      });
  }, []);

  const weekdays = ['S','M','T','W','T','F','S'];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Your Yoga Streak</h2>
        <p className="text-lg text-gray-700">{format(today, 'MMMM yyyy')}</p>
      </div>

      {/* Calendar */}
      <div className="overflow-x-auto">
        <div className="w-full min-w-[280px]">
          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-[10px] sm:text-xs">
            {weekdays.map((d,i) => (
              <div key={i} className="text-center font-semibold">{d}</div>
            ))}
          </div>
          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-1 mt-1">
            {Array(getDay(startOfMonth(today))).fill(null).map((_,i) => (
              <div key={'empty-'+i} className="aspect-square"></div>
            ))}
            {currentMonth.map(date => {
              const dayNum = date.getDate();
              const isStreak = streakDays.includes(dayNum);
              return (
                <div
                  key={dayNum}
                  className={`aspect-square flex items-center justify-center rounded-md ${
                    isStreak
                      ? 'bg-green-500 text-white font-bold'
                      : 'bg-gray-200'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{dayNum}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;
