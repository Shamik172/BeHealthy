import axios from "axios";
import React, { useEffect, useState } from "react";


const VenueList = ({ venues, handleSelectSlot, getSlotCount, userSelectedVenues }) => {
  // Ensure that userSelectedVenues is always initialized
  const selectedVenues = userSelectedVenues || { Morning: [], Evening: [] };
  // console.log("veueslist: " ,venues)

  

  return (
    <div className="mt-6 max-w-3xl mx-auto">
      <div className="bg-blue-50 rounded-md py-2 px-4 text-center mb-6">
        <h2 className="text-xl font-semibold text-blue-900">🗓️ Today's Added Venues</h2>
      </div>

      {venues.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic bg-yellow-0 px-4 py-3 rounded-md border border-yellow-300 shadow-sm">
        🚫 No venues added yet for <span className="font-semibold text-yellow-700">Today</span>. Search or click to add!
      </p>
      
      ) : (
        <ul className="space-y-4">
          {venues.map((venue) => (
            <li
              key={venue._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-start gap-6">
                {/* Fixed-width Left Column: Name + Distance */}
                <div className="w-[220px] p-1 bg-gray-50 rounded-md">
                  <strong
                    className="block truncate text-green-600 text-[16px] font-medium hover:text-blue-700 transition"
                    title={venue.name}
                  >
                    {venue.name}
                  </strong>
                  {venue.distance && (
                    <p className="text-[13px] text-gray-500 mt-0.5">
                      Distance: {venue.distance.toFixed(2)} km
                    </p>
                  )}
                </div>

                {/* Fixed-width Right Column: Morning + Evening Buttons */}
                <div className="w-[300px] flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-blue-200 text-blue-800 px-3 py-1.5 rounded-lg shadow hover:bg-blue-300 transition text-sm"
                      onClick={() => handleSelectSlot(venue._id, "Morning")}
                      // disabled={selectedVenues["Morning"]?.length > 0 || selectedVenues["Evening"]?.length > 0}
                    >
                      🌅 Morning
                    </button>
                    <span className="text-sm font-semibold text-blue-600">
                      {getSlotCount(venue, "Morning")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="bg-purple-200 text-purple-800 px-3 py-1.5 rounded-lg shadow hover:bg-purple-300 transition text-sm"
                      onClick={() => handleSelectSlot(venue._id, "Evening")}
                      // disabled={selectedVenues["Evening"]?.length > 0 || selectedVenues["Morning"]?.length > 0}
                    >
                      🌇 Evening
                    </button>
                    <span className="text-sm font-semibold text-purple-600">
                      {getSlotCount(venue, "Evening")}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VenueList;
