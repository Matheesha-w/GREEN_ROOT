import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function CropProgress() {
  const { uid } = useParams();

  const [crp, setCrop] = useState([]);
  const [totalAmount, setTotal] = useState(1);

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/crops/parameters",
          {
            farmerID: String(uid),
            status: "on-field",
          }
        );

        setCrop(response.data.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    if (uid) {
      fetchCropData();
    }
  }, [uid]);

  useEffect(() => {
    let tot = 0;
    console.log(crp);

    crp.forEach((element) => {
      tot = tot + element.quantity;
    });

    setTotal(tot);
  }, [crp]);

  return (
    <div className="w-full  bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">My Crops</h2>
        <Link
          to={`/farmer/${uid}/cropProducts`}
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-5">
        {crp.map((crop, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <img
              src={`${crop.image}`}
              alt={crop.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>{crop.name}</span>
                <span>
                  {parseFloat(((crop.quantity / totalAmount) * 100).toFixed(2))}
                  %
                </span>
              </div>
              <div className="text-xs text-gray-400">{crop.status}</div>
              <div className="w-full bg-gray-200 h-2 mt-1 rounded-full">
                <div
                  className={`h-2 rounded-full bg-green-600`}
                  style={{ width: `${(crop.quantity / totalAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropProgress;
