import TaskCard from "./TaskCard";
import { useTasks } from "../../context/TasksContext";

const DailyTasksList = () => {
  const { tasks } = useTasks();

  return (
    <div className="p-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default DailyTasksList;
