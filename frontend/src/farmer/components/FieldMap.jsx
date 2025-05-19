import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "../extras/mapStyles.css";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import { Button } from "@/components/ui/button";

function FieldMap() {
  const { uid } = useParams();
  const [det, setDet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/v1/field/parameters", {
        farmerID: uid,
      })
      .then((res) => {
        if (res.status === 200) {
          setDet(res.data.data[0]);
        } else {
          console.log("Map not found!");
        }
      })
      .catch((e) => {
        console.error("Error fetching data:", e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uid]);

  if (loading) {
    return <Loader />;
  }

  if (!det || !det.xcordinate || !det.ycordinate) {
    return (
      <div className="  flex flex-col items-center justify-center  text-center">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-600">No Map Found</h2>
          <p className="text-gray-600 mt-2">
            We couldn't locate a farm with the given ID. Please check your input
            or try again later.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
          <br /> <br />
          <Link
            to={`/farmer/${uid}/addMap`}
            className="m-4 mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Enter a new map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="frame">
      <Link
        to={`/farmer/${uid}/allLocations`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        View
      </Link>

      <Link
        to={`/farmer/${uid}/Location/${det._id}/update`}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right"
      >
        Edit
      </Link>

      <MapContainer center={[det.xcordinate, det.ycordinate]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[det.xcordinate, det.ycordinate]}>
          <Popup>Your farm</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default FieldMap;
