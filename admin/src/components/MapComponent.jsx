import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // ✅ Import it here if you use the map only here

const MapComponent = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]} />
    </MapContainer>
  );
};

export default MapComponent;
