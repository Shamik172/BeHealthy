import React, { useState, useEffect } from "react";
import axios from "axios";

const YogaStream = () => {
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
      fetchVideos();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h2 className="text-4xl font-bold text-center text-indigo-600">🌿 Yoga Videos</h2>
      <p className="text-center text-gray-600 text-lg">
        Upload your yoga video here for other users.
      </p>

      {/* Upload Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="file"
          accept="video/webm"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-all"
        >
          Upload Video
        </button>
      </div>

      {/* Display List of Videos */}
      <div>
        <h3 className="text-2xl font-semibold text-center text-gray-800">📹 Available Videos</h3>
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {videos.map((video) => (
              <div
                key={video.filename}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition-all"
              >
                <video controls className="w-full h-64 object-cover rounded-t-md">
                  <source src={`http://localhost:5050${video.url}`} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4">
                  <p className="text-sm text-gray-600 text-center break-all">
                    {video.filename}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8 text-lg">
            No videos available. Be the first to upload!
          </p>
        )}
      </div>
    </div>
  );
};

export default YogaStream;
