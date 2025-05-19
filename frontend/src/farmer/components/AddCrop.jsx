import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

function AddCrop(prop) {
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching crop data from an API
    const fetchCropData = async () => {
      try {
        axios.get("http://localhost:3000/api/v1/category").then((res) => {
          setCats(res.data.data);
        });
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };

    fetchCropData();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, farmerID: prop.fid };
    //console.log(data);

    axios.post("http://localhost:3000/api/v1/crops", data).then((res) => {
      toast.success("Task Created successfully!", {
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
      <div>
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleForm}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section */}
              <div className="md:w-1/3">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACUCAMAAACz6atrAAAAM1BMVEX///+/v7+8vLzq6urw8PDa2trX19fMzMz7+/vU1NTDw8P19fXR0dHHx8e5ubnn5+fh4eH9+CmsAAACtUlEQVR4nO3c6XaCMBAF4GZhJ8D7P22NRcmqI52Arff+6xHJ15BJQuH06wtBEARBkM9KJcUp6TXBNp1jExTbSf0GG2yw/TubPCA7bX1dPs0+m2yeH/zrKLnT1pa3zbDBBhtssMEGG2xk26C1Ht7SpkYxTVPfEU50tK1aN9FSLO9mc+4lpuq9bEq4YbmsbLbGuz3siM0vjy4/l23wuk0YWrW2xhxgm6WPo13UUQp1uE2SbFoK+aBszuy3obdH5q8+23jzbT1lvI32O3IubgvqtCbQ1qb78jbl2ijDrW2eHcu3LiyOjbJojeu5ZHYuZFxPl9t6Kik0fX8ckB2bnPsQ3ZnLR6aj1MFgtgGQ+1X492+0Tee4tStza8MB+97UeZX7gEdm1obytrbvomOdK2pPNp5lq2XcdkeaqYvbLmvmZZrwj1bBI7vMolrcdl0v/DnMv6I26WoobVu/4fXcKENbuhoK2362GvYL2wobbllErhoK28z99Peeu3O9pBova5vdvlnHXBd3W6YaitqCaawLGnRjEucraquDjXptZ+IkLbnF5LVVXr3psIsuPZe8oiL9EIrVNkh3MmibhCAtSzfParOdsuGWRBfln78mqoF1/3b95IZrX3yXJK4GTts69JX3Ez1RNTDa9O2zayNz1PaTxNXAaNtK0PZcZq54hAsBfDbttDLveesguuHis3kzV/V6t8XVwGbT6fZeSnDDxWaLN2UvJ7zh4rJF69OeTD6By8bQbVE1MNn0nrEfx7/hYrKxdFv45wce28BDC6qBx8bUbUE1sNiYRpsIqoHFxtZt/pu8LDbFGOe8n/NsFzbYYIPtfWw736EVZuZcDNKpdtoODmywwQYbbLDBBhtssMEGG2ywwQYbbLDBBttftE1H/PuLxD/EINjse/an5IC/yiMIgiAIgtDyDeEePpf+ljeGAAAAAElFTkSuQmCC" // Replace with actual image URL
                  alt="Hokaido Carrot"
                  className="w-full h-auto rounded-md"
                />
                <button className="mt-2 text-sm text-blue-600 hover:underline">
                  Change Image
                </button>
              </div>

              {/* Details Section */}
              <div className="md:w-2/3 space-y-4">
                <h2 className="text-2xl font-semibold">Add Crop</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600">Category</label>
                    <select
                      className="w-full border rounded p-2"
                      name="categoryID"
                    >
                      {cats.map((element) => {
                        return (
                          <option value={element._id}>{element.name}</option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-600">Status</label>
                    <select className="w-full border rounded p-2" name="status">
                      <option value="on-field">On field</option>
                      <option value="off-field">Off field</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-600">Crop Name</label>
                    <input
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
                      type="number"
                      className="w-full border rounded p-2"
                      name="price"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-600">Fertilizer used</label>
                    <input
                      type="text"
                      className="w-full border rounded p-2"
                      name="fertilizer"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600">Quantity (in m X m)</label>
                    <input
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

export default AddCrop;
