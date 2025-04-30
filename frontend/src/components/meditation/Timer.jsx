// src/components/meditation/Timer.jsx
import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [duration, setDuration] = useState(300); // default 5 minutes
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [timeLeft]);

  const startTimer = () => {
    if (timeLeft > 0) setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimeLeft(duration);
  };

  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setDuration(value * 60);
      setTimeLeft(value * 60);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-green-100 p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-green-900">⏱️ Meditation Timer</h3>
      <div className="text-center text-4xl font-bold mb-4 text-green-800">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>

      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={startTimer}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>

      <div className="text-sm text-green-800 mb-2">Set Duration (minutes):</div>
      <input
        type="number"
        min="1"
        className="w-full px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        onChange={handleDurationChange}
        placeholder="Enter minutes"
      />
    </div>
  );
};

export default Timer;
