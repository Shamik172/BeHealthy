import React from "react";
import { calculateDistance } from "./CalculateDistance";

const VenueSelectionCard = ({
  selectedLocation,
  userLocation,
  selectedSlot,
  handleSlotSelection,
  handleAddVenue,
  setSelectedLocation,
}) => {
  if (!selectedLocation) return null;

  const distance =
    userLocation && selectedLocation
      ? calculateDistance(
          userLocation.lat,
          userLocation.lng,
          selectedLocation.lat || selectedLocation.y,
          selectedLocation.lng || selectedLocation.x
        ).toFixed(2)
      : null;

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white shadow-xl rounded-2xl p-6 border border-gray-200 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-3 text-gray-800">🎯 Selected Venue</h2>

      <p className="text-gray-800 font-medium mb-1">
        {selectedLocation.name || selectedLocation.label}
      </p>

      {distance && (
        <p className="text-sm text-gray-500 mb-4">
          📍 Distance: <span className="font-medium">{distance} km</span>
        </p>
      )}

      <div className="mb-5">
        <p className="text-sm font-semibold text-gray-700 mb-2">⏰ Choose a Time Slot</p>
        <div className="flex gap-3">
          <button
            onClick={() => handleSlotSelection("Morning")}
            className={`flex-1 py-2 rounded-lg border font-semibold transition duration-200 ${
              selectedSlot === "Morning"
                ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
            }`}
          >
            🌅 Morning
          </button>
          <button
            onClick={() => handleSlotSelection("Evening")}
            className={`flex-1 py-2 rounded-lg border font-semibold transition duration-200 ${
              selectedSlot === "Evening"
                ? "bg-purple-500 text-white border-purple-500 shadow-sm"
                : "bg-white text-gray-800 border-gray-300 hover:bg-purple-100"
            }`}
          >
            🌇 Evening
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <button
          onClick={handleAddVenue}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-200 shadow"
        >
          ✅ Add Venue
        </button>
        <button
          onClick={() => setSelectedLocation(null)}
          className="text-red-500 hover:underline font-semibold transition duration-200"
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  );
};

export default VenueSelectionCard;
