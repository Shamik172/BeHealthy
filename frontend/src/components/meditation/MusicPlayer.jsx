// src/components/music/MusicPlayer.jsx
import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from "react-icons/fa";

const MusicPlayer = ({ musicTracks = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const currentTrack = musicTracks[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % musicTracks.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const playPrev = () => {
    const prevIndex = (currentIndex - 1 + musicTracks.length) % musicTracks.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleTrackSelect = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🎵 Meditation Music Player</h2>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="text-lg font-semibold text-gray-800">{currentTrack?.title}</p>
        <p className="text-sm text-gray-500 italic">{currentTrack?.type}</p>
        <audio
          ref={audioRef}
          src={currentTrack?.url}
          autoPlay={isPlaying}
          onEnded={playNext}
        />
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={playPrev} className="text-blue-600 text-xl hover:text-blue-800">
              <FaStepBackward />
            </button>
            <button
              onClick={togglePlay}
              className="text-blue-600 text-3xl hover:text-blue-800"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={playNext} className="text-blue-600 text-xl hover:text-blue-800">
              <FaStepForward />
            </button>
          </div>
          <div className="w-full sm:w-1/2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              readOnly
              className="w-full accent-blue-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaVolumeUp className="text-blue-600" />
            <input type="range" min="0" max="1" step="0.01" onChange={handleVolumeChange} className="accent-blue-600" />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {musicTracks.map((track, index) => (
          <button
            key={track.title}
            onClick={() => handleTrackSelect(index)}
            className={`text-left px-4 py-2 rounded transition-all ${
              currentIndex === index
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-200 hover:bg-blue-100 text-gray-800"
            }`}
          >
            <p>{track.title}</p>
            <p className="text-xs italic text-gray-600">{track.type}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
