import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBFarmer from "../extras/NavBFarmer";
import { ToastContainer, toast, Bounce } from "react-toastify";

function MapEdit() {
  const { mid, uid } = useParams();
  const navigate = useNavigate();
  const [xcordinate, setLatitude] = useState(null);
  const [ycordinate, setLongitude] = useState(null);
  const [locationDets, seLocationDets] = useState([7.2906, 80.6337]);
  const [city, setCity] = useState(null);

  const handleOnChange = (data) => {
    //console.log(data);
    const { latitude, longitude, label } = data;
    setLatitude(Number(latitude));
    setLongitude(Number(longitude));
    setCity(label);

    seLocationDets([latitude, longitude]);

    /*  Promise.all([latitude, longitude]).then(
      async((res))
    ) */
  };

  const handleSubmit = () => {
    if (!xcordinate || !ycordinate) {
      alert("Empty Fields!");
    } else {
      const data1 = { xcordinate, ycordinate, city };
      //console.log(data1);

      axios
        .patch(`http://localhost:3000/api/v1/field/${mid}`, data1)
        .then((res) => {
          toast.success("Field Edit successfully!", {
            position: "top-center",
            autoClose: 2000, // Show toast for 2 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
          });

          // Delay navigation to ensure the toast message is visible
          setTimeout(() => {
            navigate(`/farmer/${uid}/dashboard`);
          }, 2000);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <NavBFarmer />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Search Location
          </h2>
          <SearchBar onSearchChange={handleOnChange} />
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
            >
              Enter
            </button>
          </div>
          <div className="mt-6 flex justify-center">
            <MapView locationProp={locationDets} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapEdit;
