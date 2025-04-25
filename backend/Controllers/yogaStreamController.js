const fs = require("fs");
const path = require("path");

exports.uploadVideo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No video file uploaded" });
  }

  res.status(200).json({
    message: "Video uploaded successfully",
    filename: req.file.filename,
  });
};

exports.getAllVideos = (req, res) => {
    const dirPath = path.join(__dirname, "../uploads");
    
    fs.readdir(dirPath, (err, files) => {
      if (err) return res.status(500).json({ error: "Unable to read files" });
  
      // Filter files to include only .webm videos
      const videos = files
        .filter(file => file.endsWith(".webm"))
        .map(file => ({
          filename: file,
          url: `/uploads/${file}`,
        }));
  
      res.status(200).json(videos);
    });
  };
