import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Rnd } from 'react-rnd';
import {
  FaBackward, FaForward, FaPause, FaPlay, FaRandom,
  FaRedo, FaVolumeMute, FaVolumeUp, FaSun, FaMoon, FaTimes
} from 'react-icons/fa';
import axios from 'axios';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [tracks, setTracks] = useState([]);
  const controls = useAnimation();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get('http://localhost:5050/music/get-all');
        setTracks(response.data.data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };
    fetchTracks();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };
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

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play().catch((err) => {
          console.error(err);
          setIsPlaying(false);
        });
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => setIsPlaying((prev) => !prev);

  const handleNext = () => {
    const nextIndex = isShuffling
      ? Math.floor(Math.random() * tracks.length)
      : (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleProgressChange = (e) => {
    const value = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = (audioRef.current.duration * value) / 100;
    }
    setProgress(value);
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const toggleRepeat = () => {
    audioRef.current.loop = !isRepeating;
    setIsRepeating((prev) => !prev);
  };

  const toggleShuffle = () => setIsShuffling((prev) => !prev);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const closePlayer = () => setIsVisible(false);

  return (
    isVisible && (
      <Rnd
        default={{
          x: window.innerWidth - 380,
          y: window.innerHeight - 240,
          width: 380,
          height: 240,
        }}
        minWidth={300}
        minHeight={200}
        bounds="window"
        dragHandleClassName="handle"
        className="z-[1000] relative"
      >
        <motion.div
          animate={controls}
          className={`rounded-2xl shadow-xl text-white p-4 w-full h-full flex flex-col justify-between overflow-hidden font-mono border-2 border-white/20 backdrop-blur-md relative ${isDarkMode ? 'bg-orange-900/70' : 'bg-orange-200/80 text-black'
            }`}
        >
          {/* Close Button */}
          <button
            onClick={closePlayer}
            className="absolute top-2 right-2 text-xl z-10 hover:text-red-600"
            title="Close Player"
          >
            <FaTimes />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="absolute top-2 left-2 text-xl z-10 hover:scale-110 transition-transform"
            title="Toggle Theme"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Background Video */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover opacity-10"
            >
              <source src="your-background-video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Audio */}
          {tracks.length > 0 && (
            <audio ref={audioRef} src={tracks[currentTrackIndex].url} />
          )}

          <div className="handle cursor-move text-center font-bold text-lg mb-2 tracking-wider">
            🎵 {tracks[currentTrackIndex]?.title || 'Loading...'}
          </div>

          <div className="flex items-center justify-center gap-4 text-2xl">
            <button onClick={handlePrev} title="Previous"><FaBackward /></button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayPause}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-white text-orange-800' : 'bg-orange-300 text-black'
                }`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </motion.button>
            <button onClick={handleNext} title="Next"><FaForward /></button>
          </div>

          <div className="mt-2 w-full h-2 bg-orange-300/40 rounded-full relative">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full absolute top-0 left-0 h-2 opacity-0 cursor-pointer"
            />
            <div
              style={{ width: `${progress}%` }}
              className="h-2 bg-orange-600 rounded-full"
            ></div>
          </div>

          {/* Extra Controls */}
          <div className="flex justify-between items-center text-xl mt-2">
            <button onClick={toggleMute} title="Mute/Unmute">
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <button onClick={toggleRepeat} title="Toggle Repeat">
              <FaRedo className={isRepeating ? 'text-green-400' : ''} />
            </button>
            <button onClick={toggleShuffle} title="Toggle Shuffle">
              <FaRandom className={isShuffling ? 'text-yellow-300' : ''} />
            </button>
          </div>
        </motion.div>
      </Rnd>

    )
  );
};

export default MusicPlayer;
