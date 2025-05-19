import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/sideBar(seller)';
import SalesBarChart from '../components/salesChart';
import NavBar2 from '@/Common/NavBar2';
import { Link, useParams } from 'react-router-dom';

function SellerBulkOrders() {
  const { sid } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/RetailSeller/bulkOrder/getOrders/${sid}`)
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error('Error fetching orders');
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]);
      });
  }, []);

  return (
    <div className="bg-gray-100">
      <nav className="p-4"><NavBar2 /></nav>
      <div className="grid grid-cols-12 min-h-screen">
        {/* Sidebar */}
        <SideBar sellerid={sid} />

        {/* Main Content */}
        <div className="col-span-10 flex flex-col p-6">
          <h1 className="text-xl font-semibold mb-4">My orders</h1>
          

          {/* Table */}
          <div className="mx-0 max-w-screen-lg px-4 py-8 sm:px-8">
            <div className="overflow-y-hidden rounded-lg border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-green-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                      <th className="px-5 py-3">Order ID</th>
                      <th className="px-5 py-3">Subtotal</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-500">
                    {orders.map((order) => (
                      <React.Fragment key={order._id}>
                        <tr key={order._id}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            {order._id}
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            {order.totalPrice} {/* Assuming 'totalPrice' is the subtotal */}
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                              {order.status}
                            </span>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex items-center space-x-1">
                            <Link
                                  to={`/seller/BulkOrder/${order._id}`}
                                  className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-green-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-green-700 hover:shadow-green-400"
                                >
                                   <button className="">More</button>
                                  </Link>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of 12 Entries </span>
                <div className="mt-2 inline-flex sm:mt-0">
                  <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                    Prev
                  </button>
                  <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* End of Table */}

          <div>
            <SalesBarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerBulkOrders;
