// src/pages/Meditation.jsx
import React, { useState } from "react";
import CategorySelector from "./CategorySelector";
import QuoteDisplay from "./QuoteDisplay";
import MusicPlayer from "./MusicPlayer";
import Timer from "./Timer";
import StreakData from "./StreakData";
import ReviewForm from "./ReviewForm";
import FunFacts from "./FunFacts";
import musicData from "./musicData";

const Meditation = () => {
  const [selectedType, setSelectedType] = useState("All");

  // Filter the musicData by the selected category
  const filteredTracks =
    selectedType === "All"
      ? musicData
      : musicData.filter((track) => track.category === selectedType);

  return (
    <div className="flex flex-col min-h-screen bg-green-50 text-gray-800">
      <div className="flex flex-grow p-4 gap-4">
        {/* Left Sidebar */}
        <aside className="w-1/5 bg-green-100 rounded-2xl p-4 shadow">
          <CategorySelector
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6 items-center justify-start p-4">
          <QuoteDisplay />

          {/* Pass the filtered array here */}
          <MusicPlayer musicTracks={filteredTracks} />

        </main>

        {/* Right Sidebar */}
        <aside className="w-1/5 bg-green-100 rounded-2xl p-4 shadow flex flex-col gap-4">
          <Timer />
          {/* <StreakData /> */}
          <ReviewForm />
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-green-200 p-4 mt-4">
        <FunFacts />
      </footer>
    </div>
  );
};

export default Meditation;
