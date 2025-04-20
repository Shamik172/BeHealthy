import React, { useState } from "react";
import ManualLocationInput from "./yogavenuehelper/ManualLocationInput";
import SearchBar from "./yogavenuehelper/SearchBar";
import VenueSelectionCard from "./yogavenuehelper/VenueSelectionCard";
import VenueList from "./yogavenuehelper/VenueList";
import MapComponent from "./MapComponent";
import { useLocation } from "./yogavenuehelper/useLocation";
import { calculateDistance } from "./yogavenuehelper/CalculateDistance";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Header from "./yogavenuehelper/Header";
import LocationDisplay from "./yogavenuehelper/LocationDisplay";
import { MdWarning } from "react-icons/md"; // Importing the warning icon from react-icons

const provider = new OpenStreetMapProvider();

const YogaVenue = () => {
  const {
    userLocation,
    locationDenied,
    locationName,
    address, //  Added this here for passing address to venueList
    manualLocationText,
    manualLocationResults,
    setManualLocationText,
    handleManualLocationSearch,
    selectManualLocation,
  } = useLocation();

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showSlotSelection, setShowSlotSelection] = useState(false);
  const [venues, setVenues] = useState([]);
  const [message, setMessage] = useState("");
  const [distanceToVenue, setDistanceToVenue] = useState(null);
  const [selectedVenueName, setSelectedVenueName] = useState("");
  const [userSelectedVenues, setUserSelectedVenues] = useState({
    Morning: [],
    Evening: [],
  });
  

  const handleSelectLocation = (location) => {
    const lat = location.y || location.lat;
    const lng = location.x || location.lng;
  
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      lat,
      lng
    );
  
    setSelectedLocation({
      ...location,
      lat,
      lng,
      distanceToVenue: distance,  // Add the distance to the location data
    });
    setDistanceToVenue(distance);
    setSelectedVenueName(location.label || location.name || "Selected Venue");
    setShowSlotSelection(false);
    setSelectedSlot(null);
    setSearchText("");
  };  

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };
  
  const handleAddVenue = () => {
    // Ensure both venue and slot are selected
    if (!selectedLocation || !selectedSlot) {
      setMessage("Please select a venue and a slot.");
      return;
    }
  
    const venueKey = `${selectedLocation.lat}-${selectedLocation.lng}`;
  
    // Get the user's selected venues for the current slot (e.g., Morning or Evening)
    const existingVenueKeysForSlot = userSelectedVenues[selectedSlot] || [];
  
    // Prevent selecting a different venue for the same slot
    if (existingVenueKeysForSlot.length > 0 && !existingVenueKeysForSlot.includes(venueKey)) {
      setMessage(
        <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md mb-4">
          <MdWarning className="w-6 h-6 mr-3" />
          <p className="text-sm">
            You’ve already selected a venue for{" "}
            <span className="font-bold text-blue-500">{selectedSlot}</span>. Only one venue per slot is allowed.
          </p>
        </div>
      );
      return;
    }
  
    // Prevent re-selecting the same venue for the same slot again
    if (existingVenueKeysForSlot.includes(venueKey)) {
      setMessage(
        <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md mb-4">
          <MdWarning className="w-6 h-6 mr-3" />
          <p className="text-sm">
            You've already selected this venue for{" "}
            <span className="font-bold text-blue-500">{selectedSlot}</span>.
          </p>
        </div>
      );
      return;
    }
  
    // Calculate the distance between the user and the selected venue
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      selectedLocation.lat,
      selectedLocation.lng
    );
  
    // Check if the venue already exists in the venues list
    const existingVenueIndex = venues.findIndex(
      (v) => v.lat === selectedLocation.lat && v.lng === selectedLocation.lng
    );
  
    // Clone the venues array for updates
    let updatedVenues = [...venues];
  
    if (existingVenueIndex !== -1) {
      // If the venue already exists, increment the count for the selected slot
      const updatedVenue = { ...updatedVenues[existingVenueIndex] };
      updatedVenue[selectedSlot] = (updatedVenue[selectedSlot] || 0) + 1;
      updatedVenues[existingVenueIndex] = updatedVenue;
    } else {
      // If it's a new venue, add it with the slot count initialized
      const newVenue = {
        _id: Date.now().toString(),
        name: selectedLocation.label,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        Morning: selectedSlot === "Morning" ? 1 : 0,
        Evening: selectedSlot === "Evening" ? 1 : 0,
        distance,
      };
      updatedVenues.push(newVenue);
    }
  
    // Update the list of all venues
    setVenues(updatedVenues);
  
    // Track which venue the user selected for each slot
    setUserSelectedVenues((prev) => ({
      ...prev,
      [selectedSlot]: [...(prev[selectedSlot] || []), venueKey],
    }));
  
    // Reset UI selections and messages
    setMessage("");
    setSelectedLocation(null);
    setSelectedSlot("");
    setDistanceToVenue(null);
    setSelectedVenueName("");
  };  
  

  const getSlotCount = (venue, slot) => venue?.[slot] || 0;

  const handleSelectSlot = (venueId, slot) => {
    // Find the venue by ID
    const venue = venues.find((v) => v._id === venueId);
    const venueKey = `${venue.lat}-${venue.lng}`; // Use lat-lng as a unique key
  
    const otherSlot = slot === "Morning" ? "Evening" : "Morning"; // Get the other slot
  
    // Get currently selected venues for morning and evening (if any)
    const morningVenueKey = userSelectedVenues["Morning"]?.[0];
    const eveningVenueKey = userSelectedVenues["Evening"]?.[0];
  
    // CASE 1: Slot already chosen with a *different venue* — Block selection
    if (
      userSelectedVenues[slot]?.length > 0 &&                     // Slot already selected
      !userSelectedVenues[slot].includes(venueKey)               // But not by this venue
    ) {
      setMessage(
        <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md mb-4">
          <MdWarning className="w-6 h-6 mr-3" />
          <p className="text-sm">
            You've already selected <b>{slot}</b> for a different venue.
          </p>
        </div>
      );
      return; // Prevent the action
    }
  
    // CASE 2: Other slot already chosen with a *different venue* — Block selection
    if (
      userSelectedVenues[otherSlot]?.length > 0 &&               // Other slot already selected
      userSelectedVenues[otherSlot][0] !== venueKey              // But not by this venue
    ) {
      setMessage(
        <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md mb-4">
          <MdWarning className="w-6 h-6 mr-3" />
          <p className="text-sm">
            You already chose the slot for <b>this venue</b>.
          </p>
        </div>
      );
      return; // Prevent the action
    }
  
    // CASE 3: Slot already selected by the same venue — Warn again
    if (userSelectedVenues[slot]?.includes(venueKey)) {
      setMessage(
        <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md mb-4">
          <MdWarning className="w-6 h-6 mr-3" />
          <p className="text-sm">
            You've already selected this venue for <b>{slot}</b>.
          </p>
        </div>
      );
      return; // Prevent duplicate count
    }
  
    // CASE 4: All conditions satisfied — Proceed with selection
  
    // Add venueKey to the selected slot
    setUserSelectedVenues((prev) => ({
      ...prev,
      [slot]: [...(prev[slot] || []), venueKey],
    }));
  
    // Update venue's slot count
    const updatedVenues = venues.map((v) =>
      v._id === venueId
        ? {
            ...v,
            [slot]: (v[slot] || 0) + 1,
          }
        : v
    );
  
    setVenues(updatedVenues); // Update state
    setMessage(""); // Clear any previous warning message
  };
  

  return (
    <div className="p-4 space-y-6">
      {userLocation ? (
        <div className="flex justify-center mb-6">
        <LocationDisplay address={address} /> 
      </div>
           
      ) : locationDenied ? (
        <ManualLocationInput
          manualLocationText={manualLocationText}
          setManualLocationText={setManualLocationText}
          manualLocationResults={manualLocationResults}
          selectManualLocation={selectManualLocation}
          handleManualLocationSearch={handleManualLocationSearch}
        />
      ) : (
        <p>Fetching your location...</p>
      )}

      {userLocation && (
        <>
          <Header />

          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            handleSelectLocation={handleSelectLocation}
            userLocation={userLocation}
            provider={provider}
            calculateDistance={calculateDistance}
          />

          <VenueSelectionCard
            selectedLocation={selectedLocation}
            userLocation={userLocation}
            selectedSlot={selectedSlot}
            handleSlotSelection={handleSlotSelection}
            handleAddVenue={handleAddVenue}
            showSlotSelection={showSlotSelection}
            setShowSlotSelection={setShowSlotSelection}
            setSelectedLocation={setSelectedLocation}
            distanceToVenue={distanceToVenue}
            selectedVenueName={selectedVenueName}
          />

          {message && <div className="text-red-500">{message}</div>}

          <VenueList
            venues={venues}
            handleSelectSlot={handleSelectSlot}
            getSlotCount={getSlotCount}
            address={address} // PASS IT HERE
          />


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
              getSlotCount={getSlotCount}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default YogaVenue;
