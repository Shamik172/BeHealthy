import { useState } from "react";
import React from "react";

import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MdMenu, MdClose } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io"; // ✅ Notification Icon
import ProfileDropdown from "./ProfileDropdown"; // Importing the extracted dropdown

function Navbar({ unseenCount }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation(); // Get current path

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const markNotificationsSeen = () => {
    // Logic to mark notifications as seen
  };

  return (
    <>
      {/* Top Navbar (Always Visible) */}
      <nav className={`${darkMode ? "bg-green-800" : "bg-green-600"} p-4 shadow-md z-50 relative`}>
        <div className="flex justify-between items-center w-full">
          {/* Left-aligned Logo */}
          <div className="text-white text-3xl font-extrabold italic tracking-wide ml-4">
            Yoga-Verse
          </div>

          {/* Centered Links with Increased Spacing Between Icons */}
          <div className="space-x-8 hidden sm:flex flex-grow justify-center">
            <CustomNavLink to="/" icon="🏠" currentPath={location.pathname}>Home</CustomNavLink>
            {!isLoggedIn && (
              <>
                <CustomNavLink to="/reviews" icon="📝" currentPath={location.pathname}>Reviews</CustomNavLink>
                <CustomNavLink to="/bodyparts" icon="💪" currentPath={location.pathname}>Body Parts</CustomNavLink>
                <CustomNavLink to="/diseases" icon="🦠" currentPath={location.pathname}>Diseases</CustomNavLink>
                <CustomNavLink to="/aboutus" icon="ℹ️" currentPath={location.pathname}>About Us</CustomNavLink>
                <CustomNavLink to="/contactus" icon="📞" currentPath={location.pathname}>Contact Us</CustomNavLink>
                <CustomNavLink to="/history" icon="📜" currentPath={location.pathname}>History</CustomNavLink>
                <CustomNavLink
                  to="/notifications"
                  icon={
                    <span className="relative">
                      🔔
                      {unseenCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 animate-fadeIn">
                          {unseenCount}
                        </span>
                      )}
                    </span>
                  }
                  currentPath={location.pathname}
                  onClick={markNotificationsSeen}
                >
                  Notifications
                </CustomNavLink>
              </>
            )}
          </div>

          {/* Right-aligned Profile and Dark Mode Toggle */}
          <div className="flex items-center space-x-8 mr-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-white text-2xl transition-transform hover:scale-125 hover:text-yellow-300 duration-300"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            {/* Profile */}
            <div className="hidden sm:block">
              <ProfileDropdown isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={toggleSidebar} className="sm:hidden text-white text-3xl focus:outline-none">
              {sidebarOpen ? <MdClose /> : <MdMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full w-64 z-40 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out ${darkMode ? "bg-green-900" : "bg-green-700"} text-white p-6`}
      >
        <div className="text-xl font-bold mb-6">Yoga-Verse</div>

        <div className="flex flex-col space-y-5">
          <MobileNavLink to="/" icon="🏠" onClick={toggleSidebar}>Home</MobileNavLink>
          {!isLoggedIn && (
            <>
              <MobileNavLink to="/reviews" icon="📝" onClick={toggleSidebar}>Reviews</MobileNavLink>
              <MobileNavLink to="/bodyparts" icon="💪" onClick={toggleSidebar}>Body Parts</MobileNavLink>
              <MobileNavLink to="/diseases" icon="🦠" onClick={toggleSidebar}>Diseases</MobileNavLink>
              <MobileNavLink to="/aboutus" icon="ℹ️" onClick={toggleSidebar}>About Us</MobileNavLink>
              <MobileNavLink to="/contactus" icon="📞" onClick={toggleSidebar}>Contact Us</MobileNavLink>
              <MobileNavLink to="/notifications" icon="🔔" onClick={toggleSidebar}>Notifications</MobileNavLink>
            </>
          )}

          <button
            onClick={() => {
              toggleDarkMode();
              toggleSidebar();
            }}
            className="flex items-center gap-2 mt-4 hover:text-yellow-300"
          >
            {darkMode ? "🌞" : "🌙"}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <div className="pt-4">
            <ProfileDropdown isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </div>
        </div>
      </div>
    </>
  );
}

// Desktop NavLink with Icon
function CustomNavLink({ to, icon, children, currentPath, onClick }) {
  const isActive = currentPath === to; // Check if current path matches the link's path
  return (
    <RouterNavLink
      to={to}
      className={`relative text-white text-base font-medium transition-all duration-300 ${isActive ? 'font-bold' : ''} hover:scale-110 hover:text-yellow-300 flex items-center gap-1`}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      {children}
    </RouterNavLink>
  );
}

// Mobile NavLink with Icon
function MobileNavLink({ to, icon, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center space-x-2 px-2 py-2 rounded hover:bg-green-600 transition-colors duration-200 text-base"
    >
      <span className="text-lg">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

export default Navbar;
