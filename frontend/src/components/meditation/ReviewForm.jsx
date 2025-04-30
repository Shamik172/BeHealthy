// src/components/meditation/ReviewForm.jsx
import React, { useState } from "react";

const ReviewForm = () => {
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = () => {
    // Handle review submission logic (e.g., sending it to the server)
    alert("Review submitted: " + reviewText);
  };

  return (
    <div className="bg-purple-100 p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your meditation experience..."
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleReviewSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewForm;
