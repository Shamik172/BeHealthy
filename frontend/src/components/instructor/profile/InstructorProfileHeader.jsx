import React, { useContext } from "react";
import { AppContent } from "../../../context/AppContext";
import { motion } from "framer-motion";
import Watch from "../../asanas/clock/Watch"

const InstructorProfileHeader = () => {
  const { instructorData } = useContext(AppContent) 

  const displayUsername =
    instructorData?.username || (instructorData?.email ? instructorData.email.split("@")[0] : "username");
  const displayBio = instructorData?.bio || "🌿 Passionate Yoga Instructor | Cultivating Inner Peace";
  const displayLocation = instructorData?.location || "Earth 🌍";
  const displayDob = instructorData?.dob ? new Date(instructorData.dob).toDateString() : "Date of Birth Not Set";
  const displayGender = instructorData?.gender || "Prefer not to say";
  const displayPhone = instructorData?.phone || "No phone number linked";
  const displayExpertise = instructorData?.expertise || "Vinyasa, Hatha, and Power Yoga";
  const profileUrl =
    "https://res.cloudinary.com/dlixtmy1x/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1745654130/profilepic_ea6dvb.webp";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="w-full max-w-7xl bg-gradient-to-r from-indigo-50 via-purple-100 to-pink-100 shadow-xl rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-8 mx-auto mt-8"
    >
      {/* Left Section - Profile Image */}
      <motion.img
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        src={instructorData?.profilePic || profileUrl}
        alt="Instructor Profile"
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-green-500 shadow-lg"
      />

      {/* Center Section - Profile Details */}
      <div className="flex-1 flex flex-col gap-4 text-gray-800">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-green-700"
        >
          {instructorData?.name || "Instructor Name"}
        </motion.h2>

        <p className="text-base md:text-lg text-gray-600">@{displayUsername}</p>
        <p className="text-sm md:text-base italic text-gray-500">{displayBio}</p>

        <div className="flex flex-col gap-2 text-sm md:text-base mt-4">
          <p>📍 {displayLocation}</p>
          <p>🎂 {displayDob}</p>
          <p>👤 {displayGender}</p>
          <p>📞 {displayPhone}</p>
          <p>💡 Expertise: {displayExpertise}</p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-6 mt-6 text-green-600">
          {instructorData?.socialLinks?.instagram && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              href={instructorData.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              📸 Instagram
            </motion.a>
          )}
          {instructorData?.socialLinks?.youtube && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              href={instructorData.socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              ▶️ YouTube
            </motion.a>
          )}
          {instructorData?.socialLinks?.facebook && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              href={instructorData.socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              📘 Facebook
            </motion.a>
          )}
          {instructorData?.socialLinks?.twitter && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              href={instructorData.socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              🐦 Twitter
            </motion.a>
          )}
        </div>
      </div>

      {/* Right Section - Watch */}
      <div className="hidden md:block">
        <Watch />
      </div>
    </motion.div>
  );
};

export default InstructorProfileHeader;
