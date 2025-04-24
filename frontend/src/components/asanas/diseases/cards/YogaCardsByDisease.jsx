import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Watch from '../../clock/Watch';

export default function YogaCardsByDisease({ selectedDisease }) {
  const [asanas, setAsanas] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const videoUrl = "https://res.cloudinary.com/dlixtmy1x/video/upload/v1745243364/Coming_Soon_Title_hgggmz.mp4";
  const imageUrl = "https://res.cloudinary.com/dlixtmy1x/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1745255612/thumbnail_bhhs7q.png";

  useEffect(() => {
    const fetchAsanas = async () => {
      const query = selectedDisease ? `?disease=${encodeURIComponent(selectedDisease)}` : '';
      const res = await fetch(`http://localhost:5050/asanas/by-disease${query}`);
      const data = await res.json();
      // const shuffledAsanas = shuffleArray(data);
      // setAsanas(shuffledAsanas.slice(0, 10));
      setAsanas(data);
    };
    fetchAsanas();
  }, [selectedDisease]);



  const handleDownload = (url, type) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = type === 'image' ? 'asana-image.jpg' : 'asana-video.mp4';
    link.click();
  };

  const handleShare = (pose) => {
    const url = window.location.href;
    navigator.share ? navigator.share({
      title: `Yoga Pose: ${pose.name}`,
      text: `Check out this yoga pose: ${pose.name}. It's great for ${pose.diseases.join(', ')}.`,
      url: url
    }) : alert('Sharing not supported on this browser.');
  };

  const handleEmojiReaction = (poseId, emoji) => {
    console.log(`User reacted to pose ${poseId} with emoji: ${emoji}`);
    // Logic for saving the emoji reaction can be added here (e.g., send it to the backend)
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        {selectedDisease ? `Yoga Asanas for ${selectedDisease}` : 'Yoga for Health & Fitness'}
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
                  src={pose.image || imageUrl}
                  alt={pose.name}
                  title={`Yoga pose: ${pose.name}`}
                  className={`w-full h-full object-cover rounded-t-lg ${isExpanded ? 'aspect-video max-h-[600px]' : 'h-48'}`}
                />
                {isExpanded && (
                  <div className="flex-1 pl-4">
                    <Watch />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-600 mb-2">{pose.name}</h3>
                <p className="text-sm text-gray-700 mb-1"><strong>Sanskrit Name:</strong> {pose.sanskritName || 'N/A'}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Category:</strong> {pose.category}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Difficulty:</strong> {pose.difficulty}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Duration:</strong> {pose.duration.min} to {pose.duration.max}</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Diseases Targeted:</strong> {pose.diseases.join(', ')}</p>
                <ul className="text-gray-700 text-sm mb-2 list-disc list-inside">
                  {pose.benefits?.slice(0, isExpanded ? pose.benefits.length : 2).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                {isExpanded && (
                  <>
                    <p className="font-semibold text-sm text-gray-800">How to do:</p>
                    <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                      {pose.steps?.map((step, i) => (
                        <li key={i}>
                          <strong>{step.title}:</strong> {step.description}
                        </li>
                      ))}
                    </ul>

                    {pose.commonMistakes.length > 0 && (
                      <div>
                        <p className="font-semibold text-sm text-gray-800">Common Mistakes:</p>
                        <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                          {pose.commonMistakes.map((mistake, i) => (
                            <li key={i}><strong>{mistake.mistake}:</strong> {mistake.correction}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pose.precautions.length > 0 && (
                      <div>
                        <p className="font-semibold text-sm text-gray-800">Precautions:</p>
                        <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                          {pose.precautions.map((precaution, i) => <li key={i}>{precaution}</li>)}
                        </ul>
                      </div>
                    )}

                    {pose.modifications.length > 0 && (
                      <div>
                        <p className="font-semibold text-sm text-gray-800">Modifications:</p>
                        <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                          {pose.modifications.map((modification, i) => <li key={i}>{modification}</li>)}
                        </ul>
                      </div>
                    )}

                    <p className="font-semibold text-sm text-gray-800">Chakra:</p>
                    <p className="text-gray-600 text-sm">{pose.chakra}</p>

                    {pose.video && (
                      <video controls className="w-full rounded-md my-2">
                        <source src={pose.video} type="video/mp4" />
                      </video>
                    )}

                    {pose.history && (
                      <p className="text-sm text-gray-700 mt-2"><strong>History:</strong> {pose.history}</p>
                    )}
                  </>
                )}

                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => setExpandedCardId(isExpanded ? null : pose._id)}
                    className="text-green-700 font-semibold underline"
                  >
                    {isExpanded ? 'View Less' : 'View More'}
                  </button>

                  <button
                    onClick={() => handleDownload(pose.image || imageUrl, 'image')}
                    className="text-blue-700 font-semibold"
                  >
                    Download Image
                  </button>

                  <button
                    onClick={() => handleDownload(pose.video || videoUrl, 'video')}
                    className="text-blue-700 font-semibold"
                  >
                    Download Video
                  </button>

                  <button
                    onClick={() => handleShare(pose)}
                    className="text-blue-700 font-semibold"
                  >
                    Share
                  </button>
                </div>

                <div className="flex space-x-4 mt-2">
                  <button
                    onClick={() => handleEmojiReaction(pose._id, '👍')}
                    className="text-gray-600"
                  >
                    👍
                  </button>
                  <button
                    onClick={() => handleEmojiReaction(pose._id, '❤️')}
                    className="text-red-600"
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() => handleEmojiReaction(pose._id, '😄')}
                    className="text-yellow-600"
                  >
                    😄
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
