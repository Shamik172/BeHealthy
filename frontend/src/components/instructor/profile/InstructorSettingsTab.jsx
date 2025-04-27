import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../../../context/AppContext';
import { motion } from 'framer-motion';

const InstructorSettingsTab = () => {
  const {
    backendUrl,
    instructorData,
    setInstructorData,
    getInstructorData,
  } = useContext(AppContent);

  const [name, setName] = useState(instructorData?.name || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [notificationPref, setNotificationPref] = useState('Email & Push Notifications');
  const [passwordError, setPasswordError] = useState('');

  const handleSave = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const payload = {
        name,
        oldPassword,
        newPassword,
        notificationPref,
      };

      const { data } = await axios.post(`${backendUrl}/instructor/update-settings`, payload);

      if (data.success) {
        toast.success('Settings updated successfully');
        setInstructorData((prev) => ({ ...prev, name }));
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        getInstructorData(); // Refresh data after update
      } else {
        toast.error(data.message || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating instructor settings:', error);
      toast.error('An error occurred while updating settings');
    }
  };

  return (
    <motion.div
      className="bg-gray-50 p-8 rounded-lg shadow-lg space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h3
        className="text-2xl font-semibold text-gray-800 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Instructor Account Settings
      </motion.h3>

      {/* Change Name */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-gray-700 font-medium">Change Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="John Doe"
        />
      </motion.div>

      {/* Old Password */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-gray-700 font-medium">Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="********"
        />
      </motion.div>

      {/* New Password */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-gray-700 font-medium">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="********"
        />
      </motion.div>

      {/* Confirm New Password */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-gray-700 font-medium">Confirm New Password</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="********"
        />
        {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
      </motion.div>

      {/* Notification Preferences */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-gray-700 font-medium">Notification Preferences</label>
        <select
          value={notificationPref}
          onChange={(e) => setNotificationPref(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option>Email & Push Notifications</option>
          <option>Email Only</option>
          <option>Push Notifications Only</option>
          <option>None</option>
        </select>
      </motion.div>

      {/* Save Button */}
      <motion.button
        onClick={handleSave}
        className="bg-blue-600 text-white p-3 rounded-lg w-full mt-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Save Changes
      </motion.button>
    </motion.div>
  );
};

export default InstructorSettingsTab;
