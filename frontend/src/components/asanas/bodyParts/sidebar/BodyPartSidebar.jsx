import React, { useEffect, useRef, useState } from 'react';

const bodyPartIcons = {
  Head: "🧠", Neck: "🧍‍♂️", Eyes: "👁️", Shoulders: "🤷",
  "Upper Back": "🔙", Arms: "💪", Wrists: "✋", Forearms: "🦾",
  Back: "🪑", Spine: "🦴", Core: "🏋️", Hips: "🕺", Chest: "🫀",
  Heart: "❤️", Lungs: "🫁", Abdomen: "🧘", "Lower Back": "📦",
  Legs: "🦵", Knees: "🦿", Ankles: "🦶", Feet: "🦶", Calves: "🧦",
  "Full Body": "🧍", "Side Body": "↔️", Hamstrings: "🎯",
  Groin: "🚻", Thighs: "🥋", Balance: "⚖️"
};

function BodyPartSidebar({ selectedBodyPart, onSelect }) {
  const [search, setSearch] = useState('');
  const listRef = useRef(null);
  const parts = Object.keys(bodyPartIcons);

  const filtered = parts.filter(part =>
    part.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const el = listRef.current?.querySelector('.selected-body-part');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selectedBodyPart]);

  return (
    <div className="w-full md:w-64 p-4 bg-green-50 shadow-md overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-green-50">
      <h2 className="text-xl font-bold text-green-800 mb-4 text-center">💚 Body Parts</h2>
      <input
        type="text"
        placeholder="Search body part..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-green-800"
      />
      <ul className="space-y-2" ref={listRef}>
        {filtered.map((part, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(part)}
            className={`cursor-pointer px-3 py-2 rounded-md font-medium flex items-center gap-2 transition-transform duration-150 ${
              selectedBodyPart === part
                ? 'bg-green-300 text-white selected-body-part'
                : 'bg-white text-green-800 hover:bg-green-100 hover:scale-102'
            }`}
          >
            <span className="text-xl">{bodyPartIcons[part]}</span>
            {part}
          </li>
        ))}
        <li
          onClick={() => onSelect('')}
          className={`cursor-pointer px-3 py-2 rounded-md font-medium flex items-center gap-2 transition-transform duration-150 ${
            selectedBodyPart === ''
              ? 'bg-green-300 text-white'
              : 'bg-gray-100 hover:bg-green-100 hover:scale-102'
          }`}
        >
          <span className="text-xl">🌐</span> Show All
        </li>
      </ul>
    </div>
  );
}

export default BodyPartSidebar;
