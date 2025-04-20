import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationDisplay = ({ address }) => {
    // console.log("Location Data:", address);
  if (!address) {
    return (
      <div className="text-center text-gray-500">
        <p>Address information is unavailable.</p>
      </div>
    );
  }

  // Access individual properties, ensuring that they are strings
  const city = address.city || "";
  const town = address.town || "";
  const village = address.village || "";
  const suburb = address.suburb || "";
  const county = address.county || "";
  const country = address.country || "";

  // Combine available address parts into a single string
  const addressParts = [city, town, village, suburb, county, country].filter(Boolean);  // Remove any undefined or empty strings
  const fullAddress = addressParts.join(", ");

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-100 to-teal-200 p-4 rounded-xl shadow-md max-w-sm mx-auto flex items-center justify-between space-x-4 border-t-4 border-teal-500 transform transition-all hover:scale-105 duration-300 ease-in-out">
      <div className="flex items-center space-x-4">
        <FaMapMarkerAlt className="text-teal-700 text-3xl" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Yoga Location</h3>
          <p className="text-sm text-gray-600 mt-1">{fullAddress || "Address information not available."}</p>
        </div>
      </div>
      <div className="flex justify-center items-center w-10 h-10 bg-teal-200 rounded-full shadow-md">
        <FaMapMarkerAlt className="text-teal-700 text-xl" />
      </div>
    </div>
  );
};

export default LocationDisplay;
