import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

const MapComponent = ({ venues, userLocation, getSlotCount, userSelectedVenues }) => {
  // console.log("venues: ", venues);
  // console.log("userLocation: ", userLocation);
  // console.log("selected venues: ",userSelectedVenues);

  if (!userLocation) {
    return <div>Loading map...</div>;
  }

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

      {/* User's location marker */}
      <Marker
        position={[userLocation.lat, userLocation.lng]}
        icon={userIcon}
      >
        <Tooltip>Your Location</Tooltip>
      </Marker>

      {/* Venue markers */}
      {venues.map((venue) => {
        const venueKey = `${venue.location.lat}-${venue.location.lng}`;  //as venueKey is used at handleSelectSlot in YogaVenuePage
        return (
          <Marker
            key={venue._id}
            position={[venue.location.lat, venue.location.lng]}
            icon={new L.Icon.Default()}
          >
            <Popup>
              <strong>{venue.name}</strong>
              <div>🧘‍♂️ Morning: <b>{getSlotCount(venue, "Morning")}</b></div>
              <div>🌇 Evening: <b>{getSlotCount(venue, "Evening")}</b></div>
            </Popup>
          </Marker>
        );
      })}

    </MapContainer>
  );
};

export default MapComponent;