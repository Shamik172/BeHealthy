import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { MdMenu, MdClose } from "react-icons/md";
import MusicPlayer from "./music/MusicPlayer";

function Navbar() {
  const { userData, setUserData, backendUrl, setIsLoggedin } =
    useContext(AppContent);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/auth/send-verify-otp`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success("Verification OTP sent successfully");
      } else {
        toast.error("Verification OTP failed");
      }
      console.log("Data received from backend after verify call:", data);
    } catch (error) {
      console.error("Error in sendVerificationOtp @Navbar", error);
      toast.error("Error sending OTP");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUserData({});
      setIsLoggedin(false);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const navLinks = [
    { to: "/", icon: "🏠", label: "Home" },
    { to: "/reviews", icon: "📝", label: "Reviews" },
    { to: "/bodyparts", icon: "💪", label: "Body Parts" },
    { to: "/diseases", icon: "🦠", label: "Diseases" },
    { to: "/aboutus", icon: "ℹ", label: "About Us" },
    { to: "/contactus", icon: "📞", label: "Contact Us" },
    { to: "/history", icon: "📜", label: "History" },
    { to: "/notifications", icon: "🔔", label: "Notifications" },
    { to: "/task", icon: "🔥", label: "Task" },
  ];

  const renderNavLink = (link, onClickExtra = () => {}) => (
    <div
      key={link.to}
      onClick={() => {
        navigate(link.to);
        onClickExtra();
      }}
      className={`cursor-pointer hover:text-yellow-300 text-white font-medium transition-all duration-200 flex items-center gap-1 ${
        location.pathname === link.to ? "underline underline-offset-4" : ""
      }`}
    >
      <span>{link.icon}</span> {link.label}
    </div>
  );

  return (
    <>
      <nav
        className={`${
          darkMode ? "bg-green-800" : "bg-green-600"
        } p-4 shadow-md z-50 relative`}
      >
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <div
            className="text-white text-3xl font-extrabold italic tracking-wide ml-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Yoga-Verse
          </div>

          {/* Desktop Nav */}
          <div className="space-x-8 hidden sm:flex flex-grow justify-center">
            {navLinks.map((link) => renderNavLink(link))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6 mr-4">
            <button
              onClick={toggleDarkMode}
              className="text-white text-2xl transition-transform hover:scale-125 hover:text-yellow-300 duration-300"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            {userData?.name ? (
              <div className="relative flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right text-white">
                  <p className="text-sm font-medium">
                    Welcome, {userData.name}
                  </p>
                  {userData.email && (
                    <p className="text-xs">{userData.email}</p>
                  )}
                </div>
                <div
                  className="w-10 h-10 flex items-center justify-center bg-white text-green-700 font-bold rounded-full cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {userData.name[0].toUpperCase()}
                </div>

                {showDropdown && (
                  <div className="absolute right-0 top-12 bg-white text-sm text-gray-700 shadow-lg rounded-lg w-44 p-3 z-50">
                    <ul className="space-y-2">
                      {!userData.isAccountVerified && (
                        <li
                          onClick={sendVerificationOtp}
                          className="cursor-pointer hover:text-green-600"
                        >
                          📧 Verify Email
                        </li>
                      )}
                      <li
                        onClick={handleLogout}
                        className="cursor-pointer hover:text-red-500"
                      >
                        🚪 Log Out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="border border-white rounded-full px-5 py-1 text-white hover:bg-white hover:text-green-600 transition-all duration-200"
                onClick={() => navigate("/auth")}
              >
                Login
              </button>
            )}

            {/* Toggle Music Player Visibility */}
            <button
              onClick={() => setIsMusicPlayerVisible(!isMusicPlayerVisible)}
              className="text-white text-2xl transition-transform hover:scale-125 hover:text-yellow-300 duration-300"
              title={
                isMusicPlayerVisible ? "Hide Music Player" : "Show Music Player"
              }
            >
              🎶
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={toggleSidebar}
              className="sm:hidden text-white text-3xl focus:outline-none"
            >
              {sidebarOpen ? <MdClose /> : <MdMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full w-64 z-40 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out ${
          darkMode ? "bg-green-900" : "bg-green-700"
        } text-white p-6`}
      >
        <div className="text-xl font-bold mb-6">Yoga-Verse</div>
        <div className="flex flex-col space-y-5">
          {navLinks.map((link) => renderNavLink(link, toggleSidebar))}

          <button
            onClick={() => {
              toggleDarkMode();
              toggleSidebar();
            }}
            className="flex items-center gap-2 mt-4 hover:text-yellow-300"
          >
            {darkMode ? "🌞" : "🌙"}{" "}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {userData?.name ? (
            <div className="mt-6">
              <div className="text-sm font-medium">{userData.name}</div>
              {!userData.isAccountVerified && (
                <div
                  onClick={() => {
                    sendVerificationOtp();
                    toggleSidebar();
                  }}
                  className="mt-2 cursor-pointer text-yellow-300"
                >
                  📧 Verify Email
                </div>
              )}
              <div
                onClick={() => {
                  handleLogout();
                  toggleSidebar();
                }}
                className="mt-2 cursor-pointer text-red-400"
              >
                🚪 Log Out
              </div>
            </div>
          ) : (
            <button
              className="border border-white rounded-full px-4 py-1 text-white mt-6"
              onClick={() => {
                navigate("/auth");
                toggleSidebar();
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Music Player */}
      {isMusicPlayerVisible && <MusicPlayer />}
    </>
  );
}

export default Navbar;
