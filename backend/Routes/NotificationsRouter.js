const express = require('express');
const router = express.Router();
const Notification = require('../Models/NotificationModel'); // If you created the model

// POST /notifications/send
router.post('/send', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ success: false, error: "Message is required" });

  // Save notification to DB (optional)
  await Notification.create({ message });

  // Here you could also broadcast to users via sockets, email, etc.

  res.json({ success: true, message: "Notification sent to all users!" });
});

router.get('/', async (req, res) => {
  const notifications = await Notification.find().sort({ date: -1 });
  res.json({ success: true, notifications });
});

module.exports = router;