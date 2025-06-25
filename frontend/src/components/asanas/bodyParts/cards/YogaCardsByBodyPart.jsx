import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Watch from '../../clock/Watch';
import { AppContent } from '../../../../context/AppContext';

export default function YogaCardsByBodyPart({ selectedBodyPart }) {
  const [asanas, setAsanas] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const videoUrl = "https://res.cloudinary.com/dlixtmy1x/video/upload/v1745243364/Coming_Soon_Title_hgggmz.mp4";
  const imageUrl = "https://res.cloudinary.com/dlixtmy1x/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1745255612/thumbnail_bhhs7q.png";

  useEffect(() => {
    const fetchAsanas = async () => {
      const query = selectedBodyPart ? `?bodyPart=${encodeURIComponent(selectedBodyPart)}` : '';
      const {backendUrl} = useContext(AppContent);
      const res = await fetch(`${backendUrl}/asanas/by-body-part${query}`);
      const data = await res.json();
      console.log("data : ", data);
      setAsanas(data);
    };
    fetchAsanas();
  }, [selectedBodyPart]);

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

  // Function to download image, video, or text
  const handleDownload = (pose, option) => {
    // const downloadOptions = prompt('Enter download option:\n1. Video\n2. Image\n3. Text');
    const downloadOptions = option;

    if (downloadOptions === '1') {
      const videoUrl = pose.video[0] || videoUrl;
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `${pose.name.replace(/\s+/g, '_')}_Yoga_Video`;
      link.click();
    } else if (downloadOptions === '2') {
      const image = pose.image[0] || imageUrl;
      const link = document.createElement('a');
      link.href = image;
      link.download = `${pose.name.replace(/\s+/g, '_')}_Yoga_Image`;
      link.click();
    } else if (downloadOptions === '3') {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {asanas.map(pose => {
          const isExpanded = expandedCardId === pose._id;
          return (
            <motion.div
              key={pose._id}
              layout
              className={`bg-orange-50 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${isExpanded ? 'col-span-full' : ''}`}
            >
              <div className="flex">
              <img
                  src={
                    isExpanded
                      ? pose.image?.[1] || imageUrl
                      : pose.image?.[0] || imageUrl
                  }
                  alt={pose.name}
                  title={`Yoga pose: ${pose.name}`}
                  className={`w-full rounded-t-lg transition-all duration-300 ease-in-out bg-yellow-50 
                 ${isExpanded ? 'object-contain max-h-[700px] p-4 ' : 'h-80 object-cover'}`}
                />

                {isExpanded && (
                  <div className="flex-1 pl-4">
                    <Watch />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-600 mb-2">{pose.name}</h3>

                {/* Sanskrit Name */}
                {pose.sanskritName && (
                  <p className="text-sm text-gray-700 mb-1">
                    <strong className="font-semibold">Sanskrit Name:</strong> {pose.sanskritName}
                  </p>
                )}
                {/* Category */}
                <p className="text-sm text-gray-700 mb-1">
                  <strong className="font-semibold">Category:</strong> {pose.category}
                </p>
                {/* Difficulty */}
                <p className="text-sm text-gray-700 mb-1">
                  <strong className="font-semibold">Difficulty:</strong> {pose.difficulty}
                </p>
                {/* Duration */}
                <p className="text-sm text-gray-700 mb-1">
                  <strong className="font-semibold">Duration:</strong> {pose.duration.min} - {pose.duration.max}
                </p>

                {/* Benefits */}
                {isExpanded && pose.benefits && (
                  <>
                    <p className="font-semibold text-sm text-gray-800">Benefits 🌱:</p>
                    <ul className="text-gray-700 text-sm mb-2 list-disc list-inside">
                      {pose.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Steps */}
                {isExpanded && pose.steps && (
                  <>
                    <p className="font-semibold text-sm text-gray-800">How to do 🧘‍♀️:</p>
                    <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                      {pose.steps.map((step, i) => (
                        <li key={i}><strong>{step.title}:</strong> {step.description}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Common Mistakes */}
                {isExpanded && pose.commonMistakes && (
                  <>
                    <p className="font-semibold text-sm text-gray-800">Common Mistakes ⚠️:</p>
                    <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                      {pose.commonMistakes.map((mistake, i) => (
                        <li key={i}><strong>{mistake.mistake}:</strong> {mistake.correction}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Precautions */}
                {isExpanded && pose.precautions && (
                  <>
                    <p className="font-semibold text-sm text-gray-800">Precautions 🚨:</p>
                    <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                      {pose.precautions.map((precaution, i) => (
                        <li key={i}>{precaution}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Modifications */}
                {isExpanded && pose.modifications && (
                  <>
                    <p className="font-semibold text-sm text-gray-800">Modifications 🔧:</p>
                    <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                      {pose.modifications.map((modification, i) => (
                        <li key={i}>{modification}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Chakra */}
                {isExpanded && pose.chakra && (
                  <p className="text-sm text-gray-700 mb-1">
                    <strong className="font-semibold">Chakra 🔮:</strong> {pose.chakra}
                  </p>
                )}

                {/* Preparatory and Follow-Up Poses */}
                {isExpanded && (
                  <>
                    <p className="font-semibold text-sm text-gray-800">Preparatory Poses 🧘‍♂️:</p>
                    <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                      {pose.preparatoryPoses.map((prepPose, i) => (
                        <li key={i}>{prepPose}</li>
                      ))}
                    </ul>
                    <p className="font-semibold text-sm text-gray-800">Follow-Up Poses 🔁:</p>
                    <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                      {pose.followUpPoses.map((followPose, i) => (
                        <li key={i}>{followPose}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Breath Instructions */}
                {isExpanded && pose.breathInstructions && (
                  <p className="text-sm text-gray-700 mb-1">
                    <strong className="font-semibold">Breathing Instructions 🌬️:</strong> {pose.breathInstructions}
                  </p>
                )}

                {/* Alignment Tips */}
                {isExpanded && pose.alignmentTips && (
                  <>
                    <p className="font-semibold text-sm text-gray-800">Alignment Tips 🧘‍♀️:</p>
                    <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                      {pose.alignmentTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Video */}
                {isExpanded && pose.video[0] !=="" && (
                  <div className="mt-4">
                    <video controls className="w-full rounded-md">
                      <source src={pose.video[0]} type="video/mp4" />
                    </video>
                    <p>  &copy; "Video content courtesy of Dr. Zio – Yoga Teacher, with gratitude for inspiring and guiding our yoga journey."</p>
                  </div>
                )}

                {isExpanded && pose.video[0] ==="" && (
                  <div className="mt-4">
                    <video controls className="w-full rounded-md">
                      <source src={pose.video[1]} type="video/mp4" />
                    </video>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleDownload(pose, 'image')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Download Image
                  </button>
                  <button
                    onClick={() => handleDownload(pose, 'video')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Download Video
                  </button>
                  <button
                    onClick={() => handleDownload(pose, 'text')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Download Text
                  </button>
                  <button
                    onClick={() => handleShare(pose)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Share
                  </button>
                </div>

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
