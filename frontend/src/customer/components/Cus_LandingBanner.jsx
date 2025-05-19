import React, { useState } from "react";
import "../extras/landing.css"
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Cus_LandingBanner() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    axios
      .post("http://localhost:3000/api/auth/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const token = Cookies.get("authToken"); // Replace "jwt" with the actual cookie name
          if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));

            if (payload.role == "customer") {
              navigate(`/Customer`);
            } else {
              alert("Wrong user portal");
            }
          } else {
            alert("No token present");
          }
        }
      })
      .catch((e) => {
        toast.error("Incorrect username or password");
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
        //transition={Bounce}
      />
      <div class="grid grid-cols-12">
        <div class="col-span-4 text-white font-sans font-bold bg-black min-h-screen pl-7">
          <div class="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
            <div class="row-span-4 row-start-2 text-4xl">
              Sign In
              <form onSubmit={handleSubmit}>
                <div class="pt-10 pr-20">
                  <label class="text-sm font-sans font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="Write your email"
                    class="w-full bg-black py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                    name="email"
                    required
                  />
                </div>

                <div class="pt-2 pr-20">
                  <label class="text-sm font-sans font-medium">Password</label>
                  <input
                    type="password"
                    placeholder="Write your password"
                    class=" w-full bg-black py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                    name="password"
                    required
                  />
                  <a
                    href=""
                    class="text-sm font-sans font-medium text-gray-600 underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div class="text-sm font-sans font-medium w-full pr-20 pt-14">
                  <button
                    type="submit"
                    class="text-center w-full py-4 bg-teal-500 hover:bg-teal-600 rounded-md text-white"
                  >
                    SIGN IN
                  </button>
                </div>
              </form>
            </div>

            <a
              href="#"
              class="text-sm font-sans font-medium text-gray-400 underline"
            >
              Don´t have an account? Sign up
            </a>
          </div>
        </div>

        <div class="banner col-span-8 text-white font-sans font-bold"></div>
      </div>
    </div>
  );
}

export default Cus_LandingBanner;
