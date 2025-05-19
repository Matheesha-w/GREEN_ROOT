import React from "react";
import "../extras/mapStyles.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapLocate() {
  return (
    <div>
      <MapContainer center={[7.2906, 80.6337]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[7.2906, 80.6337]}>
          <Popup>Office Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapLocate;
