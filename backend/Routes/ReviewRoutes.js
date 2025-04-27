// routes/reviews.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createReview, getReviews, editReview, deleteReview, submitReview } = require('../Controllers/ReviewController');
const UserAuth = require('../Middlewares/UserAuth.js');

// Create a review
router.post(
  '/',
  UserAuth,
  [
    check('rating', 'Rating is required and must be between 1 and 5').isInt({ min: 1, max: 5 }),
    check('review', 'Review text is required').not().isEmpty(),
  ],
  submitReview
);

// Get all reviews
router.get('/', getReviews);

// Edit a review
router.put('/:id', UserAuth, editReview);

// Delete a review
router.delete('/:id', UserAuth, deleteReview);

module.exports = router;
