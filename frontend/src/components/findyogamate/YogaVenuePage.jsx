import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { AppContent } from "../../context/AppContext";

const provider = new OpenStreetMapProvider();

const YogaVenue = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState({}); //  Added this here for passing address to LocationDisplay
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
  const [errorMsg, setErrorMsg] = useState(""); // Added error message state if distance more than 10km
  const {backendUrl} = useContext(AppContent);

  const {
    locationDenied,
    // locationName,
    setLocationName,
  } = useLocation({ setUserLocation, setAddress });

  // Fetch venues whenever userLocation or slot changes
  useEffect(() => {
    if (userLocation) {
      fetchNearbyVenues(userLocation.lat, userLocation.lng);
    }
  }, [userLocation]);

  const fetchAllVenueCounts = async (venuesList) => {
    try {
      const updatedVenues = await Promise.all(
        venuesList.map(async (venue) => {
          try {
            
            const res = await axios.get(`${backendUrl}/venue-stats/location/getlocation`, {
              params: { lat: venue.lat, lon: venue.lng },
            });
  
            const { morningCount, eveningCount } = res.data;
  
            return {
              ...venue,
              slotCounts: {
                Morning: morningCount,
                Evening: eveningCount,
              },
            };
          } catch (error) {
            console.error(`Failed to fetch stats for venue at (${venue.lat}, ${venue.lng})`, error);
            return venue; // fallback to venue without counts
          }
        })
      );
  
      setVenues(updatedVenues);
      console.log("Venues updated with slot counts:", updatedVenues);
    } catch (error) {
      console.error("Error fetching all venue counts:", error);
    }
  };
  

  const fetchNearbyVenues = async (lat, lng) => {
    try {
      const res = await axios.get("http://localhost:5050/venue/locations/nearby", {
        params: { lat, lng },
      });
  
      if (res.status === 200) {
        console.log("this is fetched data", res.data.data);
        const fetchedVenues = res.data.data.map((venue) => ({
          ...venue,
          lat: venue.location.coordinates[1],
          lng: venue.location.coordinates[0],
          name: venue.location.name,
          distance: venue.location.distance,
        }));
  
        console.log("fetchedVenues (from API):", fetchedVenues);
        
        // First set venues
        setVenues(fetchedVenues);
  
        // Then fetch slot counts separately
        fetchAllVenueCounts(fetchedVenues);
      }
    } catch (error) {
      console.error("Error fetching nearby venues:", error);
    }
  };
  

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
      distanceToVenue: distance, // Add the distance to the location data
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

  const handleAddVenue = async () => {
    if (!selectedLocation || !selectedSlot) {
      setMessage("Please select a venue and a slot.");
      return;
    }

    const venueKey = `${selectedLocation.lat}-${selectedLocation.lng}`;
    const existingVenueKeysForSlot = userSelectedVenues[selectedSlot] || [];

    // Prevent selecting a different venue for the same slot
    if (
      existingVenueKeysForSlot.length > 0 &&
      !existingVenueKeysForSlot.includes(venueKey)
    ) {
      setMessage(
        <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md mb-4">
          <MdWarning className="w-6 h-6 mr-3" />
          <p className="text-sm">
            You’ve already selected a venue for{" "}
            <span className="font-bold text-blue-500">{selectedSlot}</span>.
            Only one venue per slot is allowed.
          </p>
        </div>
      );
      return;
    }

    // Prevent re-selecting the same venue
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

    { console.log("selectedLocation: ", selectedLocation); }
    { console.log("selectedSlot: ", selectedSlot); }

    const url = "http://localhost:5050/venue/locations/save";
    try {
      const res = await axios.post(url, {
        location: selectedLocation,
        // slot: selectedSlot,
      });
      console.log("location: ", selectedLocation);
      console.log("slot: ", selectedSlot);
      console.log("res: ", res);

      // Proceed only if venue saved successfully
      if (res.status === 201 || res.status === 200) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          selectedLocation.lat,
          selectedLocation.lng
        );

        const existingVenueIndex = venues.findIndex(
          (v) =>
            v.lat === selectedLocation.lat && v.lng === selectedLocation.lng
        );

        let updatedVenues = [...venues];

        if (existingVenueIndex !== -1) {
          const updatedVenue = { ...updatedVenues[existingVenueIndex] };
          updatedVenue[selectedSlot] = (updatedVenue[selectedSlot] || 0) + 1;
          updatedVenues[existingVenueIndex] = updatedVenue;
        } else {
          const newVenue = {
            _id: Date.now().toString(),
            name: selectedLocation.label,
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
            distance,
          };
          updatedVenues.push(newVenue);
        }

        setVenues(updatedVenues);

        setUserSelectedVenues((prev) => ({
          ...prev,
          [selectedSlot]: [...(prev[selectedSlot] || []), venueKey],
        }));

        // Update venueStats for the selected slot
        const venueStatsUrl = "http://localhost:5050/venue-stats/location/putlocation";
      const venueStatsData = {
        lat: selectedLocation.lat,
        lon: selectedLocation.lng,
        slot: selectedSlot.toLowerCase(),
      };

      try {
        const statsUpdateRes = await axios.post(venueStatsUrl, venueStatsData);
        console.log("Venue stats updated successfully:", statsUpdateRes.data);

        const venueId = statsUpdateRes.data?.venueId;
        console.log("Venue ID (lat-lon):", venueId);

        if (venueId) {
          try {
            const statsFetchRes = await axios.get(
              "http://localhost:5050/venue-stats/location/getlocation",
              {
                params: {
                  lat: selectedLocation.lat,
                  lon: selectedLocation.lng,
                },
              }
            );
            const { morningCount, eveningCount } = statsFetchRes.data;
            console.log("Fetched slot counts:", { morningCount, eveningCount });

            const getVenueId = (lat, lng) => `${lat}-${lng}`;
            const updatedVenuesWithStats = updatedVenues.map((venue) =>
              getVenueId(venue.lat, venue.lng) === venueId
                ? {
                    ...venue,
                    slotCounts: {
                      Morning: morningCount,
                      Evening: eveningCount,
                    },
                  }
                : venue
            );

            setVenues(updatedVenuesWithStats);
            console.log("Updated venues with stats: ", updatedVenuesWithStats);
          } catch (err) {
            console.error("Failed to fetch venue stats after update:", err);
          }
        }
      } catch (error) {
        console.error("Error updating venue stats:", error);
      }

      // Clear selections after successful save
      setMessage("");
      setSelectedLocation(null);
      setSelectedSlot("");
      setDistanceToVenue(null);
      setSelectedVenueName("");
    }
  } catch (err) {
      console.error("Error in venue submission:", err);

      // If location already exists (handled by backend) and is valid:
      if (err.response && err.response.status === 400) {
        const message = err.response.data.message;
        if (message === "Location already exists") {
          console.log("Venue exists, proceeding with local update...");

          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            selectedLocation.lat,
            selectedLocation.lng
          );

          const existingVenueIndex = venues.findIndex(
            (v) =>
              v.lat === selectedLocation.lat && v.lng === selectedLocation.lng
          );

          let updatedVenues = [...venues];

          if (existingVenueIndex !== -1) {
            const updatedVenue = { ...updatedVenues[existingVenueIndex] };
            updatedVenue[selectedSlot] = (updatedVenue[selectedSlot] || 0) + 1;
            updatedVenues[existingVenueIndex] = updatedVenue;
          } else {
            const newVenue = {
              _id: Date.now().toString(),
              name: selectedLocation.label,
              lat: selectedLocation.lat,
              lng: selectedLocation.lng,
              distance,
            };
            updatedVenues.push(newVenue);
          }

          setVenues(updatedVenues);
          setUserSelectedVenues((prev) => ({
            ...prev,
            [selectedSlot]: [...(prev[selectedSlot] || []), venueKey],
          }));

          setMessage("");
          setSelectedLocation(null);
          setSelectedSlot("");
          setDistanceToVenue(null);
          setSelectedVenueName("");
        }
      } else {
        setMessage("Something went wrong. Please try again later.");
      }
    }
  };

  const getSlotCount = (venue, slot) => venue.slotCounts?.[slot] || 0;

  const handleSelectSlot = (venueId, slot) => {
    // Find the venue by ID
    const venue = venues.find((v) => v._id === venueId);
    console.log("ven: ", venue);
    const venueKey = `${venue.lat}-${venue.lng}`; // Use lat-lng as a unique key
    console.log(venueKey);

    const otherSlot = slot === "Morning" ? "Evening" : "Morning"; // Get the other slot

    // Get currently selected venues for morning and evening (if any)
    const morningVenueKey = userSelectedVenues["Morning"]?.[0];
    const eveningVenueKey = userSelectedVenues["Evening"]?.[0];

    // CASE 1: Slot already chosen with a *different venue* — Block selection
    if (
      userSelectedVenues[slot]?.length > 0 && // Slot already selected
      !userSelectedVenues[slot].includes(venueKey) // But not by this venue
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
      userSelectedVenues[otherSlot]?.length > 0 && // Other slot already selected
      userSelectedVenues[otherSlot][0] !== venueKey // But not by this venue
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

    console.log("venues: ", venues);
    console.log("Updated venues: ", updatedVenues);
    setVenues(updatedVenues); // Update state
    console.log("Updated venues state: ", updatedVenues);
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
          setUserLocation={setUserLocation} // passed for manualLocationInput
          setAddress={setAddress} // passed for manualLocationInput
          setLocationName={setLocationName} // passed for manualLocationInput
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
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />

          {errorMsg && (
            <p className="text-red-600 text-sm mt-2 text-center">{errorMsg}</p>
          )}

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

          {/* if venue location is more than 10km show the warning message from handleSearch in SearchBar */}
          {message && <div className="text-red-500">{message}</div>}

          <VenueList
            venues={venues}
            handleSelectSlot={handleSelectSlot}
            getSlotCount={getSlotCount}
            userSelectedVenues={userSelectedVenues} // so that morning and evening count reflected on venueList could be passed to mapComponent
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
              // setVenues={setVenues}
              getSlotCount={getSlotCount}
              userSelectedVenues={userSelectedVenues} // to get morning evening count from venueList
              userId="current-user-id" //{auth.user._id} // or wherever you're storing the current logged-in user's ID
            />
          </div>
        </>
      )}
    </div>
  );
};

export default YogaVenue;
