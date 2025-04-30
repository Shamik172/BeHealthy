// src/components/meditation/QuoteDisplay.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "🧘‍♂️ Meditation is the key to a peaceful mind.",
  "🌿 Calm your mind and the rest will follow.",
  "🕊️ Peace comes from within. Do not seek it without.",
  "🔇 The quieter you become, the more you can hear.",
  "🌌 Meditation: A journey of the mind to a state of peace."
];

const QuoteDisplay = () => {
  const [quote, setQuote] = useState("");

  const getRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="w-full bg-blue-50 border border-blue-200 px-6 py-8 rounded-xl shadow-lg transition-all duration-300">
      <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
        🌟 Today's Meditation Quote
      </h3>

      <AnimatePresence mode="wait">
        <motion.p
          key={quote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center text-xl text-blue-700 italic mb-6"
        >
          {quote}
        </motion.p>
      </AnimatePresence>

      <div className="text-center">
        <button
          onClick={getRandomQuote}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition"
        >
          🔄 Refresh Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteDisplay;
