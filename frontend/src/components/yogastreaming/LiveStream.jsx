import React, { useRef, useState } from "react";
import { io } from "socket.io-client";
import { FaPlay, FaStop } from "react-icons/fa";

const socket = io("http://localhost:5050");

const LiveStream = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;

    const chunks = [];
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = async (e) => {
      chunks.push(e.data);
      const buffer = await e.data.arrayBuffer();
      socket.emit("stream-chunk", buffer);
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("file", blob, "livestream.webm");

      await fetch("http://localhost:5050/live-stream/upload", {
        method: "POST",
        body: formData,
      });
    };

    mediaRecorderRef.current.start(1000);
    setIsStreaming(true);
  };

  const stopStream = () => {
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setIsStreaming(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-green-100 p-6">
      <h1 className="text-3xl font-bold text-teal-800 mb-4">Yoga Live Session</h1>
      
      <div className="relative w-full max-w-4xl rounded-xl overflow-hidden shadow-xl border border-green-200 bg-white">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-4">
          {!isStreaming ? (
            <button
              onClick={startStream}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
            >
              <FaPlay /> Start Live
            </button>
          ) : (
            <button
              onClick={stopStream}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
            >
              <FaStop /> Stop Live
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-green-700 text-sm italic">
        Invite participants to join your calming live yoga session 🌿
      </p>
    </div>
  );
};

export default LiveStream;
