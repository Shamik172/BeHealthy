const mongoose = require ("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    asanaId: { type: mongoose.Schema.Types.ObjectId, ref: "Asanas", required: true }, 
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
