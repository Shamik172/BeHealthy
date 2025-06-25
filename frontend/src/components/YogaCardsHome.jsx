import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Watch from './asanas/clock/Watch';
import { AppContent } from '../context/AppContext';

export default function YogaCardsHome({ selectedBodyPart }) {
  const [asanas, setAsanas] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const videoUrl = "https://res.cloudinary.com/dlixtmy1x/video/upload/v1745243364/Coming_Soon_Title_hgggmz.mp4";
  const imageUrl = "https://res.cloudinary.com/dlixtmy1x/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1745255612/thumbnail_bhhs7q.png";
  const {backendUrl} = useContext(AppContent);
  useEffect(() => {
    const fetchAsanas = async () => {
      const query = selectedBodyPart ? `?bodyPart=${encodeURIComponent(selectedBodyPart)}` : '';
      const res = await fetch(`${backendUrl}/asanas/by-body-part${query}`);
      const data = await res.json();
      const shuffledAsanas = shuffleArray(data);
      setAsanas(shuffledAsanas.slice(0, 9));
    };
    fetchAsanas();
  }, [selectedBodyPart]);

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleShare = (pose) => {
    const url = pose.video || imageUrl;
    const text = `
      Check out the yoga pose: ${pose.name}!
      Category: ${pose.category}
      Difficulty: ${pose.difficulty}
      Duration: ${pose.duration.min} - ${pose.duration.max}
      Benefits: ${pose.benefits.join(', ')}
      Steps: ${pose.steps.map(step => `${step.title}: ${step.description}`).join('\n')}
    `;

    if (navigator.share) {
      navigator.share({
        title: pose.name,
        text,
        url,
      }).catch(err => console.log("Share failed:", err));
    } else {
      alert('Share functionality is not supported on this browser.');
    }
  };

  const handleDownload = (pose, option) => {
    if (option === '1') {
      const video = pose.video || videoUrl;
      const link = document.createElement('a');
      link.href = video;
      link.download = `${pose.name.replace(/\s+/g, '_')}_Yoga_Video`;
      link.click();
    } else if (option === '2') {
      const image = pose.image || imageUrl;
      const link = document.createElement('a');
      link.href = image;
      link.download = `${pose.name.replace(/\s+/g, '_')}_Yoga_Image`;
      link.click();
    } else if (option === '3') {
      const textContent = `
        Yoga Pose: ${pose.name}
        Sanskrit Name: ${pose.sanskritName || 'N/A'}
        Category: ${pose.category}
        Difficulty: ${pose.difficulty}
        Duration: ${pose.duration.min} - ${pose.duration.max}
        Benefits: ${pose.benefits.join(', ')}
        Steps: ${pose.steps.map(step => `${step.title}: ${step.description}`).join('\n')}
      `;
      const blob = new Blob([textContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${pose.name.replace(/\s+/g, '_')}_Yoga_Details.txt`;
      link.click();
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        {selectedBodyPart
          ? `Yoga Asanas for ${selectedBodyPart}`
          : 'Yoga for Health & Fitness'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-green-50 gap-6">
        {asanas.map(pose => {
          const isExpanded = expandedCardId === pose._id;
          return (
            <motion.div
              key={pose._id}
              layout
              className={`bg-orange-40 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${isExpanded ? 'col-span-full' : ''}`}
            >
              <div className="flex">
                <img
                  src={isExpanded ? pose.image?.[1] || imageUrl : pose.image?.[0] || imageUrl}
                  alt={pose.name}
                  title={`Yoga pose: ${pose.name}`}
                  className={`w-full rounded-t-lg transition-all duration-300 ease-in-out object-contain bg-yellow-40 ${isExpanded ? 'max-h-[700px] p-4' : 'h-72 p-2'}`}
                />
                {isExpanded && (
                  <div className="flex-1 pl-4">
                    <Watch />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-600 mb-2">{pose.name}</h3>

                {pose.sanskritName && (
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Sanskrit Name:</strong> {pose.sanskritName}
                  </p>
                )}
                <p className="text-sm text-gray-700 mb-1"><strong>Category:</strong> {pose.category}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Difficulty:</strong> {pose.difficulty}</p>
                <p className="text-sm text-gray-700 mb-1"><strong>Duration:</strong> {pose.duration.min} - {pose.duration.max}</p>

                {isExpanded && (
                  <>
                    {pose.benefits?.length > 0 && (
                      <>
                        <p className="font-semibold text-sm">Benefits 🌱:</p>
                        <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
                          {pose.benefits.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      </>
                    )}

                    {pose.steps?.length > 0 && (
                      <>
                        <p className="font-semibold text-sm">How to do 🧘‍♀️:</p>
                        <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
                          {pose.steps.map((step, i) => (
                            <li key={i}><strong>{step.title}:</strong> {step.description}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {pose.video && (
                      <div className="my-4">
                        <video controls className="w-full rounded-lg shadow-md">
                          <source src={pose.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </>
                )}

                <div className="mt-4 flex justify-between flex-wrap gap-2">
                  <button
                    onClick={() => setExpandedCardId(isExpanded ? null : pose._id)}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-all"
                  >
                    {isExpanded ? 'Collapse' : 'View More'}
                  </button>

                  <button
                    onClick={() => handleShare(pose)}
                    className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600"
                  >
                    Share
                  </button>

                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDownload(pose, '1')}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      Video
                    </button>
                    <button
                      onClick={() => handleDownload(pose, '2')}
                      className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                    >
                      Image
                    </button>
                    <button
                      onClick={() => handleDownload(pose, '3')}
                      className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                    >
                      Text
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
