const Review = require('../Models/Review');

// Get all reviews (filter/sort optional)
const getReviews = async (req, res) => {
  const { sort = "-createdAt", limit = 50, asanaId } = req.query;
  const filter = asanaId ? { asanaId } : {};
  const reviews = await Review.find(filter)
    .sort(sort)
    .limit(Number(limit))
    .populate("user", "name isVerified");
  res.json(reviews);
};

// Create review
exports.createReview = async (req, res) => {
  const { comment, rating, asanaId } = req.body;

  const review = new Review({
    user: req.user._id,
    username: req.user.name,
    comment,
    rating,
    asanaId,
    isVerified: req.user.isVerified || false,
  });

  await review.save();
  res.status(201).json(review);
};

// Update review
exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });
  if (review.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Unauthorized" });

  review.comment = req.body.comment || review.comment;
  review.rating = req.body.rating || review.rating;
  await review.save();

  res.json(review);
};

// Delete review
exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });
  if (review.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Unauthorized" });

  await review.remove();
  res.json({ message: "Review deleted" });
};

// Toggle Like
exports.toggleLike = async (req, res) => {
  const review = await Review.findById(req.params.id);
  const userId = req.user._id.toString();
  if (!review) return res.status(404).json({ message: "Review not found" });

  if (review.likes.includes(userId)) {
    review.likes.pull(userId);
  } else {
    review.likes.push(userId);
    review.dislikes.pull(userId); // Remove dislike if liked
  }

  await review.save();
  res.json(review);
};

// Toggle Dislike
exports.toggleDislike = async (req, res) => {
  const review = await Review.findById(req.params.id);
  const userId = req.user._id.toString();
  if (!review) return res.status(404).json({ message: "Review not found" });

  if (review.dislikes.includes(userId)) {
    review.dislikes.pull(userId);
  } else {
    review.dislikes.push(userId);
    review.likes.pull(userId); // Remove like if disliked
  }

  await review.save();
  res.json(review);
};

// Report Review
exports.reportReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  const userId = req.user._id.toString();
  if (!review) return res.status(404).json({ message: "Review not found" });

  if (!review.reports.includes(userId)) {
    review.reports.push(userId);
    await review.save();
  }

  res.json({ message: "Reported successfully" });
};


module.exports = {getReviews}