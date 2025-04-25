import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import {AppContent} from "../../context/AppContextProvider";
import axios from 'axios';

export default function ProfilePage() {
  const { userData, logout } = useAuth(); // Assuming the user data is stored in context
  const [userAsanas, setUserAsanas] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user-specific asanas and reviews
  useEffect(() => {
    async function fetchUserData() {
      try {
        const [asanaRes, reviewsRes] = await Promise.all([
          axios.get(`/api/asanas/${userData.id}`), // Fetching user's asanas
          axios.get(`/api/reviews/${userData.id}`), // Fetching user's reviews
        ]);

        setUserAsanas(asanaRes.data);
        setUserReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (userData) {
      fetchUserData();
    }
  }, [userData]);

  return (
    <motion.div
      className="profile-page bg-gray-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Profile Section */}
      <motion.div
        className="profile-header flex justify-between items-center mb-8"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
      >
        <div className="profile-info">
          <h1 className="text-3xl font-semibold text-green-600">{userData.name}</h1>
          <p className="text-lg text-gray-700">{userData.email}</p>
        </div>
        <motion.button
          className="logout-btn text-white bg-red-500 p-2 rounded-md"
          onClick={logout}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Logout
        </motion.button>
      </motion.div>

      {/* Yoga Asanas Section */}
      <motion.div
        className="user-asanas mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-green-600">Your Asanas</h2>
        <div className="asanas-list mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <motion.div
              className="loading-spinner w-full h-40 bg-gray-200 rounded-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              Loading Asanas...
            </motion.div>
          ) : (
            userAsanas.map((asana) => (
              <motion.div
                key={asana.id}
                className="asana-card p-4 bg-white shadow-lg rounded-lg hover:shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <img
                  src={asana.image}
                  alt={asana.name}
                  className="asana-image w-full h-32 object-cover rounded-md"
                />
                <h3 className="text-xl font-medium text-green-600 mt-2">{asana.name}</h3>
                <p className="text-gray-600 text-sm">{asana.description}</p>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        className="user-reviews"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-green-600">Your Reviews</h2>
        <div className="reviews-list mt-4">
          {loading ? (
            <motion.div
              className="loading-spinner w-full h-40 bg-gray-200 rounded-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              Loading Reviews...
            </motion.div>
          ) : (
            userReviews.length > 0 ? (
              userReviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="review-card p-4 bg-white shadow-lg rounded-lg hover:shadow-xl mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-medium text-green-600">{review.title}</h3>
                  <p className="text-sm text-gray-700">{review.content}</p>
                  <div className="review-footer flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">Reviewed on: {review.date}</p>
                    <motion.button
                      className="delete-btn text-red-500"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                className="no-reviews text-lg text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                You haven't left any reviews yet.
              </motion.p>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
