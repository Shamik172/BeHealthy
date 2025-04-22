import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
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

  const controls = useAnimation();

  useEffect(() => {
    if (isPlaying) {
      controls.start({
        backgroundColor: [
          "#15803d", // green-700
          "#166534", // slightly darker
          "#14532d", // green-800
          "#15803d", // back to green-700
        ],
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    } else {
      controls.start({
        backgroundColor: "#15803d", // static green-700
        transition: { duration: 1 },
      });
    }
  }, [isPlaying, controls]);

  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentTrackIndex]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (isShuffling) {
      setCurrentTrackIndex(Math.floor(Math.random() * tracks.length));
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleProgressChange = (e) => {
    const value = e.target.value;
    const audio = audioRef.current;
    audio.currentTime = (audio.duration * value) / 100;
    setProgress(value);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [currentTrackIndex]);

  const handleRepeatToggle = () => {
    setIsRepeating(!isRepeating);
    audioRef.current.loop = !audioRef.current.loop;
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleShuffleToggle = () => {
    setIsShuffling(!isShuffling);
  };

  return (
    <motion.div
      animate={controls}
      className="w-full fixed bottom-0 z-50 text-white px-4 py-3 shadow-xl"
    >
      <audio ref={audioRef} src={tracks[currentTrackIndex].file} />

      <div className="flex flex-col w-full items-center">
        {/* Controls Row */}
        <div className="w-full flex justify-between items-center gap-4 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3 min-w-[150px]">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-700 font-bold">
              {tracks[currentTrackIndex].name[0]}
            </div>
            <p className="text-sm font-semibold">{tracks[currentTrackIndex].name}</p>
          </div>

          <div className="flex items-center gap-5">
            <button onClick={handlePrev} className="hover:text-yellow-300 text-lg">⏮️</button>
            <button
              onClick={handlePlayPause}
              className="bg-white text-green-700 px-4 py-1 rounded-full shadow hover:bg-yellow-300 hover:text-green-800"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button onClick={handleNext} className="hover:text-yellow-300 text-lg">⏭️</button>
          </div>

          <div className="flex items-center gap-2 min-w-[100px]">
            <span className="text-sm">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="accent-yellow-300 w-24"
            />
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={handleRepeatToggle}
              className={`text-lg ${isRepeating ? 'text-yellow-300' : 'text-white'}`}
            >
              🔁
            </button>
            <button
              onClick={handleMuteToggle}
              className={`text-lg ${isMuted ? 'text-yellow-300' : 'text-white'}`}
            >
              🔇
            </button>
            <button
              onClick={handleShuffleToggle}
              className={`text-lg ${isShuffling ? 'text-yellow-300' : 'text-white'}`}
            >
              🔀
            </button>
          </div>
        </div>

        {/* Wavy Progress SVG */}
        <div className="w-full mt-2 h-10 relative overflow-hidden">
          <svg
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            className="w-full h-full absolute z-0"
          >
            <path
              d={`M0,20 Q250,0 500,20 T1000,20`}
              stroke="#facc15"
              strokeWidth="4"
              fill="none"
              style={{
                strokeDasharray: '1000',
                strokeDashoffset: `${1000 - (progress / 100) * 1000}`,
                transition: 'stroke-dashoffset 0.1s linear',
              }}
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full bg-transparent z-10 flex items-center justify-center pointer-events-none">
            <p className="text-xs text-white">{Math.floor(progress)}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
