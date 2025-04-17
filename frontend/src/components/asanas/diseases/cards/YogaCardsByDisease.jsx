import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DiseaseSidebar from "../sidebar/DiseaseSidebar";

function YogaCardsByDisease() {
  const [asanas, setAsanas] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState("");
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    const fetchAsanas = async () => {
      const query = selectedDisease ? `?disease=${encodeURIComponent(selectedDisease)}` : "";
      const url = `http://localhost:5050/asanas/by-disease${query}`;
  
    //   console.log("Fetching from:", url); // For debugging
      const res = await fetch(url);
      const data = await res.json();
    //   console.log("Fetched:", data); // For debugging
      setAsanas(data);
    };
  
    fetchAsanas();
  }, [selectedDisease]);
  

  const handleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <div className="flex min-h-screen">
      <DiseaseSidebar selectedDisease={selectedDisease} onSelect={setSelectedDisease} />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {selectedDisease
            ? `Yoga Asanas for ${selectedDisease}`
            : "Yoga for Healing & Prevention"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {asanas.map((pose) => {
            const isExpanded = expandedCardId === pose._id;

            return (
              <motion.div
                key={pose._id}
                layout
                className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 ${
                  isExpanded ? "col-span-full" : ""
                }`}
              >
                <img
                  src={pose.image}
                  alt={pose.name}
                  className={`w-full ${isExpanded ? "h-72" : "h-48"} object-cover`}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-green-600 mb-2">{pose.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Difficulty:</strong> {pose.difficulty}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Duration:</strong> {pose.duration}
                  </p>

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
                          <source src={pose.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}

                      {pose.history && (
                        <p className="text-sm text-gray-700 mt-2">
                          <strong>History:</strong> {pose.history}
                        </p>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => handleExpand(pose._id)}
                    className="mt-4 text-green-700 font-semibold underline"
                  >
                    {isExpanded ? "View Less" : "View More"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default YogaCardsByDisease;
