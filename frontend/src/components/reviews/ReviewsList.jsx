import { useContext, useState, useEffect } from "react";
import { AppContent } from "../../context/AppContext";
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash, FaFlag } from "react-icons/fa";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { toast } from "react-toastify";

function ReviewsList() {
  const { userData } = useContext(AppContent);
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState("recent");

  // Dummy data for reviews (for now, no backend)
  const dummyReviews = [
    { _id: 1, user: { name: "Alice", verified: true, _id: 1 }, content: "Great experience! Loved the yoga sessions.", likes: 5, dislikes: 1 },
    { _id: 2, user: { name: "Bob", verified: false, _id: 2 }, content: "The class was too fast for beginners.", likes: 3, dislikes: 4 },
    { _id: 3, user: { name: "Charlie", verified: true, _id: 3 }, content: "Excellent instructor and well-structured sessions.", likes: 10, dislikes: 0 },
    { _id: 4, user: { name: "David", verified: false, _id: 4 }, content: "Not my cup of tea, didn't enjoy it much.", likes: 1, dislikes: 5 },
    { _id: 5, user: { name: "Eva", verified: true, _id: 5 }, content: "Had an amazing time, will definitely come back!", likes: 8, dislikes: 2 },
    { _id: 6, user: { name: "Frank", verified: false, _id: 6 }, content: "The room was too hot, made it uncomfortable.", likes: 2, dislikes: 3 },
    { _id: 7, user: { name: "Grace", verified: true, _id: 7 }, content: "Fantastic yoga practice, highly recommend it!", likes: 9, dislikes: 1 },
    { _id: 8, user: { name: "Hannah", verified: true, _id: 8 }, content: "A bit too challenging for me, but great for advanced practitioners.", likes: 6, dislikes: 2 },
    { _id: 9, user: { name: "Isaac", verified: false, _id: 9 }, content: "It was okay, I thought it was a bit repetitive.", likes: 4, dislikes: 3 },
    { _id: 10, user: { name: "Jack", verified: true, _id: 10 }, content: "Absolutely loved it, I felt so much better afterward!", likes: 12, dislikes: 0 },
  ];

  useEffect(() => {
    // For now, just using the dummy data
    setReviews(dummyReviews);
  }, [sortBy]);

  const handleLike = (id) => {
    // Update likes count for the review
    setReviews(prevReviews => prevReviews.map(review =>
      review._id === id ? { ...review, likes: review.likes + 1 } : review
    ));
  };

  const handleDislike = (id) => {
    // Update dislikes count for the review
    setReviews(prevReviews => prevReviews.map(review =>
      review._id === id ? { ...review, dislikes: review.dislikes + 1 } : review
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(prevReviews => prevReviews.filter(review => review._id !== id));
      toast.success("Review deleted!");
    }
  };

  const handleReport = (id) => {
    toast.success("Review reported.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-800 dark:text-green-200">User Reviews</h2>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="p-1 rounded bg-green-200 text-green-900"
        >
          <option value="recent">Most Recent</option>
          <option value="top">Top Rated</option>
        </select>
      </div>

      {reviews.map((review) => (
        <div key={review._id} className="bg-green-50 dark:bg-green-800 p-4 rounded shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-green-900 dark:text-yellow-200">
                {review.user.name} {review.user.verified && <span className="text-xs bg-yellow-300 text-green-800 px-2 py-1 rounded-full">Verified</span>}
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm">{review.content}</p>
              <div className="flex gap-2 mt-2 text-green-700 dark:text-yellow-200">
                <button onClick={() => handleLike(review._id)}><FaThumbsUp /> {review.likes}</button>
                <button onClick={() => handleDislike(review._id)}><FaThumbsDown /> {review.dislikes}</button>
                <button onClick={() => handleReport(review._id)}><FaFlag /></button>
                <button><BsFillEmojiSmileFill /></button>
              </div>
            </div>

            {userData?.id === review.user._id && (
              <div className="flex flex-col items-end gap-2 text-green-600">
                <button onClick={() => handleDelete(review._id)}><FaTrash /></button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
