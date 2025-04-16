import { useState } from "react";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io"; // ✅ Notification Icon
import ProfileDropdown from "./ProfileDropdown"; // Importing the extracted dropdown


function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change based on authentication

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className={`${darkMode ? "bg-green-800" : "bg-green-600"} p-4 shadow-md z-50 relative`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">Yoga-Verse</h1>

        {/* Navigation Links */}
        <div className="space-x-6 hidden sm:flex">
          <NavLink to="/">Home</NavLink>
          {!isLoggedIn && (
            <>
              <NavLink to="/reviews">Reviews</NavLink>
              <NavLink to="/aboutus">AboutUs</NavLink>
              <NavLink to="/contactus">ContactUs</NavLink>
              <NavLink to="/asanas">Asanas</NavLink>
              <NavLink to="/notifications">
                <div className="flex items-center gap-1">
                  <IoMdNotificationsOutline className="text-lg" />
                  <span>Notifications</span>
                </div>
              </NavLink>
            </>
          )}
        </div>

        {/* Right Section: Dark Mode & Profile */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-white mb-1 text-2xl transition-transform transform hover:scale-125 hover:text-yellow-300 duration-300"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <MdLightMode className="animate-pulse" /> : <MdDarkMode />}
          </button>

          {/* Profile Dropdown */}
          <ProfileDropdown isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>
    </nav>
  );
}

// Custom NavLink Component with Zoom-in Effect and Color Change
function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="relative text-white text-base font-medium transition-all duration-300 hover:scale-110 hover:text-yellow-300"
    >
      {children}
    </Link>
  );
}

export default Navbar;
