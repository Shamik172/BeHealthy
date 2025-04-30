import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const honestyQuotes = [
  {
    quote: "Honesty is the first chapter in the book of wisdom.",
    author: "Thomas Jefferson"
  },
  {
    quote: "No legacy is so rich as honesty.",
    author: "William Shakespeare"
  },
  {
    quote: "Honesty and transparency make you vulnerable. Be honest and transparent anyway.",
    author: "Mother Teresa"
  },
  {
    quote: "Integrity is telling myself the truth. And honesty is telling the truth to other people.",
    author: "Spencer Johnson"
  },
  {
    quote: "Honesty is the fastest way to prevent a mistake from turning into a failure.",
    author: "James Altucher"
  }
];

export default function HonestyQuotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % honestyQuotes.length);
    }, 7000); // change every 7 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-8 text-center border border-green-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl font-semibold text-green-700 italic mb-2">“{honestyQuotes[index].quote}”</p>
          <p className="text-sm text-gray-600 font-medium">– {honestyQuotes[index].author}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
