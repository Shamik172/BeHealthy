import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../../../context/AppContext";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa"; // For social icons
import { BsFillPersonCheckFill, BsFillCalendarFill } from "react-icons/bs";

const InstructorOverviewTab = () => {
  const [instructorData, setInstructorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(AppContent); 

  // Fetch instructor data from the backend
  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/instructor/profile`, {
          withCredentials: true,
        });
        setInstructorData(response.data.instructorData); // Use the instructorData from the response
        setLoading(false);
      } catch (err) {
        setError("Failed to load instructor data.");
        setLoading(false);
      }
    };

    fetchInstructorData();
  }, [backendUrl]);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  return (
    <div className="bg-green-50 p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Instructor Profile Overview</h2>

      {/* Basic Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
          <BsFillPersonCheckFill className="text-green-600 mr-2" /> Basic Information
        </h3>
        <p><strong>Name:</strong> {instructorData.name}</p>
        <p><strong>Email:</strong> {instructorData.email}</p>
        <p><strong>Gender:</strong> {instructorData.gender}</p>
        <p><strong>Location:</strong> {instructorData.location}</p>
        <p><strong>Phone:</strong> {instructorData.phone}</p>
        <p><strong>Date of Birth:</strong> <BsFillCalendarFill className="inline text-gray-600" /> {new Date(instructorData.dob).toLocaleDateString()}</p>
      </div>

      {/* Certifications Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Certifications</h3>
        {instructorData.certifications.length > 0 ? (
          <ul className="list-none space-y-3 text-gray-700">
            {instructorData.certifications.map((cert, index) => (
              <li key={index}>
                <p><strong>{cert.title}</strong></p>
                <p><strong>Issued By:</strong> {cert.issuedBy}</p>
                <p><strong>Issue Date:</strong> {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : "N/A"}</p>
                <p><strong>Certificate Link:</strong> <a href={cert.certificateLink} target="_blank" rel="noopener noreferrer">{cert.certificateLink}</a></p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No certifications available.</p>
        )}
      </div>

      {/* Yoga Specializations Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Specializations</h3>
        <ul className="list-none space-y-2 text-gray-700">
          {instructorData.specializations.length > 0 ? (
            instructorData.specializations.map((spec, index) => <li key={index}>{spec}</li>)
          ) : (
            <li>No specializations listed.</li>
          )}
        </ul>
      </div>

      {/* Availability Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Availability</h3>
        <p><strong>Status:</strong> {instructorData.availability}</p>
        <p><strong>Available Days:</strong> {instructorData.availableDays.join(", ") || "No days set"}</p>
      </div>

      {/* Social Links Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Social Links</h3>
        <ul className="list-none space-y-3 text-gray-700">
          {instructorData.socialLinks.instagram && (
            <li className="flex items-center">
              <FaInstagram className="text-pink-600 mr-3" /> Instagram: {instructorData.socialLinks.instagram}
            </li>
          )}
          {instructorData.socialLinks.youtube && (
            <li className="flex items-center">
              <FaYoutube className="text-red-600 mr-3" /> YouTube: {instructorData.socialLinks.youtube}
            </li>
          )}
          {instructorData.socialLinks.facebook && (
            <li className="flex items-center">
              <FaFacebook className="text-blue-600 mr-3" /> Facebook: {instructorData.socialLinks.facebook}
            </li>
          )}
          {instructorData.socialLinks.twitter && (
            <li className="flex items-center">
              <FaTwitter className="text-blue-400 mr-3" /> Twitter: {instructorData.socialLinks.twitter}
            </li>
          )}
          {!Object.values(instructorData.socialLinks).some(link => link) && (
            <li>No social links available.</li>
          )}
        </ul>
      </div>

      {/* Account Status Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Account Status</h3>
        <p><strong>Verified:</strong> {instructorData.isVerified ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default InstructorOverviewTab;
