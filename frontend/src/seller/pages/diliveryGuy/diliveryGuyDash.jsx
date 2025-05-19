import NavBar2 from "@/Common/NavBar2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const DiliveryDash = () => {


  const [OrdersBLK, setordersBLK] = useState([]);
   const [OrdersNOR, setordersNOR] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [loadingN, setLoadingN] = useState(true);
  const [error, setError] = useState(null);    
  
  
  const [statusUpdates, setStatusUpdates] = useState({});


  useEffect(() => {
    const fetchbulkOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/DiliveryGuy/orders/acceptedBlk');
        setordersBLK(res.data);
        setLoading(false);
        
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchbulkOrders();
  }, []);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/DiliveryGuy/orders/acceptedNor/');
        setordersNOR(res.data);
        setLoadingN(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoadingN(false);
      }
    };

    fetchOrders();
  }, []);


  const handleSave = async (orderId) => {
      const newStatus = statusUpdates[orderId];
      if (!newStatus) return;

      try {
        await axios.patch(`http://localhost:3000/api/DiliveryGuy/orders/update-status`, {
          orderId:orderId,
          status: newStatus,
        });

        setordersBLK((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );

          toast.success("Status updated successfully.");
      } catch (error) {
        alert("Failed to update status.");
        console.error(error);
      }
};

 const handleSaveN = async (orderId) => {
      const newStatus = statusUpdates[orderId];
      if (!newStatus) return;

      try {
        await axios.patch(`http://localhost:3000/api/DiliveryGuy/orders/update-status-N`, {
          orderId:orderId,
          status: newStatus,
        });

        setordersNOR((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );

          toast.success("Status updated successfully.");
      } catch (error) {
        alert("Failed to update status.");
        console.error(error);
      }
};




  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer position="top-center" ></ToastContainer> 
      <nav className=" p-4 text-center font-semibold text-lg">
        <NavBar2/>
      </nav>
      <div className="grid grid-cols-12">
      <aside className="col-span-2 bg-white h-screen shadow-xl px-3 w-60 overflow-x-hidden">
        <div className="space-y-6 mt-10">
            <h1 className="hidden md:block font-bold text-xl text-center text-teal-600">My App</h1>
            <div id="profile" className="space-y-3 text-center">
            <img
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
                alt="User Avatar"
                className="w-16 rounded-full mx-auto"
            />
            <h2 className="font-medium text-sm text-teal-500">Eduard Pantazi</h2>
            <p className="text-xs text-gray-500">Retail seller</p>
            </div>
            <div className="border-2 border-gray-200 rounded-md flex">
            <input
                type="text"
                className="w-full px-2 py-3 text-sm text-gray-600 focus:outline-none"
                placeholder="Search"
            />
            <button className="px-2 py-3 hidden md:block">
                <svg
                className="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                ></path>
                </svg>
            </button>
            </div>
            <div id="menu" className="flex flex-col space-y-2">
            <Link
                to="/diliveryGuy/dash"
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out"
            >
                Homepage
            </Link>
            
            </div>
        </div>
        </aside>
        <div className="col-span-10 flex flex-col p-6">
          <h1 className="text-2xl font-bold mb-6">Bulk Orders</h1>
          <div className="p-6 overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left border-collapse shadow-lg">
              <thead className="bg-green-300">
                <tr>
                  <th className="border-y p-4 text-gray-700">Order ID</th>
                  <th className="border-y p-4 text-gray-700">Seller</th>
                  <th className="border-y p-4 text-gray-700">Farmer</th>
                  <th className="border-y p-4 text-gray-700">Total Price</th>
                  <th className="border-y p-4 text-gray-700">Status</th>
                  <th className="border-y p-4 text-gray-700">Payment Status</th>
                  <th className="border-y p-4 text-gray-700">Created At</th>
                  <th className="border-y p-4 text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {OrdersBLK.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-4 border-b">{order.orderID}</td>
                    <td className="p-4 border-b">{order.retailerName || "N/A"}</td>
                    <td className="p-4 border-b">{order.farmerName || "N/A"}</td>
                    <td className="p-4 border-b">${order.totalPrice}</td>
                    <td className="p-4 border-b">
                      <select
                        className="border p-2 rounded bg-white shadow-sm"
                        value={statusUpdates[order._id] || order.status}
                        onChange={(e) =>
                          setStatusUpdates({
                            ...statusUpdates,
                            [order._id]: e.target.value,
                          })
                        }
                      >
                        <option value="Accepted">Accepted</option>
                        <option value="Processing">Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                    </td>
                    <td className="p-4 border-b">{order.paymentStatus || "Pending"}</td>
                    <td className="p-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 border-b">
                     <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => handleSave(order._id)}
                      >
                        Save
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <h1 className="text-2xl font-bold mb-6">Normal Orders</h1>
          <div className="p-6 overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left border-collapse shadow-lg">
              <thead className="bg-green-200">
                <tr>
                  <th className="border-y p-4 text-gray-700">Order ID</th>
                  <th className="border-y p-4 text-gray-700">Seller</th>
                  <th className="border-y p-4 text-gray-700">Farmer</th>
                  <th className="border-y p-4 text-gray-700">Total Price</th>
                  <th className="border-y p-4 text-gray-700">Status</th>
                  <th className="border-y p-4 text-gray-700">Payment Amount</th>
                  <th className="border-y p-4 text-gray-700">Payment Status</th>
                  <th className="border-y p-4 text-gray-700">Created At</th>
                </tr>
              </thead>
             <tbody className="divide-y divide-gray-300">
                {OrdersNOR.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-4 border-b">{order.orderID}</td>
                    <td className="p-4 border-b">{order.retailerName || "N/A"}</td>
                    <td className="p-4 border-b">{order.farmerName || "N/A"}</td>
                    <td className="p-4 border-b">${order.totalPrice}</td>
                    <td className="p-4 border-b">
                      <select
                        className="border p-2 rounded bg-white shadow-sm"
                        value={statusUpdates[order._id] || order.status}
                        onChange={(e) =>
                          setStatusUpdates({
                            ...statusUpdates,
                            [order._id]: e.target.value,
                          })
                        }
                      >
                        <option value="Accepted">Accepted</option>
                        <option value="Processing">Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                    </td>
          
                    <td className="p-4 border-b">{order.paymentStatus || "Pending"}</td>
                    <td className="p-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                       <button  onClick={() => handleSaveN(order._id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DiliveryDash;
