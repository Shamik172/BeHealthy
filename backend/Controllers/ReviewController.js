// controllers/reviewsController.js
const Review = require('../Models/Review.js');
const User = require('../Models/User.js');
const { validationResult } = require('express-validator');


const submitReview = async (req, res) => {
  const { email, name, review, rating} = req.body;
  const userId = req.user?.id;
  const user=userId;

  try {
    const newReview = new Review({
      user,
      email,
      name,
      review,
      rating,
      createdAt: new Date(),
    });
     console.log("Revies : ", newReview);
    await newReview.save();
    res.status(200).json({ success: true, message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to submit review' });
  }
};
// Create a review
const createReview = async (req, res) => {
  const { rating, review } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newReview = new Review({
      user: req.user.id, // Get user from the JWT payload
      name: req.user.name,
      email: req.user.email,
      rating,
      review,
    });

    await newReview.save();
    return res.status(201).json({
      success: true,
      message: 'Review created successfully',
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Get all reviews for a specific entity (e.g., instructor or product)
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email') // Populate user data to show name and email
      .sort({ createdAt: -1 }); // Sort by most recent first

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Edit a review
const editReview = async (req, res) => {
  const { review, rating } = req.body;

  try {
    const reviewToUpdate = await Review.findById(req.params.id);

    if (!reviewToUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Ensure the user is the owner of the review
    if (reviewToUpdate.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own review',
      });
    }

    reviewToUpdate.review = review;
    reviewToUpdate.rating = rating;

    await reviewToUpdate.save();
    return res.status(200).json({
      success: true,
      message: 'Review updated successfully',
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const reviewToDelete = await Review.findById(req.params.id);

    if (!reviewToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Ensure the user is the owner of the review
    if (reviewToDelete.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own review',
      });
    }

    await reviewToDelete.remove();
    return res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


module.exports ={
  submitReview,
  createReview,
  getReviews,
  editReview,
  deleteReview
}