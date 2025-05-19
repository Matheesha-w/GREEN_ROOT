import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BulkOrderSummary() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/RetailSeller/bulkOrder/getOrder/${orderId}`
        );
        setOrderData(response.data.order);
      } catch (err) {
        setError('Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orderData) {
    return <div>No order data available</div>;
  }

  const steps = ['Accepted', 'Processing', 'Out for Delivery', 'Delivered'];

  return (
    <section className="py-24 bg-green-50">
      <div className="w-full max-w-7xl px-6 md:px-8 mx-auto">
        <h2 className="font-manrope font-bold text-4xl text-green-700 text-center mb-8">
          Crop Order Tracking
        </h2>

        <div className="container mx-auto flex flex-col px-5 pt-12 pb-8">
          <div className="bg-white shadow-md mx-auto mt-4 mb-16 w-full flex-wrap items-center justify-center px-8 py-4 rounded-lg border border-green-300">
            <div className="flex items-center space-x-4 overflow-x-auto">
              {steps.map((step, index) => {
                const isCompleted = steps.indexOf(orderData.status) > index;
                const isCurrent = orderData.status === step;

                return (
                  <React.Fragment key={index}>
                    <span
                      className={`hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full shadow
                        ${isCurrent || isCompleted ? 'bg-green-600 text-white' : 'bg-white text-green-700 border border-gray-300'}`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`hidden md:inline font-medium
                        ${isCurrent ? 'text-green-600' : isCompleted ? 'text-green-500' : 'text-gray-600'}`}
                    >
                      {step}
                    </span>

                    {index < steps.length - 1 && (
                      <span
                        className={`hidden md:inline h-0.5 w-10 
                          ${isCompleted ? 'bg-green-400' : 'border-t-2 border-dashed border-gray-400'}`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-4 font-normal text-lg text-gray-600 mb-10 text-center">
          Thanks for placing your order. Below is the order summary and tracking details.
        </p>

        <div className="main-box border border-green-300 rounded-xl pt-6 max-w-xl lg:max-w-full mx-auto bg-white shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-green-300">
            <div className="data">
              <p className="font-semibold text-base text-black">
                Order Id: <span className="text-green-600 font-medium">#{orderData._id}</span>
              </p>
              <p className="font-semibold text-base text-black mt-4">
                Order Date:{' '}
                <span className="text-gray-500 font-medium">
                  {new Date(orderData.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            <button className="rounded-full py-3 px-7 font-semibold text-sm text-white bg-green-500 shadow-sm transition-all duration-500 hover:bg-green-600">
              Track Your Order
            </button>
          </div>

          <div className="w-full px-6">
            {orderData.items.map((item, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center py-6 border-b border-green-300 gap-6 w-full">
                <div className="img-box">
                  <img
                    src={item.image}
                    alt="Crop image"
                    className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
                  />
                </div>
                <div className="flex flex-row items-center w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="flex items-center">
                      <div>
                        <h2 className="font-semibold text-xl text-black mb-3">{item.name}</h2>
                        <p className="font-normal text-lg text-gray-500 mb-3">
                          By: {orderData.farmerId.name}
                        </p>
                        <div className="flex items-center">
                          <p className="font-medium text-base text-black pr-4 mr-4 border-r border-gray-200">
                            Quantity: <span className="text-gray-500">{item.subtotal / item.price} kg</span>
                          </p>
                          <p className="font-medium text-base text-black">
                            Price: <span className="text-gray-500">${item.price}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-5">
                      <div className="col-span-5 lg:col-span-1 flex items-center">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm text-black">Order Status</p>
                          <p className="lg:mt-4 font-medium text-sm text-emerald-600">{orderData.status}</p>
                        </div>
                      </div>
                      <div className="col-span-5 lg:col-span-2 flex items-center">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm text-black">Expected Delivery</p>
                          <p className="font-medium text-base text-emerald-500">TBD</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="w-full border-t border-green-300 px-6 flex flex-col lg:flex-row items-center justify-between">
              <div className="flex flex-col sm:flex-row items-center border-gray-200">
                <button className="flex outline-0 py-6 sm:pr-6 sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center font-semibold text-lg text-black bg-white transition-all duration-500 hover:text-green-600">
                  Cancel Order
                </button>
                <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                  Paid using Credit Card <span className="text-gray-500">ending with 8822</span>
                </p>
              </div>
              <p className="font-semibold text-lg text-black py-6">
                Total Price: <span className="text-green-600">${orderData.totalPrice}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BulkOrderSummary;
