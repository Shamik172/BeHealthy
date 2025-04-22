import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Rnd } from 'react-rnd';
import {
  FaBackward, FaForward, FaPause, FaPlay, FaRandom,
  FaRedo, FaVolumeMute, FaVolumeUp, FaSun, FaMoon, FaTimes
} from 'react-icons/fa';
import song1 from './song1.mp3';
import song2 from './song2.mp3';
import song3 from './song3.mp3';

const tracks = [
  { name: 'Track 1', file: song1 },
  { name: 'Track 2', file: song2 },
  { name: 'Track 3', file: song3 },
];

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme state
  const [isVisible, setIsVisible] = useState(true); // Visibility state for the player
  const controls = useAnimation();

  // Ensuring volume/mute updates correctly
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Update progress bar as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    // Adding event listeners for timeupdate and ended events
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', handleNext);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', handleNext);
      }
    };
  }, [currentTrackIndex]);

  // Play/pause logic with state update
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  // Handle Play/Pause button click
  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev); // Toggle play/pause
  };

  // Handle next track (shuffle or sequential)
  const handleNext = () => {
    const next = isShuffling
      ? Math.floor(Math.random() * tracks.length)
      : (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(next);
    setIsPlaying(true);
  };

  // Handle previous track
  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  // Progress change
  const handleProgressChange = (e) => {
    const value = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = (audioRef.current.duration * value) / 100;
    }
    setProgress(value);
  };

  // Toggle mute state
  const toggleMute = () => setIsMuted((prev) => !prev);
  
  // Toggle repeat state
  const toggleRepeat = () => {
    audioRef.current.loop = !isRepeating;
    setIsRepeating((prev) => !prev);
  };
  
  // Toggle shuffle state
  const toggleShuffle = () => setIsShuffling((prev) => !prev);

  // Toggle dark mode
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Close player visibility
  const closePlayer = () => setIsVisible(false);

  return (
    isVisible && (
      <Rnd
        default={{
          x: window.innerWidth - 380, // Start at bottom-right corner
          y: window.innerHeight - 240,
          width: 380,
          height: 240,
        }}
        minWidth={300}
        minHeight={200}
        bounds="window"
        dragHandleClassName="handle"
        className="z-[1000] fixed"
      >
        <motion.div
          animate={controls}
          className={`rounded-2xl shadow-xl text-white p-4 w-full h-full flex flex-col justify-between overflow-hidden font-mono border-2 border-white/20 backdrop-blur-md ${isDarkMode ? 'bg-black/70' : 'bg-white/50'}`}
        >
          {/* Background Video */}
          <div className="absolute top-0 left-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover opacity-20"
            >
              <source src="your-background-video.mp4" type="video/mp4" />
            </video>
          </div>

          <audio ref={audioRef} src={tracks[currentTrackIndex].file} />

          <div className="handle cursor-move text-center font-bold text-lg mb-2 tracking-wider text-purple-100">
            🎵 {tracks[currentTrackIndex].name}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button onClick={handlePrev}><FaBackward /></button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayPause}
              className="bg-white text-purple-800 p-2 rounded-full"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </motion.button>
            <button onClick={handleNext}><FaForward /></button>
          </div>

          <div className="mt-2 w-full h-2 bg-purple-200/30 rounded-full relative">
            <div
              style={{ width: `${progress}%` }}
              className="absolute h-2 bg-yellow-400 rounded-full top-0 left-0"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="flex justify-between mt-2 items-center">
            <div className="flex items-center gap-2">
              {isMuted ? (
                <FaVolumeMute onClick={toggleMute} className="cursor-pointer" />
              ) : (
                <FaVolumeUp onClick={toggleMute} className="cursor-pointer" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="accent-yellow-300"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={toggleRepeat} className={isRepeating ? "text-yellow-300" : ""}><FaRedo /></button>
              <button onClick={toggleShuffle} className={isShuffling ? "text-yellow-300" : ""}><FaRandom /></button>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="absolute top-2 right-2 text-xl text-purple-100"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Close Button */}
          <button
            onClick={closePlayer}
            className="absolute top-2 left-2 text-xl text-white"
          >
            <FaTimes />
          </button>
        </motion.div>
      </Rnd>
    )
  );
};

export default MusicPlayer;
