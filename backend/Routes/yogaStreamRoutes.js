const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/videoUpload");
const { uploadVideo, getAllVideos } = require("../Controllers/yogaStreamController");

router.post("/upload", upload.single("file"), uploadVideo);
router.get("/videos", getAllVideos);

module.exports = router;
