import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FunFacts = () => {
  const facts = [
    "🧘‍♀️ Yoga improves flexibility, strength, and mental clarity!",
    "🌿 Practicing yoga can reduce cortisol levels, easing stress.",
    "🕉️ The word 'yoga' means 'union' in Sanskrit, uniting body and mind.",
    "🐶 Downward Dog is inspired by how dogs stretch naturally!",
    "🌅 Sun Salutations are a great way to start your day with energy."
  ];
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [facts.length]);

  return (
    <motion.div
      className="w-full max-w-2xl p-4 sm:p-6 bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl mt-4 sm:mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl sm:text-2xl font-semibold text-purple-700 text-center mb-2 sm:mb-4 font-poppins">
        Did You Know?
      </h3>
      <motion.p
        key={facts[currentFact]}
        className="text-gray-700 text-sm sm:text-base text-center font-poppins"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {facts[currentFact]}
      </motion.p>
    </motion.div>
  );
};

export default FunFacts;