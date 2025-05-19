import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import html2canvas from "html2canvas";
import { Canvg } from "canvg";

function NewOrderComp() {
  const [order, setOrder] = useState({});
  const [Items, setItems] = useState([]);
  const [reciver, setReciver] = useState(false);
  const [sellerEmail, setEmail] = useState("Not valid");
  const [sellerDets, setSellerDets] = useState("Not valid");
  const [validEmail, setValid] = useState(false);
  const [orderStatus, setStatus] = useState("");
  const { oid, uid } = useParams();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  useEffect(() => {
    // Simulate fetching crop data from an API
    const fetchOrderDetails = async () => {
      try {
        axios
          .get(`http://localhost:3000/api/v1/farmer/order/${oid}`)
          .then((res) => {
            setOrder(res.data.data);
            console.log(res.data.data);
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
            setSellerDets(res.data.data);
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

  const handleDownload = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/farmer/order/Invoice/${oid}`,
        {
          customerF: sellerDets.firstName,
          customerL: sellerDets.lastName,
          orderItems: Items,
          TotalPrice: order.totalPrice,
        },
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        const file = new Blob([res.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((err) => {
        console.error("Download failed:", err);
      });
  };

  return (
    <div className="flex">
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

      <div
        class="py-11 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto"
        ref={invoiceRef}
      >
        <div class="flex justify-start item-start space-y-2 flex-col">
          <h1 class="text-3xl dark:text-black lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order #{order._id}
          </h1>
          <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
            {order.createdAt}
          </p>
        </div>
        <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>
              {Items.map((element) => {
                return (
                  <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div class="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        class="w-full hidden md:block"
                        src={element.image}
                        alt="dress"
                      />
                      <img
                        class="w-full md:hidden"
                        src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                        alt="dress"
                      />
                    </div>
                    <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div class="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          {element.name}
                        </h3>
                        <div class="flex justify-start items-start flex-col space-y-2">
                          <p class="text-sm dark:text-white leading-none text-gray-800">
                            <span class="dark:text-gray-400 text-gray-300">
                              Style:{" "}
                            </span>{" "}
                            Italic Minimal Design
                          </p>
                          <p class="text-sm dark:text-white leading-none text-gray-800">
                            <span class="dark:text-gray-400 text-gray-300">
                              Size:{" "}
                            </span>{" "}
                            Small
                          </p>
                          <p class="text-sm dark:text-white leading-none text-gray-800">
                            <span class="dark:text-gray-400 text-gray-300">
                              Color:{" "}
                            </span>{" "}
                            Light Blue
                          </p>
                        </div>
                      </div>
                      <div class="flex justify-between space-x-8 items-start w-full">
                        <p class="text-base dark:text-white xl:text-lg leading-6">
                          $36.00{" "}
                          <span class="text-red-300 line-through"> $45.00</span>
                        </p>
                        <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                          01
                        </p>
                        <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                          Rs. {element.price}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div class="flex justify-between w-full">
                    <p class="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                      Rs. {order.totalPrice}
                    </p>
                  </div>
                  <div class="flex justify-between items-center w-full">
                    <p class="text-base dark:text-white leading-4 text-gray-800">
                      Discount{" "}
                      <span class="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                        STUDENT
                      </span>
                    </p>
                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                      -$28.00 (50%)
                    </p>
                  </div>
                  <div class="flex justify-between items-center w-full">
                    <p class="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                      $8.00
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    $36.00
                  </p>
                </div>

                <div class="flex justify-between items-center w-full">
                  <div class="w-full flex justify-center items-center">
                    <select
                      class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                      name="status"
                      value={orderStatus}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Accepted">Accepted</option>
                    </select>
                  </div>
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
                    Back
                  </Link>
                )}
              </div>

              <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div class="flex justify-between items-start w-full">
                  <div class="flex justify-center items-center space-x-4">
                    <div class="w-8 h-8">
                      <img
                        class="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div class="flex flex-col justify-start items-center">
                      <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        DPD Delivery
                        <br />
                        <span class="font-normal">Delivery with 24 Hours</span>
                      </p>
                    </div>
                  </div>
                  <p class="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                    $8.00
                  </p>
                </div>
                <div class="w-full flex justify-center items-center">
                  <button class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                    View Carrier Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div class="flex flex-col justify-start items-start flex-shrink-0">
                <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div class="flex justify-start items-start flex-col space-y-2">
                    <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                      {sellerDets.firstName}
                      <br />
                      {sellerDets.lastName}
                    </p>
                    <p class="text-sm dark:text-gray-300 leading-5 text-gray-600">
                      10 Previous Orders
                    </p>
                  </div>
                </div>

                <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="cursor-pointer text-sm leading-5 ">{sellerEmail}</p>
                </div>
              </div>
              <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {sellerDets.address}
                    </p>
                  </div>
                  <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Billing Address
                    </p>
                    <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {sellerDets.address}
                    </p>
                  </div>
                </div>
                <div class="flex w-full justify-center items-center md:justify-start md:items-start">
                  <button
                    onClick={handleDownload}
                    class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrderComp;
