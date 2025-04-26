import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../../context/AppContext";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa"; // For social icons
import { BsFillPersonCheckFill, BsFillCalendarFill } from "react-icons/bs"; // For account verified and date of birth icons

const OverviewTab = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(AppContent); // Get backend URL from context or environment

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/profile`, {
          withCredentials: true,
        });
        setUserData(response.data.userData); // Use the userData from the response
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [backendUrl]);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  return (
    <div className="bg-green-50 p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Profile Overview</h2>

      {/* Basic Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
          <BsFillPersonCheckFill className="text-green-600 mr-2" /> Basic Information
        </h3>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Gender:</strong> {userData.gender}</p>
        <p><strong>Location:</strong> {userData.location}</p>
        <p><strong>Phone:</strong> {userData.phone}</p>
        <p><strong>Date of Birth:</strong> <BsFillCalendarFill className="inline text-gray-600" /> {new Date(userData.dob).toLocaleDateString()}</p>
      </div>

      {/* Yoga Goals Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Yoga Goals</h3>
        <p>{userData.goals || "No goals set"}</p>
      </div>

      {/* Social Links Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Social Links</h3>
        <ul className="list-none space-y-3 text-gray-700">
          {userData.socialLinks.instagram && (
            <li className="flex items-center">
              <FaInstagram className="text-pink-600 mr-3" /> Instagram: {userData.socialLinks.instagram}
            </li>
          )}
          {userData.socialLinks.youtube && (
            <li className="flex items-center">
              <FaYoutube className="text-red-600 mr-3" /> YouTube: {userData.socialLinks.youtube}
            </li>
          )}
          {userData.socialLinks.facebook && (
            <li className="flex items-center">
              <FaFacebook className="text-blue-600 mr-3" /> Facebook: {userData.socialLinks.facebook}
            </li>
          )}
          {userData.socialLinks.twitter && (
            <li className="flex items-center">
              <FaTwitter className="text-blue-400 mr-3" /> Twitter: {userData.socialLinks.twitter}
            </li>
          )}
          {!Object.values(userData.socialLinks).some(link => link) && (
            <li>No social links available.</li>
          )}
        </ul>
      </div>

      {/* Account Status Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Account Status</h3>
        <p><strong>Verified:</strong> {userData.isAccountVerified ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default OverviewTab;
