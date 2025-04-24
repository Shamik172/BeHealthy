import React, { useState } from "react";
import axios from "axios";

const API_SEND_NOTIFICATION = "http://localhost:5050/notifications/send";

const AdminNotifications = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setStatus("");
    try {
      await axios.post(API_SEND_NOTIFICATION, { message });
      setStatus("✅ Notification sent to all users!");
      setMessage("");
    } catch (err) {
      setStatus("❌ Failed to send notification.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 animate-gradient-x">
      <div className="max-w-xl w-full mx-auto bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-indigo-400/30 animate-fadeIn">
        <h2 className="text-3xl font-extrabold mb-6 text-white text-center tracking-wide drop-shadow-lg">
          🚀 Send Notification to All Users
        </h2>
        <textarea
          className="w-full p-4 rounded-xl bg-[#18181b] text-indigo-100 mb-6 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          rows={5}
          placeholder="Enter notification message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !message.trim()}
          className={`w-full py-3 rounded-xl font-bold text-lg transition
            ${loading || !message.trim()
              ? "bg-indigo-900 text-indigo-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 text-white hover:scale-105 hover:shadow-xl"}
          `}
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
        {status && (
          <div className={`mt-6 text-center font-semibold transition-all duration-300
            ${status.startsWith("✅") ? "text-green-400" : "text-pink-400"}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;

/* Add these to your global CSS (e.g., index.css) for the background animation: */
