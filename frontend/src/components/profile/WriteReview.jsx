import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContent } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const WriteReview = () => {
  const { userData, backendUrl } = useContext(AppContent);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("User : ", userData);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText) {
      toast.error('Please write a review before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        email: userData?.email,   // Get the email from AppContext
        name: userData?.name,     // Get the name from AppContext
        review: reviewText,
        rating,
      };

      const { data } = await axios.post(`${backendUrl}/reviews`, reviewData);

      if (data.success) {
        toast.success('Review submitted successfully');
        setReviewText('');
        setRating(1);
      } else {
        toast.error(data.message || 'Failed to submit the review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('An error occurred while submitting the review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-lg shadow-xl space-y-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h3
        className="text-3xl font-semibold text-gray-800 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Write a Review
      </motion.h3>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Review Text */}
        <div>
          <label className="block text-gray-700 font-medium">Your Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="5"
            className="w-full p-4 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all ease-in-out"
            placeholder="Write your review here..."
          />
        </div>

        {/* Rating Section with Icons */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 font-medium">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-200`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <FaStar size={30} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`bg-green-600 text-white p-4 rounded-lg w-full mt-6 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ease-in-out`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default WriteReview;
