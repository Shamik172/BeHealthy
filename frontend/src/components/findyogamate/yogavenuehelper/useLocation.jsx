//fetching location name using reverse geocoding and getting the lat lng
// useLocation.js
import { useEffect, useState } from "react";

export const useLocation = ({setUserLocation,setAddress}) => {
  // const [userLocation, setUserLocation] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [locationName, setLocationName] = useState("");
  // Address object to store the address details
  // e.g., { city: "City", town: "Town", village: "Village", suburb: "Suburb", county: "County" }
  // const [address, setAddress] = useState({});
  // const [manualLocationText, setManualLocationText] = useState(""); // For manual input text
  // const [manualLocationResults, setManualLocationResults] = useState([]); // For storing manual search results

  // Check if the browser supports geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationDenied(true);
      return;
    }

    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = { lat: latitude, lng: longitude };
        setUserLocation(coords);

        // Reverse geocoding to get the location name
        // Using OpenStreetMap Nominatim API for reverse geocoding
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            const name =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.suburb ||
              data.address?.county;

            setLocationName(name || "Unknown Location");
            setAddress(data.address || {}); // SET ADDRESS HERE
          })
          .catch((err) => {
            console.error("Reverse geocoding failed", err);
            setLocationName("Unknown Location");
          });
      },
      () => setLocationDenied(true)
    );
  }, [setUserLocation]);


  return {
    setAddress,        
    setLocationName, 
    locationDenied,
    locationName,
    // address, // RETURN THIS to get village,town used in venuList
  };
};


