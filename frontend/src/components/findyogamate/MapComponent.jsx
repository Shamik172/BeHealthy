import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const SearchBox = ({ setVenues }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: true,
      showPopup: false,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Enter location...',
    });

    map.addControl(searchControl);

    // Hook into result click
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
            },
          ]);
        }
      }
    });

    return () => map.removeControl(searchControl);
  }, [map, setVenues]);

  return null;
};

const MapComponent = ({ userLocation, venues, setVenues }) => {
  return (
    <MapContainer
      center={userLocation || [20.5937, 78.9629]} // Center on India by default
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SearchBox setVenues={setVenues} />

      {venues.map((venue) => (
        <Marker
          key={venue._id}
          position={[venue.location.lat, venue.location.lng]}
          icon={new L.Icon({ iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png' })}
        >
          <Popup>
            <strong>{venue.name}</strong> <br />
            Slot: {venue.timeSlot}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
