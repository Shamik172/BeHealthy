import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Login from './Login';
import YogaContent from './YogaContent';
import FunFacts from './FunFacts';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(false);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    console.log(isSoundOn ? 'Pausing ambient music' : 'Playing ambient music');
  };

  const toggleForm = () => setIsSignup(!isSignup);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:py-8 relative overflow-hidden">
      {/* Green Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-200 to-green-300"
        animate={{
          background: [
            'linear-gradient(135deg, #d1fae5, #bbf7d0, #a7f3d0)',
            'linear-gradient(135deg, #bbf7d0, #a7f3d0, #d1fae5)',
            'linear-gradient(135deg, #a7f3d0, #d1fae5, #bbf7d0)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Soft Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-6 sm:w-8 h-6 sm:h-8 bg-green-400 rounded-full opacity-20"
          animate={{ y: [0, -100], opacity: [0.2, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0 }}
          style={{ left: '10%', top: '80%' }}
        />
        <motion.div
          className="absolute w-8 sm:w-12 h-8 sm:h-12 bg-lime-300 rounded-full opacity-20"
          animate={{ y: [0, -150], opacity: [0.2, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          style={{ left: '30%', top: '60%' }}
        />
        <motion.div
          className="absolute w-6 sm:w-10 h-6 sm:h-10 bg-emerald-300 rounded-full opacity-20"
          animate={{ y: [0, -120], opacity: [0.2, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          style={{ left: '70%', top: '70%' }}
        />
      </div>

      {/* Welcome Modal */}
      {showModal && (
        <motion.div
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 max-w-md text-center"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 font-poppins">
              Welcome to Your Yoga Journey!
            </h2>
            <p className="text-gray-600 mb-6 font-poppins text-sm sm:text-base">
              Discover peace, balance, and strength with our yoga community. Join us today!
            </p>
            <motion.button
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full font-medium transition shadow-md hover:shadow-lg font-poppins text-sm sm:text-base"
              onClick={() => setShowModal(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Auth Form Container */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden z-10">
        <motion.div
          className="w-full md:w-1/2 h-[50vh] md:h-[70vh] flex items-center justify-center"
          animate={{ x: isSignup ? '100%' : 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <Login isSignup={isSignup} toggleForm={toggleForm} />
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 h-[50vh] md:h-[70vh] flex items-center justify-center"
          animate={{ x: isSignup ? '-100%' : 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <YogaContent toggle={toggleForm} />
        </motion.div>
      </div>

      {/* Fun Facts */}
      <FunFacts />
    </div>
  );
};

export default AuthPage;
