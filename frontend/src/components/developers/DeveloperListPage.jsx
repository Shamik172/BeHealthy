import React from "react";
import { motion } from "framer-motion";

function DeveloperListPage() {
  // List of developers with details
  const developers = [
    {
      name: "Anantesh Chauhan",
      role: "Full Stack Developer",
      description:
        "Anantesh is responsible for both frontend and backend development, ensuring seamless integration between React and Node.js.",
      linkedin: "https://www.linkedin.com/in/ananteshchauhan",
      github: "https://github.com/ananteshchauhan",
      imageUrl: "https://via.placeholder.com/150?text=Anantesh", // Placeholder image
    },
    {
      name: "Shamik Mandal",
      role: "Full Stack Developer",
      description:
        "Shamik works on building efficient backend systems using Node.js and manages the MongoDB database integration.",
      linkedin: "https://www.linkedin.com/in/shamikmandal",
      github: "https://github.com/shamikmandal",
      imageUrl: "https://via.placeholder.com/150?text=Shamik", // Placeholder image
    },
    {
      name: "Harshit Pal",
      role: "Full Stack Developer",
      description:
        "Harshit contributes to both frontend UI development and backend API integration, ensuring smooth communication between systems.",
      linkedin: "https://www.linkedin.com/in/harshitpal",
      github: "https://github.com/harshitpal",
      imageUrl: "https://via.placeholder.com/150?text=Harshit", // Placeholder image
    },
    {
      name: "Abhishek Kumar Gond",
      role: "Full Stack Developer",
      description:
        "Abhishek focuses on building responsive user interfaces and backend services, ensuring an optimized user experience.",
      linkedin: "https://www.linkedin.com/in/abhishekkumargond",
      github: "https://github.com/abhishekkumargond",
      imageUrl: "https://via.placeholder.com/150?text=Abhishek", // Placeholder image
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-teal-400 to-green-600">
      <div className="flex justify-center items-center py-10 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Meet the Developers</h2>
          <p className="text-gray-500 mb-4">These are the amazing developers who built this website.</p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((developer, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={developer.imageUrl}
                    alt={developer.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
                  />
                </div>

                <h3 className="text-xl font-semibold text-green-700">{developer.name}</h3>
                <p className="text-gray-600 italic">{developer.role}</p>
                <p className="text-gray-500 mt-2">{developer.description}</p>

                <div className="mt-4 flex justify-center space-x-4">
                  <a
                    href={developer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition duration-200"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={developer.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black transition duration-200"
                  >
                    GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default DeveloperListPage;
