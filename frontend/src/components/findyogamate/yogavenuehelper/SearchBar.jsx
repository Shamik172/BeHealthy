import React, { useEffect } from "react";
import { MapPin } from "lucide-react";

const SearchBar = ({
  searchText,
  setSearchText,
  setSearchResults,
  searchResults,
  handleSelectLocation,
  userLocation,
  provider,
  calculateDistance,
}) => {
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchText);
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSearch = async (text) => {
    if (!text || !userLocation) return;

    try {
      const res = await provider.search({ query: text });
      const filteredResults = res.filter((result) => {
        const lat = parseFloat(result.y || result.raw?.lat);
        const lon = parseFloat(result.x || result.raw?.lon);
        if (isNaN(lat) || isNaN(lon)) return false;

        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          lat,
          lon
        );
        return distance <= 10;
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error(error);
      alert("Error searching location.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search nearby yoga venues..."
        className="w-full px-5 py-3 text-sm rounded-xl border border-blue-200 bg-blue-50 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      {searchResults.length > 0 && (
        <ul className="mt-3 max-h-60 overflow-y-auto bg-blue-100 border border-blue-200 rounded-xl shadow-lg divide-y divide-blue-200 transition-all duration-200">
          {searchResults.map((result) => (
            <li
              key={`${result.label}-${result.x}-${result.y}`}
              onClick={() => {
                handleSelectLocation(result);
                setSearchResults([]);
              }}
              className="flex items-center gap-3 px-5 py-3 hover:bg-blue-200 cursor-pointer transition"
            >
              <MapPin className="text-blue-600 w-5 h-5" />
              <span className="text-sm font-medium text-blue-900">
                {result.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
