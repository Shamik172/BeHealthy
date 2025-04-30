import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaTransgender, FaBirthdayCake, FaMapMarkerAlt, FaCertificate, FaGlobe, FaDollarSign, FaInstagram, FaYoutube, FaFacebook, FaTwitter, FaLinkedin, FaFileUpload } from "react-icons/fa";
import { AppContent } from "../../context/AppContext";

const BecomeInstructor = () => {
  // Access user data from AppContext (name, email, dob)
  const { userData } = useContext(AppContent);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    dob: userData.dob,
    phone: "",
    gender: "Other",
    location: "",
    certifications: "",
    specializations: "",
    teachingLanguages: "",
    hourlyRate: "",
    availableDays: "",
    resume: null,
    message: "",
    profileSummary: "",
    socialLinks: {
      instagram: "",
      youtube: "",
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value },
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Instructor Application:", formData);
    // Send formData to backend API for processing
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-100 to-green-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-yellow-40 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-green-700">Become a Yoga Instructor</h2>

        {/* Pre-filled Personal Info (Name, Email, DOB) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField icon={<FaUser />} label="Name" name="name" value={formData.name} onChange={handleChange} disabled />
          <InputField icon={<FaEnvelope />} label="Email" name="email" value={formData.email} onChange={handleChange} disabled />
          <InputField icon={<FaBirthdayCake />} label="Date of Birth" name="dob" value={formData.dob?.slice(0, 10) || ""} onChange={handleChange} type="date" disabled />
        </div>

        {/* Fillable Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField icon={<FaPhone />} label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <InputField icon={<FaTransgender />} label="Gender" name="gender" value={formData.gender} onChange={handleChange} placeholder="Male, Female, Other" />
          <InputField icon={<FaMapMarkerAlt />} label="Location" name="location" value={formData.location} onChange={handleChange} />
        </div>

        {/* Certifications & Specializations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField icon={<FaCertificate />} label="Certifications" name="certifications" value={formData.certifications} onChange={handleChange} placeholder="Eg: Hatha Yoga, Vinyasa" />
          <InputField icon={<FaGlobe />} label="Specializations" name="specializations" value={formData.specializations} onChange={handleChange} placeholder="Eg: Hatha Yoga, Vinyasa" />
        </div>

        {/* Teaching Languages & Hourly Rate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField icon={<FaGlobe />} label="Teaching Languages" name="teachingLanguages" value={formData.teachingLanguages} onChange={handleChange} placeholder="Eg: English, Hindi" />
          <InputField icon={<FaDollarSign />} label="Hourly Rate (₹)" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} />
        </div>

        {/* Available Days */}
        <div>
          <InputField icon={<FaGlobe />} label="Available Days" name="availableDays" value={formData.availableDays} onChange={handleChange} placeholder="Eg: Monday, Wednesday, Friday" />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="font-semibold text-green-700">Upload Resume</label>
          <div className="flex items-center border rounded-lg mt-1 p-2 focus-within:ring-2 focus-within:ring-green-300">
            <FaFileUpload className="text-green-600 mr-2" />
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              className="w-full outline-none"
              accept=".pdf, .docx"
            />
          </div>
        </div>

        {/* Message Column */}
        <div>
          <label className="font-semibold text-green-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a message or personal introduction..."
            className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-300"
            rows="4"
          />
        </div>

        {/* Profile Summary */}
        <div>
          <label className="font-semibold text-green-700">Profile Summary</label>
          <textarea
            name="profileSummary"
            value={formData.profileSummary}
            onChange={handleChange}
            placeholder="Write a brief description of your teaching style or philosophy."
            className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-300"
            rows="4"
          />
        </div>

        {/* Social Links */}
        <h3 className="text-xl font-semibold text-green-700">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField icon={<FaInstagram />} label="Instagram" name="instagram" value={formData.socialLinks.instagram} onChange={handleChange} />
          <InputField icon={<FaYoutube />} label="YouTube" name="youtube" value={formData.socialLinks.youtube} onChange={handleChange} />
          <InputField icon={<FaFacebook />} label="Facebook" name="facebook" value={formData.socialLinks.facebook} onChange={handleChange} />
          <InputField icon={<FaTwitter />} label="Twitter" name="twitter" value={formData.socialLinks.twitter} onChange={handleChange} />
          <InputField icon={<FaLinkedin />} label="LinkedIn" name="linkedin" value={formData.socialLinks.linkedin} onChange={handleChange} />
        </div>

        {/* Profile Picture */}
        <div>
          <label className="font-semibold text-green-700">Profile Picture</label>
          <div className="flex items-center border rounded-lg mt-1 p-2 focus-within:ring-2 focus-within:ring-green-300">
            <FaUser className="text-green-600 mr-2" />
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full outline-none"
              accept="image/*"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition duration-300">
            Submit Application
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Small InputField component
const InputField = ({ icon, label, name, value, onChange, type = "text", placeholder = "", disabled = false }) => {
  return (
    <div>
      <label className="font-semibold text-green-700">{label}</label>
      <div className="flex items-center border rounded-lg mt-1 p-2 focus-within:ring-2 focus-within:ring-green-300">
        <div className="text-green-600 mr-2">{icon}</div>
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full outline-none"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default BecomeInstructor;
