import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imageData from "../assets/images.json";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";

function Hero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { userData, instructorData } = useContext(AppContent);

  const isUserLoggedIn = userData && userData._id;
  const isInstructorLoggedIn = instructorData && instructorData._id;
  const isLoggedIn = isUserLoggedIn || isInstructorLoggedIn;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imageData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden z-40">
      <AnimatePresence mode="wait">
        <motion.img
          key={imageData[index].url}
          src={imageData[index].url}
          alt={imageData[index].title}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center z-10">
        <h1 className="text-4xl font-bold">Embrace Your Inner Peace</h1>
        <p className="mt-2 text-lg">Join us on a journey to mindfulness and wellness</p>

        {/* {!isLoggedIn && (
          <motion.button
            className="mt-5 bg-green-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-700 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('./auth')}
          >
            Get Started
          </motion.button>
        )} */}
      </div>
    </div>
  );
}

export default Hero;
