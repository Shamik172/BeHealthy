import React, { useEffect, useState } from 'react';
import MapComponent from '../findyogamate/MapComponent';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const YogaVenuePage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [venues, setVenues] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [manualLocationText, setManualLocationText] = useState('');
  const [manualLocationResults, setManualLocationResults] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [showSlotSelection, setShowSlotSelection] = useState(false);
  const [selections, setSelections] = useState([]);
  const [message, setMessage] = useState('');
  

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
        setLocationDenied(true);
      }
    );
  }, []);

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
        const distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lon);
        return distance <= 10;
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

    setSelectedLocation({ name, lat, lng });
    setSearchResults([]);
  };

  const handleSlotSelection = (slot) =>  {
    // console.log(venues);

    // {getSlotCount(venues[venues.length - 1], slot)}
    setSelectedSlot(slot);
    // setShowSlotSelection(false);
  }

  const handleAddVenue = async () => {
    if (!selectedSlot || !selectedLocation) {
      alert("Please select a location and a time slot.");
      return;
    }
  
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      selectedLocation.lat,
      selectedLocation.lng
    );
  
    // if (distance > 10) {
    //   alert("Selected location is more than 10km away. Please select a venue closer to your location.");
    //   return;
    // }
  
    // if (distance > 5 && distance <= 10) {
    //   const confirmAdd = window.confirm(
    //     `The selected location is ${distance.toFixed(2)} km away, which is more than 5km. Are you sure you want to add it?`
    //   );
    //   if (!confirmAdd) return;
    // }

    // Inside your component
    const newVenueId = `${selectedLocation.lat}_${selectedLocation.lng}_${selectedSlot}`;

    // Check if the venue with same slot already exists
    const venueExists = venues.some(venue => {
      const hasSlot = selectedSlot === 'Evening' ? venue.evening === 1 : venue.morning === 1;
      return `${venue._id}_${selectedSlot}` === newVenueId && hasSlot;
    });

    if (venueExists) {
      setMessage("You already chose that slot and venue.");
    } else {
      const baseVenueId = `${selectedLocation.lat}_${selectedLocation.lng}`;
      const oldVenue = venues.filter(venue => venue._id === baseVenueId);

      if (oldVenue.length === 0) {
        const newVenue = {
          _id: baseVenueId,
          name: selectedLocation.name,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          evening: selectedSlot === 'Evening' ? 1 : 0,
          morning: selectedSlot === 'Morning' ? 1 : 0,
          users: [],
        };

        setVenues(prev => [...prev, newVenue]);
        handleSelectSlot(newVenue._id, selectedSlot);
      } else {
        if (selectedSlot === 'Evening') {
          oldVenue[0].evening = 1;
        } else {
          oldVenue[0].morning = 1;
        }

        handleSelectSlot(oldVenue[0]._id, selectedSlot);
      }

      setMessage('');
    }

    // Reset UI selections
    setSelectedLocation(null);
    setSelectedSlot('');
    setShowSlotSelection(false);

  };


  const handleSelectSlot = (venueId, slot) => {
    const today = new Date().toISOString().slice(0, 10);
  
    // Prevent multiple selections for same venue + slot + day
    const alreadySelected = selections.some(
      (s) => s.venueId === venueId && s.slot === slot && s.date === today
    );
  
    if (!alreadySelected) {
      setSelections((prev) => [
        ...prev,
        { venueId, slot, date: today }
      ]);
    }
  };

  const getSlotCount = (venue, slot) => {
    // console.log(venue);
    const today = new Date().toISOString().slice(0, 10);
    return selections.filter(
      (s) => s.venueId === venue._id && s.slot === slot && s.date === today
    ).length;
  };  
  

  const handleManualLocationSearch = async (text) => {
    try {
      const res = await provider.search({ query: text });
      setManualLocationResults(res);
    } catch (error) {
      console.error(error);
      alert('Error fetching manual location.');
    }
  };

  const selectManualLocation = (loc) => {
    setUserLocation({ lat: loc.y, lng: loc.x });
    setLocationDenied(false);
    setManualLocationText('');
    setManualLocationResults([]);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowSlotSelection(false); // important!
    setSelectedSlot(null);       // optional: reset previous slot
  };  
  

  return (
    <div className="p-4 space-y-6">
      {userLocation ? (
        <div className="text-green-700 font-semibold">
          Your location is: Lat {userLocation.lat.toFixed(4)}, Lng {userLocation.lng.toFixed(4)}
        </div>
      ) : locationDenied ? (
        <div>
          <p className="text-red-600 font-medium">
            You didn't allow location. Please enter your location manually:
          </p>
          <input
            type="text"
            value={manualLocationText}
            onChange={(e) => {
              setManualLocationText(e.target.value);
              handleManualLocationSearch(e.target.value);
            }}
            placeholder="Enter your location..."
            className="border p-2 w-full max-w-md mt-2"
          />
          {manualLocationResults.length > 0 && (
            <ul className="mt-2 bg-white shadow rounded max-w-md">
              {manualLocationResults.map((res) => (
                <li
                  key={res.place_id}
                  onClick={() => selectManualLocation(res)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {res.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Fetching your location...</p>
      )}

      {userLocation && (
        <>
          <h1 className="text-2xl font-bold">Nearby Yoga Venues</h1>

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for a location..."
            className="border p-2 w-full max-w-md"
          />

          {searchResults.length > 0 && (
            <ul className="mt-2 space-y-1">
              {searchResults.map((result) => (
                <li
                  key={`${result.label}-${result.x}-${result.y}`}
                  onClick={() => handleSelectLocation(result)}
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                >
                  {result.label}
                </li>
              ))}
            </ul>
          )}

{selectedLocation && (
  <div className="bg-gray-100 p-4 rounded shadow mt-4">
    <p className="mb-2 font-semibold text-blue-700">
      Your chosen venue is: {calculateDistance(
        userLocation.lat,
        userLocation.lng,
        selectedLocation.lat,
        selectedLocation.lng
      ).toFixed(2)} km away
    </p>

    <p className="mb-2 font-semibold">
      Your chosen location is: {selectedLocation.name}
    </p>

    {/* Distance logic */}
    {calculateDistance(
      userLocation.lat,
      userLocation.lng,
      selectedLocation.lat,
      selectedLocation.lng
    ) > 10 ? (
      <div>
        <p>Your chosen venue is more than 10 km away. Please enter a nearer venue.</p>
      </div>
    ) : calculateDistance(
        userLocation.lat,
        userLocation.lng,
        selectedLocation.lat,
        selectedLocation.lng
      ) >= 5 && !showSlotSelection ? (
      <div>
        <p>
          Your chosen venue is {calculateDistance(
            userLocation.lat,
            userLocation.lng,
            selectedLocation.lat,
            selectedLocation.lng
          ).toFixed(2)} km away. Do you want to continue?
        </p>
        <button
          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => setShowSlotSelection(true)}
        >
          Yes
        </button>
        <button
          className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => {
            setSelectedLocation(null);
            setShowSlotSelection(false);
          }}
        >
          No
        </button>
      </div>
    ) : (
      <div>
        <div className="mb-2">
          <p className="font-semibold mb-1">Select your slot:</p>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${selectedSlot === 'Morning' ? 'bg-blue-600 text-white' : 'bg-blue-300'}`}
              onClick={() => handleSlotSelection('Morning')}
            >
              Morning
            </button>
            <button
              className={`px-3 py-1 rounded ${selectedSlot === 'Evening' ? 'bg-green-600 text-white' : 'bg-green-300'}`}
              onClick={() => handleSlotSelection('Evening')}
            >
              Evening
            </button>
          </div>
        </div>

        <button
          className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded"
          onClick={handleAddVenue}
        >
          Add Venue
        </button>
      </div>
    )}
  </div>
)}

{message && <div className="text-red-500 mb-2">{message}</div>}

{/* Display added venues */}
<div className="mt-4">
  <h2 className="font-semibold text-lg mb-2">Added Venues:</h2>
  {venues.length === 0 ? (
    <p className="text-gray-500">No venues yet. Search or click to add!</p>
  ) : (
    <ul className="space-y-2">
      {venues.map((venue) => (
        <li key={venue._id} className="bg-white p-3 shadow rounded">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <strong className="block mb-2 sm:mb-0">{venue.name}</strong>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded"
                  onClick={() => handleSelectSlot(venue._id, 'Morning')}
                >
                  🌅 Morning
                </button>
                <span className="font-bold text-blue-600">
                  {getSlotCount(venue, 'Morning')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-purple-100 text-purple-700 px-2 py-1 rounded"
                  onClick={() => handleSelectSlot(venue._id, 'Evening')}
                >
                  🌇 Evening
                </button>
                <span className="font-bold text-purple-600">
                  {getSlotCount(venue, 'Evening')}
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>






          {/* Map displaying venues */}
          <div className="mt-6">
            <MapComponent
              userLocation={userLocation}
              venues={venues.map((venue) => ({
                ...venue,
                location: {
                  lat: parseFloat(venue.lat),
                  lng: parseFloat(venue.lng),
                },
              }))}
              setVenues={setVenues}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default YogaVenuePage;
