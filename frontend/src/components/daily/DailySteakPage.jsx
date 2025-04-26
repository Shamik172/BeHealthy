import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import MonthlyStreak from './MonthlySummaryCard';

const TaskPage = () => {
  const [asana, setAsana] = useState(null);
  const [countdown, setCountdown] = useState(10); // 5 minutes countdown (in seconds)
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [streakCount, setStreakCount] = useState(null);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);

  // Fetch Asana Details
  useEffect(() => {
    const fetchAsanaDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5050/asanas/today'); // Fetch a random asana
        setAsana(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching asana details');
      }
    };

    fetchAsanaDetails();
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    let timer;
    if (isTimerActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleCompleteTask();
    }

    // Clean up the interval on unmount
    return () => clearInterval(timer);
  }, [isTimerActive, countdown]);

  // Handle Task Completion (Update Streak)
  const handleCompleteTask = async () => {
    try {
      // Ensure you're passing asanaId in the request
      const response = await axios.post('http://localhost:5050/streak/complete', {
        asanaId: asana._id,  // Pass the asana ID from the fetched asana details
      });
  
      setTaskCompleted(true);
      setIsTimerActive(false);
      toast.success('Task completed! Your streak is updated.');
  
      // Fetch updated streak info
      const streakResponse = await axios.get('http://localhost:5050/streak/user-streak');
      setStreakCount(streakResponse.data.streakCount);
      setLastCompletedDate(streakResponse.data.lastCompletedDate);
    } catch (error) {
      console.error(error);
      toast.error('Error completing task.');
    }
  };
  

  // Start Countdown Timer
  const startTimer = () => {
    setIsTimerActive(true);
  };

  // Format Time (MM:SS)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!asana) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-page-container">
       <MonthlyStreak />
      <h2 className="text-3xl font-bold mb-4">Complete Your Asana</h2>

      {/* Display Asana Details */}
      <div className="asana-details bg-gray-100 p-4 rounded-md mb-6">
        <h3 className="text-2xl font-semibold">{asana.name}</h3>
        <p className="text-sm italic">{asana.sanskritName}</p>
        <div className="asana-image my-4">
          <img src={asana.image} alt={asana.name} className="w-full h-auto rounded-md" />
        </div>
        <p className="text-lg mt-4">{asana.instructions}</p>
      </div>

      {/* Timer Section */}
      <div className="timer-section bg-green-100 p-4 rounded-md mb-6">
        <h3 className="text-xl font-semibold">Timer</h3>
        <p className="text-2xl font-bold">{formatTime(countdown)}</p>

        {/* Start Button */}
        {!isTimerActive && !taskCompleted && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200"
            onClick={startTimer}
          >
            Start Timer
          </button>
        )}

        {/* Task Completed Message */}
        {taskCompleted && (
          <div className="streak-info bg-green-200 p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">Your Streak</h3>
            <p className="text-2xl">{streakCount}</p>
            <p className="text-sm">
              Last Completed: {lastCompletedDate ? new Date(lastCompletedDate).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        )}
      </div>

      {/* Optional - Instructions/Task Info */}
      <div className="task-info mt-8">
        <h3 className="text-xl font-semibold">Instructions</h3>
        <p>Follow the instructions carefully to complete this asana!</p>
      </div>
    </div>
  );
};

export default TaskPage;
