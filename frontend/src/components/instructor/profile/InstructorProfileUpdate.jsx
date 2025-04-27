import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AppContent } from '../../../context/AppContext';
import { toast } from 'react-toastify';

const InstructorProfileUpdate = () => {
  const { 
    backendUrl,
    isInstructorLoggedIn,
    instructorData,
    setInstructorData,
    getInstructorData
  } = useContext(AppContent);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Other',
    dob: '',
    location: '',
    specialization: '',
    experience: '',
    certifications: '',
    bio: '',
    socialLinks: { instagram: '', youtube: '', facebook: '', twitter: '' },
    oldPassword: '',
    newPassword: '',
  });

  // Pre-fill form with instructorData when available
  useEffect(() => {
    if (instructorData) {
      setFormData((prev) => ({
        ...prev,
        ...instructorData,
        socialLinks: {
          instagram: instructorData?.socialLinks?.instagram || '',
          youtube: instructorData?.socialLinks?.youtube || '',
          facebook: instructorData?.socialLinks?.facebook || '',
          twitter: instructorData?.socialLinks?.twitter || '',
        }
      }));
    }
  }, [instructorData]);

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
      const { data } = await axios.post(`${backendUrl}/instructor/update-profile`, formData);
      if (data.success) {
        toast.success('Profile Updated Successfully');
        setInstructorData(data.instructor); // update instructor context
        getInstructorData(); // optional: refetch updated instructor data
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error in update profile:', error);
      toast.error('Failed to update profile');
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
        Update Your Instructor Profile
      </motion.h2>

      <motion.form 
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Form Inputs */}
        {/* Same input fields as before */}
        {/* I'll just show you one and you continue the same way */}
        
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

        {/* Similarly continue for phone, gender, dob, location, etc */}

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

        {/* Submit Button */}
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

export default InstructorProfileUpdate;
