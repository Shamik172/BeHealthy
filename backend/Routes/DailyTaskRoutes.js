// routes/dailyTaskRoutes.js
const express = require("express");
const { getDailyTask , alreadyDone } = require("../Controllers/DailyTaskController.js");

const router = express.Router();

router.get("/daily-task", getDailyTask);


module.exports= router;
