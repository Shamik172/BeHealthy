import React, { useEffect, useState } from "react";
import LocationDisplay from "./LocationDisplay"; // Shows selected location info
import { AlertTriangle, Search, MapPin } from "lucide-react"; // Ensure AlertTriangle is imported

const ManualLocationInput = ({ setUserLocation, setAddress, setLocationName }) => {
  const [manualLocationText, setManualLocationText] = useState(""); // User-typed input
  const [manualLocationResults, setManualLocationResults] = useState([]); // Search results
  const [selectedLocation, setSelectedLocation] = useState(null); // Selected result
  const [errorMsg, setErrorMsg] = useState(""); // Error message (if any)

  // Debounce search: Wait 400ms after user stops typing
  useEffect(() => {
    const delay = setTimeout(() => {
      if (manualLocationText) handleManualLocationSearch(manualLocationText);
    }, 400);
    return () => clearTimeout(delay); // Cleanup on retype
  }, [manualLocationText]);

  // Call Nominatim API to search by query string
  const handleManualLocationSearch = async (query) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
      );
      const data = await res.json();
      if (data.length === 0) setErrorMsg("No locations found.");
      else setErrorMsg("");
      setManualLocationResults(data); // Save search results
    } catch (err) {
      console.error(err);
      setErrorMsg("Error fetching locations.");
    }
  };

  // Handle click on a specific location from dropdown
  const handleSelectManualLocation = async (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    console.log("manual lat and lon:", lat, lon);

    if (!isNaN(lat) && !isNaN(lon)) {
      setUserLocation({ lat, lng: lon }); // Update parent with coordinates

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data = await res.json();
        const addressData = data.address || {};

        // Prefer city, town, etc. for user-friendly location name
        const name =
          addressData.city ||
          addressData.town ||
          addressData.village ||
          addressData.suburb ||
          addressData.county;

        // Update UI and parent state
        setAddress(addressData);
        setLocationName(name || "Unknown Location");
        setSelectedLocation({
          address: addressData,
          name: name || "Unknown Location",
        });

        console.log("Final address:", addressData);
      } catch (err) {
        console.error("Reverse geocoding failed:", err);
        setLocationName("Unknown Location");
        setAddress({});
      }
    } else {
      console.error("Invalid lat/lon from selected manual location");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl">
      {/* Info text for user */}
      <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4 shadow-sm">
        <AlertTriangle className="text-yellow-600 w-5 h-5" />
        <p className="text-sm text-yellow-800 font-semibold">
          Location access was denied! Please enter your location manually below.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-5">
        <input
          type="text"
          value={manualLocationText}
          onChange={(e) => setManualLocationText(e.target.value)}
          placeholder="Search your location..."
          className="w-full pl-12 pr-4 py-3 text-sm rounded-2xl border text-green-700 border-blue-200 bg-blue-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-blue-400"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
      </div>

      {/* Location Dropdown */}
      {manualLocationResults.length > 0 && (
        <ul className="mt-2 max-h-64 overflow-y-auto bg-white border border-blue-200 rounded-2xl shadow-lg divide-y divide-blue-100 animate-fade-in">
          {manualLocationResults.map((result) => (
            <li
              key={`${result.display_name}-${result.lat}-${result.lon}`}
              onClick={() => handleSelectManualLocation(result)}
              className="flex items-start gap-3 px-5 py-3 hover:bg-blue-50 cursor-pointer transition-all"
            >
              <MapPin className="text-blue-600 w-5 h-5 mt-0.5" />
              <span className="text-sm text-blue-900 leading-snug">
                {result.display_name}
              </span>
            </li>
          ))}
        </ul>
      )}


      {/* Error message */}
      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

      {/* Location info display */}
      {selectedLocation && (
        <div className="mt-5 border-t pt-4">
          <LocationDisplay
            address={selectedLocation.address}
            locationName={selectedLocation.name}
          />
        </div>
      )}
    </div>
  );
};

export default ManualLocationInput;
