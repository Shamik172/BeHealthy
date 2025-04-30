import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

const dummyTasks = [
  { id: 1, title: "Morning Yoga Flow", duration: "20 mins", focus: "Relaxation", completed: false },
  { id: 2, title: "Breathing Exercise", duration: "10 mins", focus: "Mindfulness", completed: false },
  { id: 3, title: "Evening Stretch", duration: "15 mins", focus: "Flexibility", completed: false },
];

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [streak, setStreak] = useState(5); // Sample initial streak
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    // Simulate fetch
    setTasks(dummyTasks);

    const now = dayjs();
    if (now.hour() >= 20) {
      toast.warning("Don't forget to complete your tasks today! 🧘‍♂️");
    }
  }, []);

  useEffect(() => {
    const allDone = tasks.length > 0 && tasks.every(task => task.completed);
    if (allDone) {
      setShowCongrats(true);
      setStreak(prev => prev + 1);
    }
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, toggleTask, streak, showCongrats, setShowCongrats }}>
      {children}
    </TasksContext.Provider>
  );
};
