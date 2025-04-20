import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap,} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { FaUserAlt } from 'react-icons/fa'; // Using FaUserAlt for user location
import { divIcon } from 'leaflet';
import L from "leaflet";

const SearchBox = ({ setVenues }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      searchLabel: 'Enter location...',
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result) => {
      const { location } = result;
      const confirmed = window.confirm(`Add "${location.label}" as a yoga venue?`);
      if (confirmed) {
        const name = prompt('Enter venue name:');
        const timeSlot = prompt('Enter time slot: morning or evening');

        if (name && timeSlot) {
          setVenues((prev) => [
            ...prev,
            {
              _id: Date.now(),
              name,
              timeSlot,
              location: { lat: location.y, lng: location.x },
              users: [],
            },
          ]);
        }
      }
    });

    return () => map.removeControl(searchControl);
  }, [map, setVenues]);

  return null;
};

const MapComponent = ({ venues, setVenues }) => {
  const [userLocation, setUserLocation] = useState(null);
const MapComponent = ({ venues, setVenues, userLocation, setUserLocation }) => {
  // const [userLocation, setUserLocation] = useState(null);

  // useEffect(() => {
  //   // Get user's current location using geolocation API
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setUserLocation({ lat: latitude, lng: longitude });
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //         // You can handle error here, e.g., set default location
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //     // Handle case if geolocation is not supported
  //   }
  // }, []);

  if (!userLocation) {
    return <div>Loading map...</div>; // Show loading while fetching location
  }

  // Custom User Icon using FaUserAlt from react-icons
  // const userIcon = divIcon({
  //   html: `<div style="font-size: 24px; color: red; text-align: center; cursor: pointer;"> ${<FaUserAlt />}</div>`,
  //   iconSize: [30, 30], // Size of the icon
  //   iconAnchor: [15, 30], // Anchor point for the icon
  // });

  

  const userIcon = L.divIcon({
    html: `<div style="font-size: 15px; color: red; text-align: center; cursor: pointer;">
            <i class="fas fa-user"></i>
          </div>`,
    iconSize: [20, 20],
    iconAnchor: [15, 30],
  });


  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SearchBox setVenues={setVenues} />

      {/* User's location marker */}
      <Marker
        position={[userLocation.lat, userLocation.lng]}
        icon={userIcon}
      >
        <Tooltip>Your Location</Tooltip>
      </Marker>

      {/* Venue markers */}
      {venues.map((venue) => (
      {/* {venues.map((venue) => (
        <Marker
          key={venue._id}
          position={[venue.location.lat, venue.location.lng]}
          icon={new L.Icon.Default()}
        >
          <Popup>
            <strong>{venue.name}</strong> <br />
            Morning: {venue.morningCount} <br />
            Evening: {venue.eveningCount}
          </Popup>

        </Marker>
      ))} */}
      {venues.map((venue) => (
      <Marker
        key={venue._id}
        position={[venue.location.lat, venue.location.lng]}
        icon={new L.Icon.Default()}
      >
        <Popup>
          <strong>{venue.name}</strong>
          <div>🧘‍♂️ Morning: <b>{venue.users?.filter((u) => u.slots.includes("Morning")).length || 0}</b></div>
          <div>🌇 Evening: <b>{venue.users?.filter((u) => u.slots.includes("Evening")).length || 0}</b></div>
        </Popup>
      </Marker>
))}

    </MapContainer>
  );
};

export default MapComponent;
