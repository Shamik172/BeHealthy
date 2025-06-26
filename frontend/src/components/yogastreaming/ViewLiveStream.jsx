import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("https://yoga-healix.onrender.com");

const ViewLiveStream = () => {
  const videoRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);
  const queueRef = useRef([]);
  const [streamingActive, setStreamingActive] = useState(false);

  useEffect(() => {
    const mediaSource = new MediaSource();
    mediaSourceRef.current = mediaSource;
    videoRef.current.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("sourceopen", () => {
      const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8, opus"');
      sourceBufferRef.current = sourceBuffer;

      sourceBuffer.addEventListener("updateend", () => {
        if (queueRef.current.length > 0 && !sourceBuffer.updating) {
          const nextChunk = queueRef.current.shift();
          sourceBuffer.appendBuffer(nextChunk);
        }
      });

      socket.on("receive-stream", (chunk) => {
        setStreamingActive(true);
        const uint8Buffer = new Uint8Array(chunk);
        if (!sourceBuffer.updating) {
          sourceBuffer.appendBuffer(uint8Buffer);
        } else {
          queueRef.current.push(uint8Buffer);
        }
      });

      socket.on("end-stream", () => {
        setStreamingActive(false);
      });
    });

    return () => {
      socket.off("receive-stream");
      socket.off("end-stream");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-lime-50 to-emerald-100 p-6">
      {/* Info Box - Always Visible */}
        <div className="w-full bg-emerald-100 p-6 rounded-lg mb-6 text-emerald-700 shadow-md">
        <div className="text-center">
            <p className="text-lg font-semibold mb-2">
            You may visit the following page to find all previously uploaded videos.
            </p>
            <Link
            to="/yogaupload"
            className="inline-block px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition shadow"
            >
            View Past Yoga Sessions
            </Link>
        </div>
        </div>


      {/* Enhanced Heading */}
      <h1 className="text-4xl font-extrabold text-emerald-800 mb-6 text-center tracking-tight drop-shadow-lg">
        💪 BeHealthy <span className="text-lime-600">Live Yoga Section</span>
      </h1>

      {/* Video Player */}
      <div className="w-full max-w-4xl h-[480px] bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-300">
        <video
          ref={videoRef}
          controls
          autoPlay
          playsInline
          className={`w-full h-full object-cover transition-all duration-500 ${
            streamingActive ? "bg-transparent" : "bg-black"
          }`}
        />
      </div>

      <p className="mt-6 text-emerald-600 text-sm italic">
        Stream peacefully, breathe mindfully 🌿
      </p>
    </div>
  );
};

export default ViewLiveStream;
