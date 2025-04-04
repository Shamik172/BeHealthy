import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";

function ProfileDropdown({ isLoggedIn, setIsLoggedIn }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleProfile = () => setProfileOpen(!profileOpen);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleProfile} className="text-white text-2xl">
        <CiUser />
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          {/* Arrow Indicator */}
          <div className="absolute right-3 -top-2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>

          {/* Dropdown Content */}
          <div className="relative z-10 bg-white rounded-md shadow-lg">
            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              View Profile
            </Link>
            <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </Link>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(false); // Simulating Logout
                  setProfileOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <div className="flex justify-between p-2">
                <Link to="/login" className="w-1/2 text-center px-4 py-2 text-green-700 hover:bg-gray-100 border-r">
                  Login
                </Link>
                <Link to="/signup" className="w-1/2 text-center px-4 py-2 text-green-700 hover:bg-gray-100">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
