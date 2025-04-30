const express = require('express');
const router = express.Router();
const { updateStreak, getStreak, completed, checkDailyTaskStatus } = require('../Controllers/StreakController.js');
const UserAuth = require('../Middlewares/UserAuth.js');

router.post('/update-streak', UserAuth, updateStreak);
router.get('/get-streak', UserAuth, getStreak);
router.get('/completed', UserAuth, completed);
router.get("/alreadydone", UserAuth, checkDailyTaskStatus);
module.exports = router;
