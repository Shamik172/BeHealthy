import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import yoga1 from "../assets/yoga1.jpg";
import yoga2 from "../assets/yoga2.jpg";
import yoga3 from "../assets/yoga3.jpg";
import { useNavigate } from "react-router-dom";

const images = [yoga1, yoga2, yoga3];

function Hero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden z-40">
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt="Yoga"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center z-10">
        <h1 className="text-4xl font-bold">Embrace Your Inner Peace</h1>
        <p className="mt-2 text-lg">Join us on a journey to mindfulness and wellness</p>
        <motion.button
          className="mt-5 bg-green-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-700 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('./auth')}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
}

export default Hero;
