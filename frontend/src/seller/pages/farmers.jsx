import { useEffect, useState } from "react";
import NavBar2 from "@/Common/NavBar2";
import SideBar from "../components/sideBar(seller)";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const FarmerList = () => {
  const { sid } = useParams();
  const [farmers, setFarmers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedFarmer, setSelectedFarmer] = useState(null); // To store the selected farmer's to-do list
  const [todoList, setTodoList] = useState([]); // To store the fetched to-do list for the selected farmer

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/RetailSeller/farmers/"); // Adjust the API URL as needed
        setFarmers(response.data);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };
    fetchFarmers();
  }, []);

  // Fetch to-do list for the selected farmer
  const fetchTodoList = async (farmerID) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/RetailSeller/farmers/todolist/${farmerID}`); // Adjust the API URL as needed
      setTodoList(response.data); // Set the fetched to-do list
    } catch (error) {
      console.error("Error fetching to-do list:", error);
    }
  };

  // Open modal function
  const openModal = (farmer) => {
    setSelectedFarmer(farmer); // Set the selected farmer's data to display in the modal
    fetchTodoList(farmer._id); // Fetch the to-do list for the selected farmer
    setIsModalOpen(true); // Set modal visibility to true
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false); // Set modal visibility to false
    setSelectedFarmer(null); // Clear selected farmer data
    setTodoList([]); // Clear the to-do list
  };

  return (
    <>
      <div className="bg-gray-100">
        <nav className="p-4">
          <NavBar2 />
        </nav>
        <div className="grid grid-cols-12 min-h-screen">
          {/* Sidebar */}
          <SideBar sellerid={sid} />

          {/* Main Content */}
          <div className="col-span-10 flex flex-col p-6">
            <h1 className="text-xl font-semibold mb-4">Farmers</h1>

            <section className="container mx-auto p-6 font-mono">
              <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Address</th>
                        <th className="px-4 py-3">To-do List</th>
                        <th className="px-4 py-3">Field</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white font-sans text-sm">
                      {farmers.map((farmer) => (
                        <tr className="text-gray-700" key={farmer._id}>
                          <td className="px-4 py-3 border">
                            <div className="flex items-center text-sm">
                              <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                <img
                                  className="object-cover w-full h-full rounded-full"
                                  src={farmer.image || "https://via.placeholder.com/150"}
                                  alt={farmer.firstName}
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                              </div>
                              <div>
                                <p className="font-semibold text-black">{farmer.firstName} {farmer.lastName}</p>
                                <p className="text-xs text-gray-600">Farmer</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-ms font-semibold border">{farmer.email}</td>
                          <td className="px-4 py-3 text-xs border">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                              {farmer.address}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm border">
                            <button
                              className="h-12 w-12 rounded-full border text-sm font-semibold text-green-600 transition duration-150 hover:bg-green-300"
                              onClick={() => openModal(farmer)} // Open the modal and pass the farmer data
                            >
                              Show
                            </button>
                          </td>
                          <td className="px-4 py-3 text-xs border">
                            <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
                              <a href={`/seller/farmerFields/${farmer._id}`} className="block text-center">
                                Show
                              </a>
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

     {/* Modal */}
{isModalOpen && selectedFarmer && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative max-w-lg">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Farmer To-do List</h2>
        <button className="text-black-500 hover:text-red-600 text-xl" onClick={closeModal}>❌</button>
      </div>

      {/* To-do List Items */}
      <div className="max-h-80 overflow-y-auto"> {/* Scrollable container */}
        <div className="grid grid-cols-2 gap-4">
          {todoList.length > 0 ? (
            todoList.map((task, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <p className="text-lg font-medium text-gray-700"><strong>Description:</strong> {task.description}</p>
                <p className="text-sm text-gray-500"><strong>Status:</strong> {task.status}</p>
                <p className="text-sm text-gray-500"><strong>Due Date:</strong> {task.dueDate}</p>
                <p className="text-xs text-gray-400 mt-2 italic">Created on: {task.createdAt}</p>
              </div>
            ))
          ) : (
            <p>No tasks available for this farmer.</p>
          )}
        </div>
      </div>

      {/* Modal Footer */}
      <div className="mt-6 flex justify-center">
        <button className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors focus:outline-none">
          Mark All as Completed
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default FarmerList;
