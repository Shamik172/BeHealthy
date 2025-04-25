import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Create Context
export const AppContent = createContext();

// Provider Component
export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL ;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});

  // Check Authentication Status
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/auth/is-auth`, { withCredentials: true });
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      toast.error("Auth check failed: " + error.message);
    }
  };

  // Fetch User Data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/data`, { withCredentials: true });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      toast.error("User data fetch failed: " + error.message);
    }
  };

  // Run on initial load
  useEffect(() => {
    getAuthState();
  }, []);

  // Shared values
  const value = {
    backendUrl,
    isLoggedin,
    userData,
    setIsLoggedin,
    setUserData,
    getUserData,
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};