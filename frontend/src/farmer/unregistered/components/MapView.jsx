import React, { useEffect, useState } from "react";
import "../extra/MapStyles.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function MapUpdater({ location }) {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 13);
  }, [location, map]);
  return null;
}

function MapView({ locationProp }) {
  const [location, setLocation] = useState([7.2906, 80.6337]);

  useEffect(() => {
    if (locationProp) {
      setLocation(locationProp);
    }
  }, [locationProp]);

  return (
    <div>
      <MapContainer center={location} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={location}>
          <Popup>Office Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
