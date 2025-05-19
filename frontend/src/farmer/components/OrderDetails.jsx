import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

function OrderDetails() {
  const [order, setOrder] = useState({});
  const [Items, setItems] = useState([]);
  const [reciver, setReciver] = useState(false);
  const [sellerEmail, setEmail] = useState("Not valid");
  const [validEmail, setValid] = useState(false);
  const [orderStatus, setStatus] = useState("");
  const { oid, uid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching crop data from an API
    const fetchOrderDetails = async () => {
      try {
        axios
          .get(`http://localhost:3000/api/v1/farmer/order/${oid}`)
          .then((res) => {
            setOrder(res.data.data);
            setItems(res.data.data.items);
            setStatus(res.data.data.status);
            setReciver(true);
          });
      } catch (error) {
        console.error("Error fetching CaOrder Details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  useEffect(() => {
    // Simulate fetching Seller data from an API
    const fetchSellerDetails = async () => {
      try {
        axios
          .get(`http://localhost:3000/api/user/${order.sellerId}`)
          .then((res) => {
            console.log(res.data.data.email);
            setEmail(res.data.data.email);
            setValid(true);
          });
      } catch (error) {
        console.error("Error fetching Seller Details:", error);
      }
    };

    if (Object.entries(order).length != 0) {
      fetchSellerDetails();
    }
  }, [reciver]);

  const handleSubmit = async () => {
    await axios
      .patch(`http://localhost:3000/api/v1/farmer/order/${oid}`, {
        status: orderStatus,
      })
      .then((res) => {
        toast.success(`Order ${orderStatus}`, {
          position: "top-center",
          autoClose: 2000, // Show toast for 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      });

    await axios
      .post("http://localhost:3000/api/v1/farmer/order/email", {
        id: order._id,
        status: orderStatus,
        email: sellerEmail,
      })
      .then((res) => {
        navigate(`/farmer/${uid}/orders`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ float: "left" }} id="summaryDoc">
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
      <section class="py-24 relative">
        <div class="w-fi max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div class="flex items-start flex-col gap-6 xl:flex-row ">
            <div class="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
              <div class="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
                  Order Summary
                </h2>
                <div class="data py-6 border-b border-gray-200">
                  <div class="flex items-center justify-between gap-4 mb-5">
                    <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Product Cost
                    </p>
                    <p class="font-medium text-lg leading-8 text-gray-900">
                      Rs. {order.totalPrice}
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-4 mb-5">
                    <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Payment
                    </p>
                    <p class="font-medium text-lg leading-8 text-gray-600">
                      Rs. {order.paymentAmount}
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-4 ">
                    <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                      Seller Email
                    </p>
                    <p class="font-medium text-lg leading-8 text-emerald-500">
                      {sellerEmail}
                    </p>
                  </div>
                </div>
                <div class="total flex items-center justify-between pt-6">
                  <p class="font-normal text-xl leading-8 text-black ">
                    Subtotal
                  </p>
                  <h5 class="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                    Rs. {order.paymentAmount}
                  </h5>
                </div>
                <div>
                  <label className="text-gray-600">Status</label>
                  <select
                    className="w-full border rounded p-2"
                    name="status"
                    value={orderStatus}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {validEmail ? (
                  <div className="mt-6">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      class="float-left text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Save Changes
                    </button>

                    <Link
                      to={`/farmer/${uid}/orders`}
                      class="float-right focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Cancel
                    </Link>
                  </div>
                ) : (
                  <Link
                    to={`/farmer/${uid}/orders`}
                    class="float-right focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Cancel
                  </Link>
                )}
              </div>
            </div>
            <div class="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
              <div class="grid grid-cols-1 gap-6">
                {Items.map((element) => {
                  return (
                    <div class="ounded-3xl p-10 bg-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400">
                      <div className="img-box w-32 h-32 border-2 border-gray-300 rounded-xl overflow-hidden shadow-md">
                        <img
                          src={element.image}
                          alt="Plant product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                        <div class="">
                          <h2 class="font-medium text-xl leading-8 text-black mb-3">
                            {element.name}
                          </h2>
                          <p class="font-normal text-lg leading-8 text-gray-500 ">
                            By: Dust Studios
                          </p>
                        </div>
                        <div class="flex items-center justify-between gap-8">
                          <h6 class="font-medium text-xl leading-8 text-indigo-600">
                            Rs. {element.price}
                          </h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderDetails;
