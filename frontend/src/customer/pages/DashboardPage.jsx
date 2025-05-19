import React from 'react';
import Sidebar from '../components/Sidebar';
import { Link, useParams } from 'react-router-dom';

const DashboardPage = () => {

  const { cid } = useParams();
  console.log(cid)

  return (
    <div className="flex h-screen bg-green-100">
      <Sidebar custId={cid}/>
      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between ">
          <div>
            <h1 className="text-3xl font-semibold text-green-800">Welcome Back!</h1>
            <p className="text-lg text-gray-600">Explore fresh produce and manage your orders.</p>
          </div>
          <div className="flex space-x-4">
            <Link to={`/Customer/${cid}`}>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full shadow-md">
              Products
            </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Products Section (Light Orange) */}
          <div className="bg-orange-50 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Our Fresh Products</h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-gray-800">Discover More</span>
              <span className="text-sm text-orange-500">Explore Now</span>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src="/customer_images/products.jpg"
                alt="Fresh Produce"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Feedback Section (Light Yellow) */}
          <div className="bg-yellow-50 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Feed backs </h2>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src="/customer_images/banner.jpg"
                alt="Delivery Calendar"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Analytics Section (Light Green) */}
          <Link to="/Customer/ChartPage">
            <div className="bg-green-50 rounded-lg p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Sales Analytics</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-800">Analyze Trends</span>
                <span className="text-sm text-orange-500">+10% This Month</span>
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src="/customer_images/chart.avif"
                  alt="Sales Chart"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </Link>

          {/* Orders Section (Light Blue) */}
          <div className="bg-blue-50 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Tracking Orders</h2>
            <div className="flex justify-around">
              <div className="text-center">
                <span className="text-4xl font-bold text-orange-500">With count</span>
                <p className="text-sm text-gray-600">Home Delivery</p>
              </div>
            </div>
          </div>

          {/* Order History Section (Light Gray) */}
          <Link to="/Customer/Orderhistory">
            <div className="bg-gray-50 rounded-2xl shadow-lg p-6 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h2 className="text-lg font-semibold text-green-800 mb-4">Order History</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">Product</span>
                <span className="text-sm text-gray-600">Category</span>
                <span className="text-sm text-gray-600">Status</span>
                <span className="text-sm text-gray-600">Date</span>
                <span className="text-sm text-gray-600">Total</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-800">Tomatoes</span>
                  <span className="text-sm text-gray-600">Vegetables</span>
                  <span className="text-sm text-green-500">Delivered</span>
                  <span className="text-sm text-gray-600">2023-11-20</span>
                  <span className="text-sm text-gray-800">$12.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-800">Apples</span>
                  <span className="text-sm text-gray-600">Fruits</span>
                  <span className="text-sm text-red-500">Pending</span>
                  <span className="text-sm text-gray-600">2023-11-22</span>
                  <span className="text-sm text-gray-800">$8.99</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;