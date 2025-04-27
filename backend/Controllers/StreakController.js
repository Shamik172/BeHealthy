const CompletedAsana = require('../Models/CompletedAsanaModel.js');
const Streak = require('../Models/StreakModel.js');
const dayjs = require('dayjs');    
const isoWeek = require('dayjs/plugin/isoWeek');
dayjs.extend(isoWeek);

// Helper: Get start and end of a day
const getDayRange = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

// ✅ 1. Update Streak and Save Completed Asana
const updateStreakAndSaveAsana = async (req, res) => {
  try {
    const userId = req.user?.id; 
    const { asanaId } = req.body;
    if (!userId || !asanaId) return res.status(400).json({ error: "userId and asanaId are required" });

    let streak = await Streak.findOne({ userId });
    if (!streak) {
      streak = new Streak({ userId, streakCount: 0, lastActiveDate: new Date(0) });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastActive = new Date(streak.lastActiveDate);
    lastActive.setHours(0, 0, 0, 0);

    if (today.getTime() === lastActive.getTime()) {
      // Already active today, don't increment streak
    } else if (today.getTime() - lastActive.getTime() === 86400000) {
      streak.streakCount += 1; // Consecutive day
    } else {
      streak.streakCount = 1; // Broken streak, reset
    }

    streak.lastActiveDate = new Date();
    await streak.save();

    const completedAsana = new CompletedAsana({
      userId,
      asanaId
    });
    await completedAsana.save();

    res.status(200).json({
      message: "Streak updated and Asana completed!",
      streak,
      completedAsana
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error updating streak and saving asana" });
  }
};

// ✅ 2. Get all Completed Asanas for a User (optionally by date)
const getCompletedAsanas = async (req, res) => {

    
  try {
    const userId = req.user?.id; 
    const { date } = req.query; // optional ?date=yyyy-mm-dd

    if (!userId) return res.status(400).json({ error: "userId required" });

    let filter = { userId };

    if (date) {
      const { start, end } = getDayRange(new Date(date));
      filter.completedAt = { $gte: start, $lte: end };
    }

    const completedAsanas = await CompletedAsana.find(filter).populate('asanaId');

    res.status(200).json({ completedAsanas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching completed asanas" });
  }
};

// ✅ 3. Get User Streak Info
const getUserStreak = async (req, res) => {
  try {
    const userId = req.user?.id; 
    if (!userId) return res.status(400).json({ error: "userId required" });

    const streak = await Streak.findOne({ userId });

    if (!streak) return res.status(404).json({ message: "No streak found" });

    res.status(200).json({ streak });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching streak" });
  }
};

// ✅ 4. Get Asana Completion History (grouped by day)
const getCompletionHistory = async (req, res) => {
  try {
    const userId = req.user?.id; 
    if (!userId) return res.status(400).json({ error: "userId required" });

    const history = await CompletedAsana.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
          asanasCompleted: { $push: "$asanaId" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    res.status(200).json({ history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching completion history" });
  }
};

// ✅ 5. Get Auto Weekly Completion Summary
const getWeeklySummary = async (req, res) => {
  try {
    const userId = req.user?.id; 

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Auto calculate current week
    const startDate = dayjs().startOf('isoWeek').toDate(); // Monday 00:00
    const endDate = dayjs().endOf('isoWeek').toDate();     // Sunday 23:59

    const history = await CompletedAsana.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          completedAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
          asanasCompleted: { $push: "$asanaId" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({ 
      weekStart: startDate.toISOString().split('T')[0], 
      weekEnd: endDate.toISOString().split('T')[0], 
      history 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching weekly summary" });
  }
};

  
// ✅ 6. Get Monthly Completion Summary
const getMonthlySummary = async (req, res) => {
    try {
      const userId = req.user?.id; 
      const { month, year } = req.query; // expected format: month=4&year=2025
  
      if (!userId || !month || !year) {
        return res.status(400).json({ error: "userId, month, and year are required" });
      }
  
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59, 999);
  
      const history = await CompletedAsana.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            completedAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
            asanasCompleted: { $push: "$asanaId" },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.status(200).json({ month, year, history });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error fetching monthly summary" });
    }
  };
  


module.exports = {
    getCompletionHistory,
    getCompletedAsanas,
    getUserStreak, 
    updateStreakAndSaveAsana,
    getMonthlySummary,
    getWeeklySummary
}