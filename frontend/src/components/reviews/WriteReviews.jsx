// WriteReviews.jsx
import { useState } from "react";

export const WriteReviews = ({
  showForm,
  setShowForm,
  setReviews,
  reviews,
  endIndex,
  setCurrentPage,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    rating: 5,
    text: "",
    source: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) {
      alert("Please fill in the required fields (Name and Review).");
      return;
    }
    const newReview = {
      ...formData,
      date: formData.date || new Date().toLocaleDateString(),
    };
    setReviews((prev) => [...prev, newReview]);
    setFormData({ name: "", date: "", rating: 5, text: "", source: "" });
    setShowForm(false);
    if (reviews.length + 1 > endIndex) {
      setCurrentPage(1);
    }
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setShowForm(false);
    }
  };

  return (
    <>
      {showForm && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Write Your Review
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`cursor-pointer text-2xl transition-colors duration-300 ${
                      star <= formData.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                placeholder="Your Review *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 h-24 resize-none"
                required
              />
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                placeholder="Source (e.g., YogaJournal.com)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};