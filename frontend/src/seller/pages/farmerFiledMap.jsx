import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xPng from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { useParams } from 'react-router-dom';

// Fix for leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2xPng,
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

const MapComponent = () => {

  const {fid} = useParams();

  const [field, setField] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/RetailSeller/field/${fid}`)
      .then(response => {
        setField(response.data);
      })
      .catch(error => {
        console.error('Error fetching field:', error);
      });
  }, [fid]);

  if (!field) {
    return <div className="flex justify-center items-center h-screen">Loading field...</div>;
  }

  return (
    <div className="h-screen w-screen">
  <MapContainer 
    center={[field.xcordinate, field.ycordinate]} 
    zoom={13} 
    style={{ height: '100%', width: '100%' }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <Marker position={[field.xcordinate, field.ycordinate]}>
      <Popup>
        City: {field.city}<br/>
        Farmer ID: {field.farmerID}
      </Popup>
    </Marker>
  </MapContainer>
</div>

  
  
  
  );
};

export default MapComponent;
