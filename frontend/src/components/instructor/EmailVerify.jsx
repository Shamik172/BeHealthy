import React, { useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join('');
      const { data } = await axios.post(`${backendUrl}/auth/instructor/verify-account`, { otp });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate();
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      toast.error('Error in OTP verification');
    }
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) navigate();
  }, [isLoggedin, userData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-yellow-100 to-green-100 px-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-6"
        onSubmit={onSubmitHandler}
      >
        <h1 className="text-3xl font-bold text-center text-green-700">Email Verification</h1>
        <p className="text-sm text-center text-gray-600">Enter the 6-digit code sent to your email.</p>
        <div className="flex justify-center gap-2" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              required
              className="w-12 h-12 text-center border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              ref={(e) => (inputRefs.current[index] = e)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg"
        >
          Verify Email
        </button>
      </motion.form>
    </div>
  );
};

export default EmailVerify;