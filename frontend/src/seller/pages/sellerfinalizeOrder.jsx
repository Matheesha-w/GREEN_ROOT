import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { toast, ToastContainer } from 'react-toastify';

const FinalizeOrder = () => {
  const { sid } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/RetailSeller/payment/stripe/getdetails/${sessionId}`);
        setOrderDetails(response.data);
        console.log(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details", error);
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/RetailSeller/bulkOrder/placeOrder", {
        userId: orderDetails.userId,
        cartId: orderDetails.cartId,
        totalPrice: orderDetails.totalPrice,
        items: orderDetails.items,
      });

      if (response.data.success) {
        toast.success("🟢 Order placed Order placed successfully!!");
        navigate(`/seller/${sid}/bulkOrders`);
      } else {
        toast.error('error placing order')
      }
    } catch (error) {
      console.error("Error placing order", error);
      alert("Failed to place the order");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="py-24 bg-green-50">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <h2 className="font-manrope font-bold text-4xl text-green-700 text-center">
        <ToastContainer position="top-center" />
          Payment Successful
        </h2>
        <p className="mt-4 text-lg text-gray-600 mb-11 text-center">
          Thanks for making a purchase, you can check your order summary below.
        </p>

        <div className="main-box border border-green-300 bg-white rounded-xl pt-6 max-w-xl mx-auto lg:max-w-full shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-green-300">
            <div className="data">
              <p className="font-semibold text-base text-black">
                Order Id: <span className="text-green-600 font-medium">#{orderDetails.orderId}</span>
              </p>
              <p className="font-semibold text-base text-black mt-4">
                Order Payment: <span className="text-gray-500 font-medium">{orderDetails.paymentDate}</span>
              </p>
            </div>
            <button className="rounded-full py-3 px-7 font-semibold text-sm text-white bg-green-500 shadow-sm transition-all duration-500 hover:bg-green-600">
              Track Your Order
            </button>
          </div>

          <div className="w-full px-3 min-[400px]:px-6">
            {orderDetails.items.map(item => (
              <div key={item.cropId} className="flex flex-col lg:flex-row items-center py-6 border-b border-green-300 gap-6 w-full">
                <div className="img-box max-lg:w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
                  />
                </div>
                <div className="flex flex-row items-center w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="flex items-center">
                      <div>
                        <h2 className="font-semibold text-xl text-black mb-3">
                          {item.name}
                        </h2>
                        <p className="font-normal text-lg text-gray-500 mb-3">
                          By: {item.supplier}
                        </p>
                        <div className="flex items-center">
                          <p className="font-medium text-base text-black pr-4 mr-4 border-r border-gray-200">
                            Size: <span className="text-gray-500">{item.size}</span>
                          </p>
                          <p className="font-medium text-base text-black">
                            Qty: <span className="text-gray-500">{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5">
                      <div className="col-span-5 lg:col-span-1 flex items-center">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm text-black">Price</p>
                          <p className="lg:mt-4 font-medium text-sm text-green-600">${item.price}</p>
                        </div>
                      </div>
                      <div className="col-span-5 lg:col-span-2 flex items-center">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm text-black">Status</p>
                          <p className="font-medium text-sm py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                            {item.status}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-5 lg:col-span-2 flex items-center">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm text-black">
                            Expected Delivery Time
                          </p>
                          <p className="font-medium text-base text-emerald-500 lg:mt-3">
                            {item.deliveryDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full border-t border-green-300 px-6 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col sm:flex-row items-center">
              <button className="flex outline-0 py-6 sm:pr-6 sm:border-r border-gray-200 gap-2 items-center text-lg text-black bg-white transition-all duration-500 hover:text-green-600">
                <svg className="stroke-black transition-all duration-500 hover:stroke-green-600" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Cancel Order
              </button>
              <p className="font-medium text-lg text-gray-900 pl-6 py-3">
                Paid using Credit Card <span className="text-gray-500">ending with 8822</span>
              </p>
            </div>
            <p className="font-semibold text-lg text-black py-6">
              Total Price: <span className="text-green-600">${orderDetails.totalPrice}</span>
            </p>
          </div>

          <button onClick={handlePlaceOrder} className="w-full bg-green-500 py-3 text-white text-lg rounded-full mt-5 hover:bg-green-600">
            Confirm Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalizeOrder;
