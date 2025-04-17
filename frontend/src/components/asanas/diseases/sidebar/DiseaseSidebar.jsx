import React, { useEffect, useRef, useState } from "react";

function DiseaseSidebar({ selectedDisease, onSelect }) {
  const [search, setSearch] = useState("");
  const listRef = useRef(null);

  const diseases = [
    "Headaches",
    "Body Pain",
    "Arthritis",
    "Heart Disease",
    "Digestive Disorders",
    "Anxiety",
    "Asthma",
    "Hypertension",
    "Diabetes",
    "Thyroid Disorders",
    "Depression"
  ];

  const diseaseIcons = {
    "Headaches": "🤕",
    "Body Pain": "💪",
    "Arthritis": "🦴",
    "Heart Disease": "❤️",
    "Digestive Disorders": "🍽️",
    "Anxiety": "😟",
    "Asthma": "🌬️",
    "Hypertension": "🩸",
    "Diabetes": "🍭",
    "Thyroid Disorders": "🦋",
    "Depression": "😞"
  };

  const filteredDiseases = diseases.filter(d =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const selectedEl = listRef.current?.querySelector(".selected-disease");
    if (selectedEl) {
      selectedEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedDisease]);

  return (
    <div className="w-64 p-4 bg-[#F0F9F4] shadow-md overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-green-50">
      <h2 className="text-xl font-bold text-[#2F855A] mb-4 text-center">
        🌱 Health Conditions
      </h2>

      <input
        type="text"
        placeholder="Search disease..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-[#A0AEC0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#68D391] bg-white text-[#2F855A]"
      />

      <ul className="space-y-2" ref={listRef}>
        {filteredDiseases.map((disease, index) => (
          <li
            key={index}
            onClick={() => onSelect(disease)}
            className={`cursor-pointer px-3 py-2 rounded-md font-medium transition-transform duration-150 flex items-center gap-2 ${
              selectedDisease === disease
                ? "bg-[#48BB78] text-white selected-disease"
                : "bg-white text-[#2F855A] hover:bg-[#C6F6D5] hover:scale-[1.02]"
            }`}
          >
            <span className="text-xl">{diseaseIcons[disease]}</span>
            {disease}
          </li>
        ))}

        <li
          onClick={() => onSelect("")}
          className={`cursor-pointer px-3 py-2 rounded-md font-medium transition-transform duration-150 flex items-center gap-2 ${
            selectedDisease === ""
              ? "bg-[#68D391] text-white"
              : "bg-[#EDF2F7] hover:bg-[#C6F6D5] hover:scale-[1.02]"
          }`}
        >
          <span className="text-xl">🌐</span> Show All
        </li>
      </ul>
    </div>
  );
}

export default DiseaseSidebar;
