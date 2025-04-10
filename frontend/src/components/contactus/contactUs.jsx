import { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../utils";

function ContactUs() {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    msg: "",
  });

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, msg } = contactInfo;

    if (!name || !email || !msg) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:5050/contactus";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactInfo),
      });

      const result = await response.json();
      const { success, message: msg, error } = result;

      if (success) {
        handleSuccess(msg);
        setContactInfo({ name: "", email: "", msg: "" });
      } else {
        handleError(error || "Submission failed. Try again.");
      }
    } catch (err) {
      console.error("Contact Error:", err);
      handleError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-teal-400 to-green-600">
      {/* Floating Background Ornaments */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-20 w-24 h-24 bg-white/30 backdrop-blur-md rounded-full shadow-lg"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-20 w-32 h-32 bg-white/20 backdrop-blur-md rounded-full shadow-lg"
      ></motion.div>

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute w-20 h-20 bg-teal-300 opacity-20 rounded-full -top-5 -right-5"
        ></motion.div>

        <h2 className="text-3xl font-bold text-green-800 mb-6">Contact Us</h2>
        <p className="text-gray-500 mb-4">We're here to help 🌿</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105"
            value={contactInfo.name}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105"
            value={contactInfo.email}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.textarea
            name="msg"
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105 resize-none"
            value={contactInfo.msg}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default ContactUs;
