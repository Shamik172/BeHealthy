import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Create Context
export const AppContent = createContext();

// Provider Component
export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
   // const backendUrl =  'https://yoga-healix.onrender.com';
  // User-related states
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});

  // Instructor-related states
  const [isInstructorLoggedIn, setIsInstructorLoggedIn] = useState(false);
  const [instructorData, setInstructorData] = useState({});

  // Check Authentication Status for user
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

  // Check Instructor Authentication Status
  const getInstructorAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/auth/instructor/is-auth`, { withCredentials: true });
      if (data.success) {
        setIsInstructorLoggedIn(true);
        getInstructorData();
      } else {
        setIsInstructorLoggedIn(false);
      }
    } catch (error) {
      toast.error("Instructor auth check failed: " + error.message);
    }
  };

  // Fetch Instructor Data
  const getInstructorData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/instructor/data`, { withCredentials: true });
      console.log("Instructor data : " , data);
      if (data.success) {
        setInstructorData(data.instructorData);
      } else {
        toast.error(data.message || "Failed to fetch instructor data");
      }
    } catch (error) {
      toast.error("Instructor data fetch failed: " + error.message);
    }
  };

  // Run on initial load (both for user and instructor)
  useEffect(() => {
    getAuthState();
    getInstructorAuthState();
  }, []);

  // Shared values
  const value = {
    backendUrl,
    isLoggedin,
    userData,
    setIsLoggedin,
    setUserData,
    getUserData,
    isInstructorLoggedIn,
    instructorData,
    setIsInstructorLoggedIn,
    setInstructorData,
    getInstructorData,
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};
