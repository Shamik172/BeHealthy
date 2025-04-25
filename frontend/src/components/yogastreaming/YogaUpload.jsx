import React, { useState, useEffect } from "react";
import axios from "axios";

const YogaUpload = () => {
  const [videos, setVideos] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5050/yoga-stream/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!uploadFile) return;

    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      await axios.post("http://localhost:5050/yoga-stream/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadFile(null);
      fetchVideos();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-extrabold text-indigo-700">🌿 Yoga Video Library</h2>
          <p className="text-lg text-gray-600">Share your peaceful flow with others.</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white shadow-lg border border-indigo-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <label className="w-full sm:w-auto">
            <span className="block text-sm font-medium text-gray-700 mb-1">Select a video (.webm only)</span>
            <input
              type="file"
              accept="video/webm"
              onChange={handleFileChange}
              className="block w-full sm:w-72 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer"
            />
          </label>

          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition"
          >
            Upload Video
          </button>
        </div>

        {/* Videos Grid */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">📹 Available Videos</h3>

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div
                  key={video.filename}
                  className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <video
                    controls
                    className="w-full h-64 object-cover rounded-t-xl"
                    preload="metadata"
                  >
                    <source src={`http://localhost:5050${video.url}`} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 text-center truncate" title={video.filename}>
                      {video.filename}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-500 italic mt-10 animate-pulse">
              No videos yet — be the first to upload 🧘‍♂️
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YogaUpload;
