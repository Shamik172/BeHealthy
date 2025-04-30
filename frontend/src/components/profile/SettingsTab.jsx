import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../../context/AppContext';
import { motion } from 'framer-motion';

const SettingsTab = () => {
  const { userData, backendUrl, setUserData } = useContext(AppContent);
  const [name, setName] = useState(userData?.name || '');
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

      const { data } = await axios.post(`${backendUrl}/user/update-settings`, payload);

      if (data.success) {
        toast.success('Settings updated successfully');
        setUserData((prev) => ({ ...prev, name }));
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        toast.error(data.message || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('An error occurred while updating settings');
    }
  };

  return (
    <motion.div
      className="bg-white p-8 md:p-10 rounded-lg shadow-lg space-y-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h3
        className="text-3xl font-semibold text-gray-800 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Account Settings
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
          className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all ease-in-out"
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
          className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all ease-in-out"
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
          className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all ease-in-out"
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
          className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all ease-in-out"
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
          className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all ease-in-out"
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
        className="bg-green-600 text-white p-4 rounded-lg w-full mt-6 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Save Changes
      </motion.button>
    </motion.div>
  );
};

export default SettingsTab;
