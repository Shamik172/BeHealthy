const Streak = require('../Models/Streak');
const moment = require('moment');
const { use } = require('../Routes/StreakRoutes');

// POST /api/streak/update-streak
const updateStreak = async (req, res) => {
  try {
    const userId = req.user?.id;
    let streak = await Streak.findOne({ user: userId });

    const today = moment().startOf('day');

    if (!streak) {
      streak = new Streak({
        user: userId,
        count: 1,
        highest: 1,
        lastDate: today.toDate(),
        history: [today.toDate()]
      });
    } else {
      const last = streak.lastDate ? moment(streak.lastDate).startOf('day') : null;

      if (last && today.diff(last, 'days') === 0) {
        return res.status(200).json({ message: 'Already updated today', streak });
      }

      if (last && today.diff(last, 'days') === 1) {
        streak.count += 1;
      } else {
        streak.count = 1;
      }

      streak.lastDate = today.toDate();
      if (streak.count > streak.highest) {
        streak.highest = streak.count;
      }

      // Push today to history if not already present
      if (!streak.history.some(d => moment(d).isSame(today, 'day'))) {
        streak.history.push(today.toDate());
      }
    }

    await streak.save();
    res.status(200).json({ message: 'Streak updated', streak });

  } catch (error) {
    console.error("Streak update failed:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/streak/get-streak
const getStreak = async (req, res) => {
  try {
    const userId = req.user?.id;
    const streak = await Streak.findOne({ user: userId });

    if (!streak) return res.status(404).json({ message: 'No streak found' });

    res.status(200).json({ streak });

  } catch (error) {
    console.error("Get streak failed:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


const completed = async (req, res) => {

  console.log("Streak Controller Called : ");
  try {
    const userId = req.user?.id;
    console.log("User Id : " , userId) ;
    const streak = await Streak.findOne({ user: userId });
    
    if (!streak) {
      return res.status(200).json({ completedDates: [], streakCount: 0 });
    }
    console.log("streak: ",streak);
    const completedDates = streak.history.map(date =>
      date.toISOString().split("T")[0]
    );

    return res.status(200).json({
      streak
    });
  } catch (err) {
    console.error("Error fetching streak:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to check if the user has already completed today's task
const checkDailyTaskStatus = async (req, res) => {
  try {
    const userId = req.user?.id; // Assuming auth middleware adds user to req
    const today = moment().startOf('day');

    // Find the streak record for the user
    const streak = await Streak.findOne({ user: userId });

    if (!streak) {
      return res.status(404).json({
        success: false,
        message: 'Streak not found for the user.',
      });
    }

    // Check if the user has already completed today's task
    const alreadyDone = streak.lastDate && moment(streak.lastDate).isSame(today, 'day');

    return res.status(200).json({
      success: true,
      alreadyDone,
      streakCount: streak.count,
      highestStreak: streak.highest,
      message: alreadyDone
        ? 'You have already completed the task for today.'
        : 'You have not completed the task for today.',
    });

  } catch (err) {
    console.error("Error checking daily task status:", err);
    return res.status(500).json({
      success: false,
      message: 'Server error checking daily task status.',
    });
  }
};


module.exports ={
   getStreak,
   updateStreak,
   completed,
   checkDailyTaskStatus
}