const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { uploadVideo, getVideos } = require("../Controllers/liveStreamController");

router.post("/upload", upload.single("file"), uploadVideo);
router.get("/videos", getVideos);

module.exports = router;
