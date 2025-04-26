import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MonthlySummaryCard = () => {
  axios.defaults.withCredentials = true;
  const [monthlyData, setMonthlyData] = useState(null);

  useEffect(() => {
    const fetchMonthlyStreakData = async () => {
      try {
        // Make a GET request to fetch monthly streak data
        const { data } = await axios.get(`http://localhost:5050/streak/monthly-summary`);

        if (data.success) {
          setMonthlyData(data.monthlySummary); // Set the fetched data into state
        } else {
          toast.error('Failed to fetch monthly streak data');
        }
      } catch (error) {
        toast.error('Error in fetching monthly streak data');
      }
    };

    fetchMonthlyStreakData(); // Call the function to fetch data
  }, []); // Run once when the component mounts

  if (!monthlyData) {
    return <div>Loading...</div>; // Loading message
  }

  return (
    <div className="monthly-summary-card">
      <h2>Monthly Streak Summary</h2>
      <div className="summary-content">
        <p>Total Yoga Sessions: {monthlyData.totalSessions}</p>
        <p>Streak Days: {monthlyData.streakDays}</p>
        <p>Longest Streak: {monthlyData.longestStreak} days</p>
        <p>Average Daily Sessions: {monthlyData.avgDailySessions}</p>
      </div>
    </div>
  );
};

export default MonthlySummaryCard;
