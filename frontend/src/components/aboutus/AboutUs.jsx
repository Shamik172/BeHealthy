import { motion } from "framer-motion";

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-teal-100 to-green-300 flex flex-col items-center justify-center p-8 text-gray-800">
      {/* Decorative Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-32 h-32 bg-white/30 backdrop-blur-md rounded-full shadow-lg z-0"
      ></motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-white/20 backdrop-blur-md rounded-full shadow-lg z-0"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-white p-10 rounded-2xl shadow-2xl max-w-5xl text-center z-10"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-6">About Yoga-Verse</h1>
        <p className="text-lg mb-4 leading-relaxed">
          <strong>Yoga-Verse</strong> is more than a website—it's a holistic experience that blends ancient yoga wisdom with
          modern digital design. Our platform was created with a singular purpose: to make yoga accessible, enjoyable, and
          deeply personal for everyone.
        </p>

        <p className="text-md mb-4 leading-relaxed">
          Whether you're looking to relieve stress, improve flexibility, recover from injuries, or just start your morning
          mindfully, Yoga-Verse has something for you. From curated asanas by body part to step-by-step guides, animations,
          and user feedback—you’ll find everything in one peaceful place.
        </p>

        <p className="text-md mb-4 leading-relaxed">
          We believe that yoga is for *every* body. Our content is designed for all ages and skill levels, so whether you're
          on your first sun salutation or your thousandth, Yoga-Verse supports your journey every step of the way.
        </p>

        <h2 className="text-2xl text-green-700 font-semibold mt-6 mb-2">🌱 Our Mission</h2>
        <p className="mb-4">
          To empower individuals worldwide to embrace yoga as a daily practice for physical vitality, emotional well-being,
          and spiritual growth.
        </p>

        <h2 className="text-2xl text-green-700 font-semibold mt-6 mb-2">💫 Our Vision</h2>
        <p className="mb-4">
          A world where mindful movement and conscious breathing help people live healthier, happier lives—one pose at a time.
        </p>

        <h2 className="text-2xl text-green-700 font-semibold mt-6 mb-2">🧘 Core Values</h2>
        <ul className="list-disc list-inside text-left mx-auto max-w-2xl text-gray-700">
          <li>Inclusivity: Yoga for all bodies, backgrounds, and beliefs</li>
          <li>Authenticity: Rooted in traditional practice with a modern twist</li>
          <li>Community: Built around sharing experiences, stories, and support</li>
          <li>Wellness: Promoting balance, clarity, and peace in everyday life</li>
        </ul>

        <p className="text-sm text-gray-600 mt-6 italic">
          "Yoga is the journey of the self, through the self, to the self." — Bhagavad Gita
        </p>
      </motion.div>
    </div>
  );
}

export default AboutUs;
