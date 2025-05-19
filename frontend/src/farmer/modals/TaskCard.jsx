import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

const TaskCard = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const modalHandler = (val) => {
    setIsOpen(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, farmerID: uid };
    console.log(data);

    axios
      .post("http://localhost:3000/api/v1/farmer/schedule", data)
      .then((res) => {
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
          navigate(`/farmer/${uid}/schedule`);
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

      <div className="w-full flex justify-center py-12"></div>

      {isOpen && (
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="py-12  bg-black bg-opacity-50 transition duration-150 ease-in-out z-10 fixed inset-0 flex items-center justify-center"
        >
          <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
            <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
              <div className="w-full flex justify-start text-gray-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-wallet"
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                  <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                </svg>
              </div>
              <form onSubmit={handleSubmit}>
                <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                  Enter Task Details
                </h1>
                <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                  Task description
                </label>
                <input
                  name="description"
                  className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  placeholder="James"
                  required
                />
                <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                  Due date
                </label>
                <div className="relative mb-5 mt-2">
                  <input
                    name="dueDate"
                    type="date"
                    className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    placeholder="XXXX - XXXX - XXXX - XXXX"
                    required
                  />
                </div>
                <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                  Created Date
                </label>
                <input
                  value={new Date()}
                  readOnly
                  className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  placeholder="MM/YY"
                />
                <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                  Status
                </label>
                <select
                  className="mb-8 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  placeholder="XXX"
                >
                  <option value="upcoming">upcoming</option>
                  <option value="completed">completed</option>
                  <option value="canceled">canceled</option>
                </select>
                <div className="flex items-center justify-start w-full">
                  <button
                    type="submit"
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                  >
                    Submit
                  </button>
                  <Link
                    to={`/farmer/${uid}/schedule`}
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                    onClick={() => modalHandler(false)}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
              <Link
                to={`/farmer/${uid}/schedule`}
                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                aria-label="close modal"
                role="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
