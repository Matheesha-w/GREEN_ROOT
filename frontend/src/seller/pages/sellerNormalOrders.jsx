import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SideBar from '../components/sideBar(seller)';
import NavBar2 from '@/Common/NavBar2';
import { toast, ToastContainer } from 'react-toastify';

function SellerNormalOrders() {
  const { sid } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/RetailSeller/normalOrders/${sid}`);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [sid]);

  const updateOrderStatus = async (orderID, status) => {
    try {
        const response = await axios.put("http://localhost:3000/api/RetailSeller/normalOrders/updatestatus", {
            orderID,
            status,
        });

        console.log(response.data);
        toast.success("status updated")
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error.response?.data || error.message);
        toast.error("cannot update status")
        throw error;
    }
};

  return (
    <div className="bg-gray-100">
      <nav className="p-4">
        <NavBar2 />
      </nav>
      <ToastContainer position="top-center" />

      <div className="grid grid-cols-12 min-h-screen">
        <SideBar sellerid={sid} />

        <div className="col-span-10 flex flex-col p-6">
          <h1 className="text-xl font-semibold mb-4">Customer Orders</h1>
          
          <h1 className="text-lg font-semibold mb-4">Pending Orders</h1>

          {loading && <p>Loading orders...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="mx-0 w-full px-4 py-8 sm:px-8">
              <div className="overflow-y-hidden rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-green-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                        <th className="px-5 py-3">Order Number</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Placement Date</th>
                        <th className="px-5 py-3">Ordinary Buyer ID</th>
                        <th className="px-5 py-3">Order Items</th>
                        <th className="px-5 py-3">Delivery Fee</th>
                        <th className="px-5 py-3">Tax</th>
                        <th className="px-5 py-3">Final Total</th>
                        <th className="px-5 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500">
                      {orders.map((order) => (
                        <tr key={order.orderNumber}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{order.orderNumber}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{order.status}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{order.ordinary_buyer_id}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex flex-wrap gap-2">
                              {order.cartItems?.map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                  <img src={item.image} alt={item.name} className="h-12 w-12 rounded" />
                                  <p className="text-xs">{item.name}</p>
                                  <p className="text-xs">Qty: {item.quantity}</p>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">${order.delivery}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">${order.tax}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">${order.finalTotal}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex items-center space-x-1">
                            <button onClick={() => updateOrderStatus(order._id, 'accepted')} className="rounded bg-green-500 px-3 py-1 text-white">Accept</button>
                            <button onClick={() => updateOrderStatus(order._id, 'declined')} className="rounded bg-red-500 px-3 py-1 text-white">Cancel</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerNormalOrders;