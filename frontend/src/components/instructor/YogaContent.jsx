import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const YogaContent = ({ isSignup, toggle }) => {
  const [isLogin, setIsLogin] = useState(isSignup); // Initialize isLogin based on isSignup

  const funFacts = [
    "🧘‍♂️ Yoga poses are called ‘asanas’ with over 84 classic ones!",
    "😂 No flexibility needed, just a willingness to untangle later!",
    "🍕 Yoga isn't wrong unless you're holding pizza in Downward Dog.",
    "🎉 Yoga reduces stress, anxiety, and social gathering excuses!",
    "🌈 Yoga is a work-in, not just a workout!"
  ];
  const yogaPoses = [
    { name: 'Downward Dog', image: 'https://via.placeholder.com/200x150?text=Downward+Dog' },
    { name: 'Tree Pose', image: 'https://via.placeholder.com/200x150?text=Tree+Pose' },
    { name: 'Warrior II', image: 'https://via.placeholder.com/200x150?text=Warrior+II' },
  ];
  const [currentPose, setCurrentPose] = useState(0);
  const fact = funFacts[Math.floor(Math.random() * funFacts.length)];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPose((prev) => (prev + 1) % yogaPoses.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [yogaPoses.length]);

  // Sync isLogin with isSignup when isSignup changes
  useEffect(() => {
    setIsLogin(!isSignup);
  }, [isSignup]);

  const handleToggle = () => {
    setIsLogin((prev) => !prev); // Toggle internal state
    toggle(); // Call parent's toggle function
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-200 via-pink-100 to-red-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-purple-800 mb-4 font-poppins">Fun Yoga Fact</h2>
      <p className="text-gray-700 text-base sm:text-lg italic mb-4 sm:mb-6 font-poppins">{fact}</p>
      {/* <div className="mb-4 sm:mb-6">
        <motion.img
          key={yogaPoses[currentPose].name}
          src={yogaPoses[currentPose].image}
          alt={yogaPoses[currentPose].name}
          className="w-40 sm:w-48 h-32 sm:h-36 object-cover rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <p className="text-purple-700 font-semibold mt-2 font-poppins text-sm sm:text-base">{yogaPoses[currentPose].name}</p>
      </div> */}
      <motion.button
        onClick={handleToggle}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full font-medium transition shadow-md hover:shadow-lg relative overflow-hidden group font-poppins text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login "} 
        
      </motion.button>
    </motion.div>
  );
};

export default YogaContent;