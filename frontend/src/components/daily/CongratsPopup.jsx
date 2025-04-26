import { motion } from "framer-motion";
import { useTasks } from "../../context/TasksContext";

const CongratsPopup = () => {
  const { showCongrats, setShowCongrats } = useTasks();

  if (!showCongrats) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
        <p className="mb-6">You've completed all your tasks today!</p>
        <button
          onClick={() => setShowCongrats(false)}
          className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700"
        >
          Awesome! 🎯
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CongratsPopup;
