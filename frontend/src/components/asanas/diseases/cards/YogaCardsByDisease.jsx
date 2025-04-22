import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Watch from '../../clock/Watch';

export default function YogaCardsByDisease({ selectedDisease }) {
  const [asanas, setAsanas] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const videoUrl = "https://res.cloudinary.com/dlixtmy1x/video/upload/v1745243364/Coming_Soon_Title_hgggmz.mp4";
  const imageUrl = "https://res.cloudinary.com/dlixtmy1x/image/upload/v1745255612/thumbnail_bhhs7q.png";

  useEffect(() => {
    const fetchAsanas = async () => {
      const query = selectedDisease ? `?disease=${encodeURIComponent(selectedDisease)}` : '';
      const res = await fetch(`http://localhost:5050/asanas/by-disease${query}`);
      const data = await res.json();
      setAsanas(data);
    };
    fetchAsanas();
  }, [selectedDisease]);

  return (
    <>
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        {selectedDisease
          ? `Yoga Asanas for ${selectedDisease}`
          : 'Yoga for Healing & Prevention'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {asanas.map(pose => {
          const isExpanded = expandedCardId === pose._id;
          return (
            <motion.div
              key={pose._id}
              layout
              className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 ${isExpanded ? 'col-span-full' : ''}`}
            >
              <div className="flex">
                <img
                  src={ imageUrl}
                  alt={pose.name}
                  title={`Yoga pose: ${pose.name}`}
                  className={`w-full h-full object-cover rounded-t-lg ${isExpanded ? 'aspect-video max-h-[600px]' : 'h-48'}`}
                />
                {isExpanded && (
                  <div className="flex-1 pl-4">
                    <Watch /> {/* Watch appears when the card is expanded */}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-600 mb-2">{pose.name}</h3>
                <p className="text-sm text-gray-700 mb-1"><strong>Difficulty:</strong> {pose.difficulty}</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Duration:</strong> {pose.duration}</p>
                <ul className="text-gray-700 text-sm mb-2 list-disc list-inside">
                  {pose.benefits?.slice(0, isExpanded ? pose.benefits.length : 2).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                {isExpanded && (
                  <>
                    <p className="font-semibold text-sm text-gray-800">How to do:</p>
                    <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                      {pose.steps?.map((step, i) => <li key={i}>{step}</li>)}
                    </ul>
                    {pose.video && (
                      <video controls className="w-full rounded-md my-2">
                        <source src={videoUrl} type="video/mp4" />
                      </video>
                    )}
                    {pose.history && (
                      <p className="text-sm text-gray-700 mt-2"><strong>History:</strong> {pose.history}</p>
                    )}
                  </>
                )}
                <button
                  onClick={() => setExpandedCardId(isExpanded ? null : pose._id)}
                  className="mt-4 text-green-700 font-semibold underline"
                >
                  {isExpanded ? 'View Less' : 'View More'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
