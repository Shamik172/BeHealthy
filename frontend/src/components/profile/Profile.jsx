import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OverviewTab from './OverwiewTab';
import ProgressTab from './ProgressTab';
import ReviewsTab from './ReviewsTab';
import SettingsTab from './SettingsTab';
import ProfileHeader from './ProfileHeader';
import ProfileUpdate from './ProfileUpdate';
import StreakHeatmap from './StreakHeatmap';

const tabs = ['Overview', 'Progress', 'Reviews', 'Settings', 'Update-Profile'];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab />;
      case 'Progress':
        return <ProgressTab />;
      case 'Reviews':
        return <ReviewsTab />;
      case 'Settings':
        return <SettingsTab />;
      case 'Update-Profile':
        return <ProfileUpdate />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <ProfileHeader />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mt-4"
      >
        <StreakHeatmap />
      </motion.div>

      <div className="w-full max-w-6xl mt-6 flex flex-col">
        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center md:justify-start border-b-2 border-gray-300"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-sm md:text-base flex-1 md:flex-none text-center transition-colors duration-300 ${
                activeTab === tab 
                  ? 'border-b-4 border-green-500 text-green-600 font-semibold' 
                  : 'text-gray-600 hover:text-green-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="mt-6 p-4 md:p-6 bg-red-50 rounded-lg shadow-sm"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
