import { useEffect, useState } from "react";
import { Button } from "./Button";

export const YogaPoseCard = ({
  pose,
  onComplete,
  isCompleted,
  darkMode,
  startSession,
}) => {
  const [completed, setCompleted] = useState(isCompleted);
  const [buttonText, setButtonText] = useState("Complete");

  useEffect(() => {
    setCompleted(isCompleted);
    setButtonText(isCompleted ? "Completed" : "Complete");
  }, [isCompleted]);

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      setButtonText("Completed");
      onComplete();
    }
  };

  if (!pose)
    return (
      <div className="text-center py-4">No yoga pose scheduled for today</div>
    );

  const cardBgColorClass = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-700";
  const tagColorClass = darkMode
    ? "text-gray-400 bg-gray-700"
    : "text-gray-700 bg-green-100";

  return (
    <div
      className={`rounded-xl shadow-md border overflow-hidden ${cardBgColorClass}`}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {pose?.pose || "Daily Yoga Practice"}
        </div>
        <p className="text-base">
          {pose?.instructions || "Start your practice..."}
        </p>
      </div>
      <div className="px-6 py-4 flex items-center justify-between">
        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${tagColorClass}`}
        >
          {pose?.duration || "15 mins"}
        </span>
        <Button onClick={handleComplete} disabled={completed} color="green">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
