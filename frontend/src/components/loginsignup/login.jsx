import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { handleSuccess, handleError } from "../../utils"; 
import {ToastContainer} from 'react-toastify' ;

function Login() {

  const navigate = useNavigate(); // Initialize navigation

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
};

const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
        return handleError('Email and password are required');
        // console.log("error :-> email and password are required");
    }

    try {
        const url = "http://localhost:5050/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });

        const text = await response.text(); // Read response as text first
        console.log("result",text)

        let result;
        try {
            result = JSON.parse(text); // Try to parse JSON
        } catch (error) {
          console.log("error" , error);
            return handleError("Invalid server response");
        }
        const { success, message, jwtToken, name, error } = result;

        if (success) {
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('name', name);
            setTimeout(() => {
                navigate('/loginhome');
            }, 1000);
        } else if (error) {
            const details = error?.details?.[0]?.message || "Login failed";
            handleError(details);
            console.log("error", error);
        }
        else{
          handleError("username or password is incorrect or both are incorrect") ;
        }

    } catch (err) {
        console.error("Login Error:", err);
        handleError("Something went wrong. Please try again.");
    }
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

      {/* Login Card */}
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

        <h2 className="text-3xl font-bold text-green-800 mb-6">Yoga-Verse Login</h2>
        <p className="text-gray-500 mb-4">Find your inner peace 🌿</p>

        {/* Form Fields */}
        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105"
            value={loginInfo.email}
            onChange={handleChange}
            name="email"
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105"
            value={loginInfo.password}
            onChange={handleChange}
            name="password"
            required
            whileFocus={{ scale: 1.05 }}
          />

          {/* Animated Login Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-700 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
      <ToastContainer /> 
    </div>
  );
}

export default Login;
