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
      try {
        const res = await fetch(`http://localhost:5050/asanas/by-disease${query}`);
        const data = await res.json();
        setAsanas(data);
      } catch (err) {
        console.error("Failed to fetch asanas:", err);
      }
    };
    fetchAsanas();
  }, [selectedDisease]);

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
      link.download = `${pose.name.replace(/\s+/g, '_')}_Yoga_Video.mp4`;
      link.click();
    } else if (option === '2') {
      const image = pose.image || imageUrl;
      const link = document.createElement('a');
      link.href = image;
      link.download = `${pose.name.replace(/\s+/g, '_')}_Yoga_Image.jpg`;
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        {selectedDisease
          ? `Yoga Asanas for ${selectedDisease}`
          : 'Yoga for Health & Fitness'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {asanas.map(pose => {
          const isExpanded = expandedCardId === pose._id;
          return (
            <motion.div
              key={pose._id}
              layout
              className={`bg-orange-50 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${isExpanded ? 'col-span-full' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row">
                <img
                  src={pose.image || imageUrl}
                  alt={pose.name}
                  title={`Yoga pose: ${pose.name}`}
                  className={`w-full rounded-t-lg transition-all duration-300 ease-in-out bg-yellow-50 
                    ${isExpanded ? 'object-contain max-h-[700px] p-4 md:w-1/2' : 'h-80 object-cover'}`}
                />

                {isExpanded && (
                  <div className="flex-1 p-4">
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
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </>
                )}

                <div className="mt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => setExpandedCardId(isExpanded ? null : pose._id)}
                    className="text-green-700 font-semibold underline hover:text-green-800 transition"
                  >
                    {isExpanded ? 'View Less' : 'View More'}
                  </button>

                  <button
                    onClick={() => handleDownload(pose, '2')}
                    className="text-blue-700 font-semibold hover:text-blue-800 transition"
                  >
                    Download Image
                  </button>

                  <button
                    onClick={() => handleDownload(pose, '1')}
                    className="text-blue-700 font-semibold hover:text-blue-800 transition"
                  >
                    Download Video
                  </button>

                  <button
                    onClick={() => handleShare(pose)}
                    className="text-blue-700 font-semibold hover:text-blue-800 transition"
                  >
                    Share
                  </button>

                  <button
                    onClick={() => handleDownload(pose, '3')}
                    className="text-blue-700 font-semibold hover:text-blue-800 transition"
                  >
                    Download Details
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}