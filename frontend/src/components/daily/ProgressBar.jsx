import { useTasks } from "../../context/TasksContext";


const ProgressBar = () => {
  const { tasks } = useTasks();
  const completedCount = tasks.filter(t => t.completed).length;
  const percentage = tasks.length ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="w-full my-6">
      <p className="text-center font-semibold mb-2">{Math.round(percentage)}% Completed</p>
      <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
