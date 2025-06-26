import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ isSignup, toggleForm }) => {
  // axios.defaults.withCredentials = true;
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setProgress(0);
  }, [isSignup]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        console.log("Sending data from login Page SignUp : " , {name , email , password})
        const { data } = await axios.post(
          backendUrl + '/auth/register',
          { name, email, password },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        console.log("Result From Backend ",data);
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/profile');
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
  
      } else {

        console.log("Sending data from login Page Login : " , {email , password})
        const { data } = await axios.post(
          backendUrl + '/auth/login',
          { email, password },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        console.log("Result From Backend ",data);
        if (data.success) {
          setIsLoggedin(true);
          console.log("data after login : " , data);
          getUserData();
          navigate('/profile');
          toast.success(data.message);
        } else {
          console.log("Error in login");
          toast.error(data.message);
        }
      }
  
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.response?.data?.message || 'An unexpected error occurred');
    }
  };
  

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (isSignup) {
      const fields = [name, email, password].filter(Boolean).length;
      setProgress((fields / 3) * 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-6 sm:p-8 bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mb-2 font-poppins">
        {isSignup ? 'Join the Yoga Family!' : 'Welcome Back'}
      </h2>
      <p className="text-center text-green-800 mb-4 sm:mb-6 text-sm font-poppins">
        {isSignup ? 'Embrace your yoga journey 🌿' : 'Continue your practice 🧘‍♂️'}
      </p>

      {isSignup && (
        <div className="w-full bg-green-100 rounded-full h-2 mb-4">
          <motion.div
            className="bg-green-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <form onSubmit={onSubmitHandler} className="space-y-4">
        {isSignup && (
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">👤</span>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-green-400 bg-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition font-poppins text-sm sm:text-base"
              value={name}
              onChange={handleInputChange(setName)}
              required
            />
          </div>
        )}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">✉️</span>
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-green-400 bg-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition font-poppins text-sm sm:text-base"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">🔒</span>
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-green-400 bg-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition font-poppins text-sm sm:text-base"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
          />
        </div>
        {!isSignup && (
          <div className="text-right">
            <p
              className="text-xs sm:text-sm text-green-700 hover:underline cursor-pointer font-poppins"
              onClick={() => navigate('/reset-password')}
            >
              Forgot Password?
            </p>
          </div>
        )}
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-yellow-300 py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg relative overflow-hidden group font-poppins text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          {isSignup ? 'Sign Up' : 'Login'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Login;
