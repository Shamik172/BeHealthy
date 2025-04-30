// src/components/meditation/FunFacts.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const facts = [
  "🧘 Meditation can reduce stress and improve focus.",
  "🧠 Studies show that meditation can improve your mental well-being.",
  "📜 The earliest recorded meditation practices date back to 1500 BCE.",
  "😴 Meditation can improve sleep quality and reduce anxiety.",
  "⏳ Practicing meditation for just 10 minutes a day can bring profound benefits."
];

const FunFacts = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % facts.length);
  };

  return (
    <div className="w-full bg-purple-50 border border-purple-200 p-6 rounded-xl shadow-lg mt-6 transition-all duration-300">
      <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">
        🎉 Fun Fact About Meditation
      </h3>

      <AnimatePresence mode="wait">
        <motion.p
          key={facts[index]}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg text-purple-700 italic px-4 mb-6"
        >
          {facts[index]}
        </motion.p>
      </AnimatePresence>

      <div className="text-center">
        <button
          onClick={handleNext}
          className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition"
        >
          🔁 Next Fact
        </button>
      </div>
    </div>
  );
};

export default FunFacts;
