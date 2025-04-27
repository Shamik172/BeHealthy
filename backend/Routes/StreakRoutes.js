const express = require('express');
const router = express.Router();
const { getCompletionHistory,
    getCompletedAsanas,
    getUserStreak, 
    updateStreakAndSaveAsana,
    getWeeklySummary,
    getMonthlySummary
} = require("../Controllers/StreakController.js");
const UserAuth = require('../Middlewares/UserAuth.js');


// POST: Update Streak + Save Completed Asana
router.post('/complete',UserAuth ,updateStreakAndSaveAsana);

// GET: Get Completed Asanas (all or by date)
router.get('/completed', UserAuth ,getCompletedAsanas);

// GET: Get User Streak Info
router.get('/user-streak', UserAuth ,getUserStreak);

// GET: Get Weekly User Streak Info
router.get('/weekly-summary', UserAuth , getWeeklySummary);

// Get : Get Monthly Streak Info
router.get('/monthly-summary', UserAuth ,getMonthlySummary);

// GET: Get Completion History (grouped by dates)
router.get('/history',  UserAuth , getCompletionHistory);

module.exports = router;
