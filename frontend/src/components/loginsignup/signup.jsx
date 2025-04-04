import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup clicked!", { name, email, password });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-teal-400 to-green-600">
      {/* Floating Yoga-Themed Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-20 w-24 h-24 bg-white/30 backdrop-blur-md rounded-full shadow-lg"
      ></motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-20 w-32 h-32 bg-white/20 backdrop-blur-md rounded-full shadow-lg"
      ></motion.div>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center relative overflow-hidden"
      >
        {/* Decorative Floating Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute w-20 h-20 bg-teal-300 opacity-20 rounded-full -top-5 -right-5"
        ></motion.div>

        <h2 className="text-3xl font-bold text-green-800 mb-6">Yoga Signup</h2>
        <p className="text-gray-500 mb-4">Join us and find your peace 🧘</p>

        {/* Form Fields */}
        <form onSubmit={handleSignup} className="space-y-4">
          <motion.input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
          />

          {/* Animated Signup Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-green-700 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
