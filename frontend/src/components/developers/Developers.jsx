import React from "react";
import { motion } from "framer-motion";

function Developers() {
  const developers = [
    {
      name: "Anantesh Chauhan",
      role: "Full Stack Developer",
      description:
        " Anantesh is responsible for making interactive sign-up and login pages, ensuring seamless user authentication and dynamic form handling Anantesh is responsible for designing and developing the interactive sign-up and login pages, creating dynamic asanas pages with detailed information, building a simple user profile system, and overall website design. He ensures seamless user experience, responsiveness, and smooth animations using React and Framer Motionusing React and Framer Motion. He also works on the overall website design, ensuring a smooth and responsive user experience across devices",
      linkedin: "https://www.linkedin.com/in/ananteshchauhan",
      github: "https://github.com/ananteshchauhan",
      imageUrl: "https://res.cloudinary.com/dlixtmy1x/image/upload/v1745654130/profilepic_ea6dvb.webp",
    },
    {
      name: "Shamik Mandal",
      role: "Full Stack Developer",
      description:
        "Shamik works on building efficient backend systems using Node.js and manages MongoDB database integration.",
      linkedin: "https://www.linkedin.com/in/shamikmandal",
      github: "https://github.com/shamikmandal",
      imageUrl: "https://res.cloudinary.com/dlixtmy1x/image/upload/v1745654130/profilepic_ea6dvb.webp",
    },
    {
      name: "Harshit Pal",
      role: "Full Stack Developer",
      description:
        "Harshit contributes to frontend UI development and backend API integration, ensuring smooth system communication.",
      linkedin: "https://www.linkedin.com/in/harshitpal",
      github: "https://github.com/harshitpal",
      imageUrl: "https://res.cloudinary.com/dlixtmy1x/image/upload/v1745654130/profilepic_ea6dvb.webp",
    },
    {
      name: "Abhishek Kumar Gond",
      role: "Full Stack Developer",
      description:
        "Abhishek focuses on responsive UI design and backend services, ensuring optimized user experiences.",
      linkedin: "https://www.linkedin.com/in/abhishekkumargond",
      github: "https://github.com/abhishekkumargond",
      imageUrl: "https://res.cloudinary.com/dlixtmy1x/image/upload/v1745654130/profilepic_ea6dvb.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-teal-400 to-green-600 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          className="text-4xl font-bold text-green-900 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h2>
        <motion.p 
          className="text-gray-700 mb-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          The passionate team behind Yoga-Healix.
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              className="bg-red-100 rounded-2xl shadow-md hover:shadow-2xl p-6 flex flex-col items-center transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img
                src={dev.imageUrl}
                alt={dev.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-green-400 mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700">{dev.name}</h3>
              <p className="text-green-600 italic mb-2">{dev.role}</p>
              <p className="text-gray-500 text-sm mb-4">{dev.description}</p>
              <div className="flex space-x-6 mt-auto">
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-xl transition-colors"
                >
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
                <a
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black text-xl transition-colors"
                >
                  <i className="fab fa-github"></i> GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Developers;
