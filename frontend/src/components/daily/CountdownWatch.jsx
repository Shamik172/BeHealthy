import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const INITIAL_TIME = 5 * 60; // 5 minutes in seconds

const CountdownTimer = ({ onTimerEnd, userId }) => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [marking, setMarking] = useState(false); // For loading state on mark
  const [taskCompleted, setTaskCompleted] = useState(false); // Task status
  const intervalRef = useRef(null);

  // Check if task is completed for today
  useEffect(() => {
    const checkTaskStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/streak/alreadydone`);
        setTaskCompleted(res.data.alreadyDone); // Set the status based on the response
      } catch (err) {
        console.error('Error checking daily task status:', err);
      }
    };

    checkTaskStatus(); // Call the function to check task status
  }, [userId]);

  // Start the timer
  const startTimer = () => {
    if (isRunning || isCompleted) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsCompleted(true);
          if (onTimerEnd) onTimerEnd();
          toast.success("⏱️ Timer completed! You can now mark it as done.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resumeTimer = () => {
    if (isCompleted || isRunning) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsCompleted(true);
          if (onTimerEnd) onTimerEnd();
          toast.success("⏱️ Timer completed!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(INITIAL_TIME);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const handleMarkComplete = async () => {
    try {
      setMarking(true);
      const res = await axios.post('http://localhost:5050/streak/update-streak');
      toast.success(res.data.message || "Streak updated!");
      setIsCompleted(false); // Optionally reset button
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update streak");
    } finally {
      setMarking(false);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Render the CountdownTimer only if the task is not done today
  if (taskCompleted) {
    return (
      <motion.div 
        className="bg-green-100 p-6 rounded-lg shadow-lg text-center w-full md:w-80 mx-auto"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-green-800">Task Completed Today!</h2>
        <p className="mt-2 text-gray-600">You've already completed your task for today. Keep up the great work!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-green-100 p-6 rounded-lg shadow-lg text-center space-y-4 w-full md:w-80 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-4xl font-bold text-green-800" 
        key={timeLeft}
        initial={{ scale: 0.9 }} 
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {formatTime(timeLeft)}
      </motion.div>

      <motion.div 
        className="flex justify-center space-x-2" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.3 }}
      >
        {!isRunning && !isCompleted && (
          <motion.button 
            onClick={startTimer} 
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
            whileHover={{ scale: 1.1 }} 
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Start
          </motion.button>
        )}
        {isRunning && (
          <motion.button 
            onClick={pauseTimer} 
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600"
            whileHover={{ scale: 1.1 }} 
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Pause
          </motion.button>
        )}
        {!isRunning && timeLeft !== INITIAL_TIME && !isCompleted && (
          <motion.button 
            onClick={resumeTimer} 
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            whileHover={{ scale: 1.1 }} 
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Resume
          </motion.button>
        )}
        <motion.button 
          onClick={resetTimer} 
          className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600"
          whileHover={{ scale: 1.1 }} 
          transition={{ type: 'spring', stiffness: 200 }}
        >
          Reset
        </motion.button>
      </motion.div>

      {isCompleted && (
        <motion.button
          onClick={handleMarkComplete}
          disabled={marking}
          className="mt-4 w-full bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          {marking ? "Marking..." : "✅ Mark as Completed"}
        </motion.button>
      )}
    </motion.div>
  );
};

export default CountdownTimer;
