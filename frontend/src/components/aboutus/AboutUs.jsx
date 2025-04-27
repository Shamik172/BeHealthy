import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaPeopleCarry, FaBell, FaCalendarAlt, FaChartLine, FaUserFriends, FaLeaf } from "react-icons/fa";
import { MdSelfImprovement, MdOutlineEventAvailable } from "react-icons/md";
import { GiMeditation } from "react-icons/gi";

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-teal-100 to-green-300 flex flex-col items-center justify-center p-6 text-gray-800 relative">
      
      {/* Decorative Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-24 h-24 bg-white/30 backdrop-blur-md rounded-full shadow-lg z-0"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-28 h-28 bg-white/20 backdrop-blur-md rounded-full shadow-lg z-0"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-5xl text-center z-10"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-4">About Yoga-Healix</h1>

        <p className="text-lg mb-3 leading-relaxed">
          Welcome to <strong>Yoga-Healix</strong> — your trusted companion on the journey of holistic wellness, mindful living, and personal transformation.
        </p>

        <p className="text-md mb-6 leading-relaxed">
          Yoga-Healix is designed for every practitioner. From body-specific healing asanas to vibrant community meets, live conferences, animated learning guides, and daily wellness reminders — we bring everything together to make yoga a way of life.
        </p>

        <h2 className="text-2xl text-green-700 font-semibold mt-6 mb-4 flex items-center justify-center gap-2">
          <FaLeaf /> Our Purpose
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          Yoga-Healix isn't just about poses — it's about restoring the body, awakening the soul, and living every day with greater awareness, balance, and vitality.
        </p>

        <h2 className="text-2xl text-green-700 font-semibold mt-6 mb-4 flex items-center justify-center gap-2">
          <GiMeditation /> Key Features
        </h2>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-8">
          <div className="flex items-start gap-4">
            <MdSelfImprovement size={28} className="text-green-600" />
            <div>
              <h3 className="font-semibold">Personalized Yoga Guides</h3>
              <p className="text-sm text-gray-600">Explore asanas targeted for back, lungs, heart, eyes, and more, tailored for your needs.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaBell size={24} className="text-green-600" />
            <div>
              <h3 className="font-semibold">Daily Wellness Reminders</h3>
              <p className="text-sm text-gray-600">Get gentle nudges and inspiring notifications to stay consistent and motivated.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaCalendarAlt size={26} className="text-green-600" />
            <div>
              <h3 className="font-semibold">Live Conferences & Events</h3>
              <p className="text-sm text-gray-600">Join global yoga workshops, conferences, and expert sessions, live from anywhere.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaUserFriends size={26} className="text-green-600" />
            <div>
              <h3 className="font-semibold">Community Meets</h3>
              <p className="text-sm text-gray-600">Connect, share, and celebrate your journey with a supportive yoga community.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaChartLine size={26} className="text-green-600" />
            <div>
              <h3 className="font-semibold">Progress Tracking</h3>
              <p className="text-sm text-gray-600">*(Coming soon)* Visualize your yoga practice growth and celebrate your milestones.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaHandHoldingHeart size={26} className="text-green-600" />
            <div>
              <h3 className="font-semibold">Review & Feedback System</h3>
              <p className="text-sm text-gray-600">Like, dislike, review, report, and improve poses based on real user experiences.</p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <h2 className="text-2xl text-green-700 font-semibold mt-8 mb-4 flex items-center justify-center gap-2">
          <MdOutlineEventAvailable /> Our Vision
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          To inspire a world where mindful movement and conscious breath create a community of balance, joy, compassion, and healing — every single day.
        </p>

        {/* Core Values */}
        <h2 className="text-2xl text-green-700 font-semibold mt-8 mb-4 flex items-center justify-center gap-2">
          <FaPeopleCarry /> Our Core Values
        </h2>
        <ul className="list-disc list-inside mx-auto max-w-2xl text-left text-gray-700 space-y-2 text-sm">
          <li><strong>Inclusivity:</strong> Welcoming every body, every journey, every story.</li>
          <li><strong>Authenticity:</strong> Honoring yoga’s rich roots while evolving mindfully for today’s world.</li>
          <li><strong>Community:</strong> Building supportive, inspiring, and compassionate spaces.</li>
          <li><strong>Wellness:</strong> Prioritizing physical, emotional, and spiritual healing for all.</li>
          <li><strong>Inspiration:</strong> Empowering growth, resilience, and transformation — every day.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-10 italic">
          "Yoga is not about touching your toes. It’s about what you learn on the way down." — Jigar Gor
        </p>
      </motion.div>
    </div>
  );
}

export default AboutUs;
