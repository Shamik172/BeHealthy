import React, { useEffect, useState } from 'react';
import MapComponent from '../findyogamate/MapComponent';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

// Helper function to calculate distance between two points in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};

const YogaVenuePage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [venues, setVenues] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const provider = new OpenStreetMapProvider();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        alert('Location permission denied. You can still search manually.');
      }
    );
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchText);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSearch = async (text) => {
    if (!text || !userLocation) return;

    try {
      const res = await provider.search({ query: text });

      // Filter results to only include those within 10km
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

        return distance <= 10; // Only include locations within 10km
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error(error);
      alert('Error searching location.');
    }
  };

  const handleSelectLocation = (location) => {
    const lat = parseFloat(location.y || location.raw?.lat);
    const lng = parseFloat(location.x || location.raw?.lon);
    const name = location.label;

    if (isNaN(lat) || isNaN(lng)) {
      alert('Invalid location coordinates. Please try again.');
      return;
    }

    setSelectedLocation({
      name,
      location: { lat, lng },
    });
    setSearchResults([]);
  };

  const handleSlotSelection = (slot) => {
    if (!selectedLocation) return;

    const existingVenue = venues.find(
      (v) => v.name === selectedLocation.name
    );

    const userName = 'User1'; // replace with actual user context later

    if (existingVenue) {
      const userIndex = existingVenue.users.findIndex(
        (u) => u.name === userName
      );

      if (userIndex !== -1) {
        if (!existingVenue.users[userIndex].slots.includes(slot)) {
          existingVenue.users[userIndex].slots.push(slot);
        }
      } else {
        existingVenue.users.push({ name: userName, slots: [slot] });
      }

      setVenues([...venues]);
    } else {
      const newVenue = {
        _id: Date.now(),
        name: selectedLocation.name,
        location: selectedLocation.location,
        users: [{ name: userName, slots: [slot] }],
      };

      setVenues((prev) => [...prev, newVenue]);
    }

    setSelectedLocation(null);
  };

  const getSlotCount = (venue, slot) => {
    return venue.users.reduce(
      (acc, user) => (user.slots.includes(slot) ? acc + 1 : acc),
      0
    );
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Nearby Yoga Venues</h1>

      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for a location..."
        className="border p-2 w-full max-w-md mb-4"
      />

      {searchResults.length > 0 && (
        <ul className="mt-2 space-y-1">
          {searchResults.map((result) => (
            <li
              key={result.place_id}
              onClick={() => handleSelectLocation(result)}
              className="cursor-pointer text-blue-500 hover:text-blue-700"
            >
              {result.label}
            </li>
          ))}
        </ul>
      )}

      {selectedLocation && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="mb-2 font-semibold">
            Your chosen location is: {selectedLocation.name}
          </p>
          <p className="mb-2">Select your slot:</p>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => handleSlotSelection('Morning')}
            >
              Morning (
              {getSlotCount(
                venues.find((v) => v.name === selectedLocation.name) || {
                  users: [],
                },
                'Morning'
              )}
              )
            </button>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => handleSlotSelection('Evening')}
            >
              Evening (
              {getSlotCount(
                venues.find((v) => v.name === selectedLocation.name) || {
                  users: [],
                },
                'Evening'
              )}
              )
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h2 className="font-semibold text-lg mb-2">Added Venues:</h2>
        {venues.length === 0 ? (
          <p className="text-gray-500">No venues yet. Search or click to add!</p>
        ) : (
          <ul className="space-y-2">
            {venues.map((venue) => (
              <li key={venue._id} className="bg-white p-3 shadow rounded">
                <strong>{venue.name}</strong> — Morning: {getSlotCount(venue, 'Morning')} | Evening: {getSlotCount(venue, 'Evening')}
              </li>
            ))}
          </ul>
        )}
      </div>

      {userLocation ? (
        <MapComponent
          userLocation={userLocation}
          venues={venues.map((venue) => ({
            ...venue,
            location: {
              lat: parseFloat(venue.location.lat),
              lng: parseFloat(venue.location.lng),
            },
          }))}
          setVenues={setVenues}
        />
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default YogaVenuePage;
