const express = require("express");
const router = express.Router();
const { UserAuth } = require('../Middlewares/UserAuth.js'); 
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  toggleLike,
  toggleDislike,
  reportReview,
} = require("../Controllers/ReviewController.js");

// Route to get all reviews (with optional filters)
router.get("/", ()=>{
   console.log("Reviews Router response");
})

router.get("/", getReviews);

// // Route to create a new review
// router.post("/", UserAuth, createReview);

// // Route to update a review
// router.put("/:id", UserAuth, updateReview);

// // Route to delete a review
// router.delete("/:id", UserAuth, deleteReview);

// // Route to toggle like on a review
// router.post("/:id/like", UserAuth, toggleLike);

// // Route to toggle dislike on a review
// router.post("/:id/dislike", UserAuth, toggleDislike);

// // Route to report a review
// router.post("/:id/report", UserAuth, reportReview);

module.exports = router;
