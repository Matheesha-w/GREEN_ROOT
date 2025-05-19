import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";

function CropEdit(prop) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [overview, setOver] = useState("");

  const [disWarning, setWarning] = useState(false);
  const [trigAx, setTrig] = useState(false);

  const { cid, uid } = useParams();

  useEffect(() => {
    // Simulate fetching crop data from an API
    const fetchCropData = async () => {
      try {
        axios.get(`http://localhost:3000/api/v1/crops/${cid}`).then((res) => {
          const data = res.data.data;
          //console.log(data);
          setName(data.name);
          setStatus(data.status);
          setPrice(data.price);
          setFertilizer(data.fertilizer);
          setQuantity(data.quantity);
          setImage(data.image);
          setOver(data.overview);
        });
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };

    fetchCropData();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();

    //console.log(data);

    axios
      .post("http://localhost:3000/api/v1/farmer/order/parameters", {
        farmerId: uid,
        status: "Processing",
      })
      .then((res) => {
        const cropIds = res.data.data.flatMap((order) =>
          order.items.map((item) => item.cropId)
        );

        let isOrdered = cropIds.includes(cid);
        if (isOrdered && status == "off-field") {
          setWarning(true);
        } else {
          const data = {
            name,
            status,
            price,
            fertilizer,
            quantity,
            image,
            overview,
          };

          axios
            .patch(`http://localhost:3000/api/v1/crops/${cid}`, data)
            .then(() => {
              toast.success("Crop updated successfully!", {
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
                navigate(`/farmer/${prop.fid}/cropProducts`);
              }, 2000);
            })
            .catch((e) => {
              alert("Error!");
              console.log(e);
            });
        }
      });
  };

  return (
    <div>
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

      {/* Warning modal */}
      {disWarning ? (
        <div>
          <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
            <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
              <div class=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
              <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                <div class="md:flex items-center">
                  <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                    <i class="bx bx-error text-3xl">&#9888;</i>
                  </div>
                  <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                    <p class="font-bold">Warning!</p>
                    <p class="text-sm text-gray-700 mt-1">
                      You have orders that are currently processing in this crop
                      Item. You can't set it off-field !
                    </p>
                  </div>
                </div>
                <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                  <button
                    onClick={() => {
                      setWarning(false);
                    }}
                    id="confirm-delete-btn"
                    class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Warning modal end */}

      <div>
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleForm}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section */}
              <div className="md:w-1/3">
                <img src={image} className="w-full h-auto rounded-md" />
                <button className="mt-2 text-sm text-blue-600 hover:underline">
                  Change Image
                </button>
              </div>

              {/* Details Section */}
              <div className="md:w-2/3 space-y-4">
                <h2 className="text-2xl font-semibold">Edit Crop</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600">Status</label>
                    <select
                      className="w-full border rounded p-2"
                      name="status"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="on-field">On field</option>
                      <option value="off-field">Off field</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-600">Crop Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="w-full border rounded p-2"
                      name="name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-600">
                      Price (per one kilo)
                    </label>
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      className="w-full border rounded p-2"
                      name="price"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-600">Fertilizer used</label>
                    <input
                      value={fertilizer}
                      onChange={(e) => setFertilizer(e.target.value)}
                      type="text"
                      className="w-full border rounded p-2"
                      name="fertilizer"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600">Quantity (in m X m)</label>
                    <input
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                      className="w-full border rounded p-2"
                      name="quantity"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-gray-600">Image Link</label>
                  <input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    type="text"
                    className="w-full border rounded p-2"
                    name="image"
                  />
                </div>

                {/* Revision History */}
              </div>
            </div>

            {/* Overview Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium">Overview</h3>
              <input
                value={overview}
                onChange={(e) => setOver(e.target.value)}
                type="text"
                className="w-full border rounded p-3"
                name="overview"
              />
            </div>
            <div className="p-5">
              <button
                type="submit"
                class="float-left text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save Changes
              </button>

              <Link
                to={`/farmer/${prop.fid}/cropProducts`}
                class="float-right focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CropEdit;
