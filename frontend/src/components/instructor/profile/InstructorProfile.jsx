import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InstructorOverviewTab from './InstructorOverwiewTab';
import InstructorSettingsTab from './InstructorSettingsTab';
import InstructorProfileUpdate from './InstructorProfileUpdate';
import InstructorProfileHeader from './InstructorProfileHeader'


const tabs = ['Overview',  'Settings', 'Update-Profile'];

const InstructorProfile = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <InstructorOverviewTab />;
      case 'Settings':
        return <InstructorSettingsTab/>;
      case 'Update-Profile':
        return <InstructorProfileUpdate />;
      default:
        return <InstructorOverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center p-4 md:p-6">
      {/* Profile Header Section with animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <InstructorProfileHeader />
      </motion.div>

      {/* Tabs and Tab Content Section */}
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
          className="mt-6 p-4 md:p-6 bg-white rounded-lg shadow-sm"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default InstructorProfile;
