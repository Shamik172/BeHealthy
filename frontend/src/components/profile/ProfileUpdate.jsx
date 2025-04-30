import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AppContent } from '../../context/AppContext';
import { toast } from 'react-toastify';

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Other',
    dob: '',
    location: '',
    goals: '',
    socialLinks: { instagram: '', youtube: '', facebook: '', twitter: '' },
    oldPassword: '',
    newPassword: '',
  });

  const { userData, setUserData, backendUrl } = useContext(AppContent);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('socialLinks')) {
      const [, platform] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [platform]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/user/update-profile`, formData);
      if (data.success) {
        toast.success('Profile Update Success');
        setUserData((prev) => ({
          ...prev,
          ...data.user,
        }));
      } else {
        toast.error('Failed to update Profile');
      }
    } catch (error) {
      console.error('Error in Update Profile:', error);
      toast.error('Failed to update Profile');
    }
  };

  return (
    <motion.div 
      className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10 bg-yellow-50 rounded-2xl shadow-2xl mt-6 mb-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2 
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-green-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Update Your Profile
      </motion.h2>

      <motion.form 
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="Enter your phone"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </motion.select>
        </div>

        {/* DOB */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Date of Birth</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="City, Country"
          />
        </div>

        {/* Goals */}
        <div className="sm:col-span-2 lg:col-span-3 flex flex-col">
          <label className="text-sm font-medium text-gray-700">Goals</label>
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            placeholder="Share your goals (e.g., flexibility, fitness)"
            rows="3"
          />
        </div>

        {/* Social Links */}
        {["instagram", "youtube", "facebook", "twitter"].map((platform) => (
          <div key={platform} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 capitalize">{platform}</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name={`socialLinks.${platform}`}
              value={formData.socialLinks[platform]}
              onChange={handleChange}
              className="mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder={`Your ${platform} profile link`}
            />
          </div>
        ))}

        {/* Submit button */}
        <div className="sm:col-span-2 lg:col-span-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl text-lg font-semibold tracking-wide hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update Profile
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ProfileUpdate;
