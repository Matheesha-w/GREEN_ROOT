import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CropInfo() {
  const [crops, setCrop] = useState([]);
  const { cid } = useParams();

  const { uid } = useParams();

  useEffect(() => {
    // Simulate fetching crop data from an API
    const fetchCropData = async () => {
      try {
        axios.get(`http://localhost:3000/api/v1/crops/${cid}`).then((res) => {
          setCrop(res.data.data);
        });
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };

    fetchCropData();
  }, []);
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="md:w-1/3">
            <img
              src={crops.image} // Replace with actual image URL
              alt="Hokaido Carrot"
              className="w-full h-auto rounded-md"
            />
          </div>

          {/* Details Section */}
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-2xl font-semibold">
              {crops.name}{" "}
              <Link to={`/farmer/${uid}/crop/edit/${cid}`}>✏️</Link>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">Category</label>
                <select className="w-full border rounded p-2">
                  <option>Not Given</option>
                </select>
              </div>

              <div>
                <label className="text-gray-600">Change Availability</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={crops.status}
                  readOnly
                />
              </div>

              <div>
                <label className="text-gray-600">Crop Name</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={crops.name}
                  readOnly
                />
              </div>

              <div>
                <label className="text-gray-600">Price (per one kilo)</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={crops.price}
                  readOnly
                />
              </div>

              <div>
                <label className="text-gray-600">Fertilizer used</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={crops.fertilizer}
                  readOnly
                />
              </div>

              <div>
                <label className="text-gray-600">Quantity (in m X m)</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={crops.quantity}
                  readOnly
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-600">Image Link</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={crops.image}
                readOnly
              />
            </div>

            {/* Revision History */}
            <div className="mt-4">
              <h3 className="text-lg font-medium">Revision History</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Created: {crops.createdAt}</li>
                <li>Last modified: {crops.updatedAt}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium">Overview</h3>
          <p className="text-gray-700 text-sm">{crops.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default CropInfo;
