import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaClock, FaStopwatch, FaHourglassHalf, FaBrain } from "react-icons/fa";

export default function Watch() {
  const [mode, setMode] = useState("clock");
  const [time, setTime] = useState(new Date());
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [pomodoroTime, setPomodoroTime] = useState(focusTime);
  const [isFocus, setIsFocus] = useState(true);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);

  const bgControls = useAnimation();

  const updateColor = () => {
    let color;
    switch (mode) {
      case "stopwatch":
        color = "linear-gradient(to right, #B2EBF2, #03A9F4)";
        break;
      case "countdown":
        color = "linear-gradient(to right, #FFECB3, #FF9800)";
        break;
      case "pomodoro":
        color = isFocus ? "linear-gradient(to right, #FFCDD2, #F44336)" : "linear-gradient(to right, #C8E6C9, #4CAF50)";
        break;
      default:
        color = "linear-gradient(to right, #E0F7FA, #26C6DA)";
    }
    bgControls.start({ background: color });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (mode === "clock") setTime(new Date());

      if (mode === "stopwatch" && stopwatchRunning)
        setStopwatchTime((prev) => prev + 1);

      if (mode === "countdown" && countdownRunning)
        setCountdownTime((prev) => {
          if (prev <= 0) {
            setCountdownRunning(false);
            return 0;
          }
          return prev - 1;
        });

      if (mode === "pomodoro" && pomodoroRunning)
        setPomodoroTime((prev) => {
          if (prev <= 0) {
            setIsFocus((prevFocus) => {
              const nextFocus = !prevFocus;
              setPomodoroTime(nextFocus ? focusTime : breakTime);
              return nextFocus;
            });
            return 0;
          }
          return prev - 1;
        });
    }, 1000);

    updateColor();

    return () => clearInterval(interval);
  }, [mode, stopwatchRunning, countdownRunning, pomodoroRunning, isFocus, focusTime, breakTime]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const getDayAndTimeZone = () => {
    const options = {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
      hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short"
    };
    return time.toLocaleString("en-US", options);
  };

  return (
    <motion.div
      animate={bgControls}
      className="flex flex-col items-center justify-center p-4"
      style={{
        width: "320px",
        height: "400px",
        maxWidth: "320px",
        maxHeight: "400px",
        borderRadius: "1.5rem",
        overflow: "hidden",
      }}
    >
      <div className="bg-transparent shadow-xl rounded-3xl p-4 w-full h-full flex flex-col justify-between">
        <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800 capitalize">
          {mode}
        </h1>

        <div className="flex justify-between gap-2 mb-4">
          {[{ icon: <FaClock />, name: "clock" }, { icon: <FaStopwatch />, name: "stopwatch" }, { icon: <FaHourglassHalf />, name: "countdown" }, { icon: <FaBrain />, name: "pomodoro" }].map(({ icon, name }) => (
            <button
              key={name}
              onClick={() => setMode(name)}
              className={`text-xl p-2 rounded-full shadow-md transition-transform duration-200 hover:scale-110 ${mode === name ? "bg-gradient-to-r from-green-400 to-teal-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {icon}
            </button>
          ))}
        </div>

        <div className="text-center text-4xl font-mono mb-2">
          {mode === "clock" && (
            <>
              {time.toLocaleTimeString()}
              <p className="text-xs mt-1 text-gray-600">{getDayAndTimeZone()}</p>
            </>
          )}
          {mode === "stopwatch" && formatTime(stopwatchTime)}
          {mode === "countdown" && formatTime(countdownTime)}
          {mode === "pomodoro" && formatTime(pomodoroTime)}
        </div>

        {(mode === "countdown" || mode === "pomodoro") && (
          <div className="flex flex-col gap-1 mb-2 text-sm">
            {mode === "countdown" && (
              <input
                type="number"
                value={countdownTime}
                onChange={(e) => setCountdownTime(Number(e.target.value))}
                placeholder="Countdown (seconds)"
                className="text-center p-2 rounded-md border w-full"
              />
            )}
            {mode === "pomodoro" && (
              <>
                <input
                  type="number"
                  value={focusTime}
                  onChange={(e) => setFocusTime(Number(e.target.value))}
                  placeholder="Focus time (seconds)"
                  className="text-center p-2 rounded-md border w-full"
                />
                <input
                  type="number"
                  value={breakTime}
                  onChange={(e) => setBreakTime(Number(e.target.value))}
                  placeholder="Break time (seconds)"
                  className="text-center p-2 rounded-md border w-full"
                />
              </>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4 text-sm">
          {mode === "stopwatch" && (
            <>
              <button
                onClick={() => setStopwatchRunning((prev) => !prev)}
                className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
              >
                {stopwatchRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={() => {
                  setStopwatchTime(0);
                  setStopwatchRunning(false);
                }}
                className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Reset
              </button>
            </>
          )}
          {mode === "countdown" && (
            <>
              <button
                onClick={() => setCountdownRunning((prev) => !prev)}
                className="px-3 py-1 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
              >
                {countdownRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={() => {
                  setCountdownRunning(false);
                  setCountdownTime(0);
                }}
                className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Reset
              </button>
            </>
          )}
          {mode === "pomodoro" && (
            <>
              <button
                onClick={() => setPomodoroRunning((prev) => !prev)}
                className="px-3 py-1 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
              >
                {pomodoroRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={() => {
                  setPomodoroRunning(false);
                  setIsFocus(true);
                  setPomodoroTime(focusTime);
                }}
                className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
