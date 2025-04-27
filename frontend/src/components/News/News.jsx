import React, { useState, useEffect } from "react";

export const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          // "https://newsapi.org/v2/everything?q=yoga&from=2025-03-26&sortBy=publishedAt&apiKey=62974cff19654a8580912f3bc116245c"?
          "https://newsapi.org/v2/everything?q=yoga+health+benefits&language=en&sortBy=relevancy&apiKey=62974cff19654a8580912f3bc116245c"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.status !== "ok") {
          throw new Error("API returned an error status");
        }
        setNews(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading news...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!news || news.length === 0) {
    return <div className="p-4 text-gray-500">No news available.</div>;
  }

  return (
    <div className="bg-white px-4 sm:px-6 py-6 sm:py-8 rounded-lg shadow-lg">
      <h2 className="font-bold text-lg mb-3 border-b pb-2">Latest News</h2>
      <div className="space-y-3">
        {news.slice(0, 10).map((article, index) => (
          <div key={index} className="flex items-start space-x-3">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-16 h-16 object-cover rounded-md"
                loading="lazy"
              />
            )}
            <div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:text-blue-600 line-clamp-2"
              >
                {article.title}
              </a>
              <p className="text-gray-500 text-xs">
                {article.source?.name || "Unknown Source"} •{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
