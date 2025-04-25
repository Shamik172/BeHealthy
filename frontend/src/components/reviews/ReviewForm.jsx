import { useContext, useState, useEffect } from "react";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import {toast} from "react-toastify";

function ReviewForm() {
  const { userData, editingReview, setEditingReview } = useContext(AppContent);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingReview) {
      setContent(editingReview.content);
    }
  }, [editingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userData) return toast.error("Login required to post a review.");

      if (editingReview) {
        await axios.put(`/reviews/${editingReview._id}`, { content });
        toast.success("Review updated!");
        setEditingReview(null);
      } else {
        await axios.post("/reviews", { content });
        toast.success("Review posted!");
      }

      setContent("");
    } catch (err) {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="bg-green-100 dark:bg-green-900 p-4 rounded shadow-md mt-10">
      <h2 className="text-lg font-semibold mb-2 text-green-900 dark:text-yellow-100">
        {editingReview ? "Edit Your Review" : "Write a Review"}
      </h2>

      {!userData ? (
        <p className="text-red-500">Please log in to write a review.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience..."
            className="w-full p-2 rounded border border-green-300 bg-white text-green-900"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            {editingReview ? "Update" : "Post"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;
