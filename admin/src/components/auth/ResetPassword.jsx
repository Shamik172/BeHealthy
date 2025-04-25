import React, { useContext, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success('Reset OTP sent');
        setIsEmailSent(true);
      } else {
        toast.error(data.message || 'Failed to send Reset OTP');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Error sending OTP';
      toast.error(errorMessage);
      console.error("Reset Password Error:", errorMessage); 
    }
  };
  

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const otpValue = otpArray.join('');
    if (otpValue.length !== 6) {
      toast.error('Enter a valid 6-digit OTP');
      return;
    }
    try {
      const { data } = await axios.post(`${backendUrl}/auth/verify-reset-password-otp`, { email, otp: otpValue });
      if (data.success) {
        toast.success('OTP verified');
        setOtp(otpValue);
        setIsOtpSubmitted(true);
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      toast.error('Error verifying OTP');
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/auth/reset-password`, { email, newPassword });
      if (data.success) {
        toast.success('Password changed successfully');
        navigate('./login');
      } else {
        toast.error('Invalid OTP or expired link');
      }
    } catch (error) {
      toast.error('Error changing password');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-yellow-100 to-green-100 px-4">
      {!isEmailSent && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-6"
          // onSubmit={onSubmitEmail}
        >
          <h1 className="text-3xl font-bold text-center text-green-700">Reset Password</h1>
          <p className="text-sm text-center text-gray-600">Enter your registered email address</p>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg"
            onClick={onSubmitEmail}
          >
            Send Reset OTP
          </button>
        </motion.form>
      )}
      {isEmailSent && !isOtpSubmitted && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-6"
          onSubmit={onSubmitOtp}
        >
          <h1 className="text-3xl font-bold text-center text-green-700">Email Verification</h1>
          <p className="text-sm text-center text-gray-600">Enter the 6-digit code sent to your email</p>
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="w-12 h-12 text-center border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg"
          >
            Verify OTP
          </button>
        </motion.form>
      )}
      {isEmailSent && isOtpSubmitted && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-6"
          onSubmit={onSubmitNewPassword}
        >
          <h1 className="text-3xl font-bold text-center text-green-700">Enter New Password</h1>
          <input
            type="password"
            placeholder="Enter your new password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg"
          >
            Change Password
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default ResetPassword;