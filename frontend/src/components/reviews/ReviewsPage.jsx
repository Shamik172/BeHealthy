import React, { useState } from "react";
import { Pagination } from "./Pagination";
import { WriteReviews } from "./WriteReviews";
import "./reviewStyle.css";
const ReviewsPage = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Priya Sharma",
      date: "February 15, 2023",
      rating: 5,
      text: "BeHealthy transformed my yoga practice with authentic Hatha Yoga sessions. The instructors are deeply knowledgeable about Indian traditions—highly recommended!",
      source: "Posted on YogaJournal.com",
    },
    {
      name: "Rajesh Patel",
      date: "February 20, 2023",
      rating: 5,
      text: "The pranayama and meditation classes are incredible. I feel more balanced thanks to BeHealthy's Indian yoga expertise.",
      source: "Posted on Yelp.com",
    },
    {
      name: "Anjali Kapoor",
      date: "March 1, 2023",
      rating: 4,
      text: "Great introduction to Vinyasa Yoga with an Indian twist. The live streams are a bonus—could use more variety.",
      source: "Posted on YogaJournal.com",
    },
    {
      name: "Vikram Singh",
      date: "March 5, 2023",
      rating: 5,
      text: "The yoga instructors bring the essence of Indian spirituality to every session. Life-changing experience!",
      source: "Posted on Yelp.com",
    },
    {
      name: "Sneha Reddy",
      date: "March 7, 2023",
      rating: 5,
      text: "Loved the guided meditation rooted in Indian philosophy. BeHealthy’s attention to detail is unmatched.",
      source: "Posted on YogaJournal.com",
    },
    {
      name: "Arjun Mehta",
      date: "March 10, 2023",
      rating: 4,
      text: "Solid yoga classes with Indian influences. The app interface could be smoother for live sessions.",
      source: "Posted on Yelp.com",
    },
    {
      name: "Meera Desai",
      date: "March 12, 2023",
      rating: 5,
      text: "BeHealthy’s Indian Yoga streams helped me master Surya Namaskar. Highly recommend to all yoga enthusiasts!",
      source: "Posted on YogaJournal.com",
    },
    {
      name: "Karan Joshi",
      date: "March 15, 2023",
      rating: 5,
      text: "The best platform for learning traditional Indian yoga. The instructors are patient and inspiring.",
      source: "Posted on Yelp.com",
    },
    {
      name: "Neha Gupta",
      date: "March 18, 2023",
      rating: 5,
      text: "Amazing experience with BeHealthy’s yoga sessions. The focus on Indian techniques is refreshing and effective.",
      source: "Posted on YogaJournal.com",
    },
    {
      name: "Rohan Sharma",
      date: "March 20, 2023",
      rating: 4,
      text: "Good yoga content with Indian roots. Would love more advanced pranayama sessions.",
      source: "Posted on Yelp.com",
    },
    {
      name: "Lakshmi Nair",
      date: "March 22, 2023",
      rating: 5,
      text: "BeHealthy’s Indian Yoga classes brought peace to my life. The live streams are a game-changer!",
      source: "Posted on YogaJournal.com",
    },
    {
      name: "Suresh Kumar",
      date: "March 25, 2023",
      rating: 5,
      text: "Exceptional yoga guidance with a true Indian touch. Highly recommend to anyone seeking wellness.",
      source: "Posted on Yelp.com",
    },
    {
      name: "Deepika Iyer",
      date: "March 28, 2023",
      rating: 4,
      text: "Enjoyed the Indian yoga sessions, especially the meditation. Could improve session timing notifications.",
      source: "Posted on YogaJournal.com",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-xl transition-transform duration-300 ${
          index < rating ? "text-yellow-400 scale-110" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  // Filter reviews based on search term
  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get popular reviews (top 2 by rating)
  const popularReviews = [...filteredReviews]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 2);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 animate-fade-in">
            See What Our Clients Have to Say
          </h1>
          <p className="mt-3 text-lg text-gray-600 animate-fade-in delay-100">
            Explore heartfelt reviews and testimonials from our happy clients
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-full text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105"
          >
            Write a Review
          </button>
        </div>

        <WriteReviews
          showForm={showForm}
          setShowForm={setShowForm}
          setReviews={setReviews}
          reviews={reviews}
          endIndex={endIndex}
          setCurrentPage={setCurrentPage}
        />

        <div className="bg-white shadow-2xl rounded-2xl p-8 animate-fade-in delay-200">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Reviews of Yoga-Verse
            </h2>
            <div className="mt-4 md:mt-0 w-full md:w-1/3">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search Reviews"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 transition-all duration-300"
                />
                <button
                  onClick={() => setSearchTerm(searchTerm)}
                  className="px-5 py-2 bg-purple-500 text-white rounded-r-full hover:bg-purple-600 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentReviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold text-gray-800">
                    {review.name}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">
                    {review.date}
                  </span>
                </div>
                <div className="flex mb-3">{renderStars(review.rating)}</div>
                <p className="text-gray-700 text-base leading-relaxed">
                  {review.text}
                </p>
                {/* <p className="text-gray-500 text-sm mt-2">{review.source}</p> */}
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                About BeHealthy
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yoga-Verse is more than a website—it's a holistic experience
                that blends ancient yoga wisdom with modern digital design. Our
                platform was created with a singular purpose: to make yoga
                accessible, enjoyable, and deeply personal for everyone.
              </p>
              <a
                href="#"
                className="text-purple-600 hover:text-purple-800 transition-colors duration-300 text-sm mt-2 inline-block"
              >
                www.yourdomain.com
              </a>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Popular Reviews
              </h3>
              {popularReviews.length > 0 ? (
                popularReviews.map((review, index) => (
                  <p
                    key={index}
                    className="text-gray-600 text-sm leading-relaxed"
                  >
                    "{review.text}"
                  </p>
                ))
              ) : (
                <p className="text-gray-600 text-sm leading-relaxed">
                  No popular reviews available.
                </p>
              )}
            </div>
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
