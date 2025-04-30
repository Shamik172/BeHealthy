// src/components/meditation/CategorySelector.jsx
import React from "react";

const CategorySelector = ({ selectedType, setSelectedType }) => {
  const categories = [
    { name: "All", emoji: "🎵" },
    { name: "Mindfulness", emoji: "🧘‍♀️" },
    // { name: "Breathing Exercises", emoji: "🌬️" },
    // { name: "Relaxation", emoji: "😌" },
    { name: "Focus", emoji: "🎯" },
    { name: "Sleep", emoji: "😴" },
    { name: "Nature-Based", emoji: "🌲" },
    { name: "Emotional Healing", emoji: "💖" },
    { name: "Spiritual", emoji: "🕉️" },
    { name: "Bhakti", emoji: "🙏" },
    { name: "Heart-Centered", emoji: "❤️" },
    { name: "Awareness", emoji: "👁️" }
  ];

  const handleCategoryClick = (category) => {
    setSelectedType(category.name);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full h-full sticky top-4 overflow-auto">
      <h3 className="text-xl font-bold mb-4 text-green-700 flex items-center gap-2">
        🧠 Meditation Types
      </h3>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index}>
            <button
              onClick={() => handleCategoryClick(category)}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors duration-200
                ${
                  selectedType === category.name
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
            >
              <span className="text-xl">{category.emoji}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelector;
