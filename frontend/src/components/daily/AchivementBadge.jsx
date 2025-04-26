import { useTasks } from "../../context/TasksContext";

const AchievementBadge = () => {
  const { streak } = useTasks();

  let badge = "🎯 Beginner";
  if (streak >= 30) badge = "🏆 Pro";
  else if (streak >= 7) badge = "🥇 Consistent";

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-yellow-200 p-3 rounded-xl shadow-md">
        <p className="font-bold text-lg">{badge}</p>
        <p className="text-sm">Streak: {streak} Days</p>
      </div>
    </div>
  );
};

export default AchievementBadge;
