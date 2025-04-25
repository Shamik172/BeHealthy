const path = require("path");

const uploadVideo = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.status(200).json({
    message: "Video uploaded",
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename,
  });
};

const getVideos = (req, res) => {
  const fs = require("fs");
  const dir = path.join(__dirname, "../uploads");

  const files = fs.readdirSync(dir).map((filename) => ({
    filename,
    url: `/uploads/${filename}`,
  }));

  res.json(files);
};

module.exports = { uploadVideo, getVideos };
