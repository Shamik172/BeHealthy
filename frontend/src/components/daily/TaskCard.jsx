import { motion } from "framer-motion";
import { useTasks } from "../../context/TasksContext";

const TaskCard = ({ task }) => {
  const { toggleTask } = useTasks();

  return (
    <motion.div 
      className={`p-4 rounded-xl shadow-md mb-4 ${task.completed ? "bg-green-200" : "bg-white"}`}
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-xl font-bold mb-2">{task.title}</h3>
      <p>🕒 {task.duration} | ✨ {task.focus}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex-1 h-2 bg-gray-200 rounded-full">
          <div
            className={`h-2 rounded-full ${task.completed ? "bg-green-500" : "bg-yellow-400"}`}
            style={{ width: task.completed ? "100%" : "50%" }}
          ></div>
        </div>
        <button
          className="ml-4 text-sm px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? "Undo 🔄" : "Mark Done ✅"}
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
