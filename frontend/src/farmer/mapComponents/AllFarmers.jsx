import React, { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { useParams } from "react-router-dom";

function AllFarmers() {
  const { uid } = useParams();

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/field").then((res) => {
      setLocations(res.data.data);
    });
  }, []);

  //Icons

  const defaultIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <div className="w-4/5 h-3/4 rounded-lg shadow-lg overflow-hidden border border-gray-300">
        <MapContainer
          center={[7.3096, 80.7104]}
          zoom={9}
          className="w-full h-full rounded-lg"
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((element, index) => (
            <Marker
              key={index}
              position={[element.xcordinate, element.ycordinate]}
              icon={element.farmerID == uid ? redIcon : defaultIcon}
            >
              <Popup>{index + 1}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default AllFarmers;
