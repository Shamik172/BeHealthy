import React, { useEffect, useRef, useState } from 'react';

function DiseaseSidebar({ selectedDisease, onSelect }) {
  const [search, setSearch] = useState('');
  const listRef = useRef(null);
  const diseases = [
    'Headaches', 'Body Pain', 'Arthritis', 'Heart Disease',
    'Digestive Disorders', 'Anxiety', 'Asthma', 'Hypertension',
    'Diabetes', 'Thyroid Disorders', 'Depression'
  ];
  const diseaseIcons = {
    Headaches: '🤕', 'Body Pain': '💪', Arthritis: '🦴',
    'Heart Disease': '❤️', 'Digestive Disorders': '🍽️',
    Anxiety: '😟', Asthma: '🌬️', Hypertension: '🩸',
    Diabetes: '🍭', 'Thyroid Disorders': '🦋', Depression: '😞'
  };
  const filtered = diseases.filter(d => d.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const el = listRef.current?.querySelector('.selected-disease');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selectedDisease]);

  return (
    <div className="w-full md:w-64 p-4 bg-green-50 shadow-md overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-green-50">
      <h2 className="text-xl font-bold text-green-800 mb-4 text-center">🌱 Health Conditions</h2>
      <input
        type="text"
        placeholder="Search disease..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-green-800"
      />
      <ul className="space-y-2" ref={listRef}>
        {filtered.map((d, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(d)}
            className={`cursor-pointer px-3 py-2 rounded-md font-medium flex items-center gap-2 transition-transform duration-150 ${
              selectedDisease === d
                ? 'bg-green-300 text-white selected-disease'
                : 'bg-white text-green-800 hover:bg-green-100 hover:scale-102'
            }`}
          >
            <span className="text-xl">{diseaseIcons[d]}</span>
            {d}
          </li>
        ))}
        <li
          onClick={() => onSelect('')}
          className={`cursor-pointer px-3 py-2 rounded-md font-medium flex items-center gap-2 transition-transform duration-150 ${
            selectedDisease === ''
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

export default DiseaseSidebar;