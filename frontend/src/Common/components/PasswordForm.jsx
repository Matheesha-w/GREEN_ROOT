import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

function PasswordForm() {
  const { uid } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);

    if (data.newPass == data.conPass) {
      axios
        .patch(`http://localhost:3000/api/v1/user/b/${uid}`, {
          password: data.newPass,
        })
        .then((res) => {
          toast.success("Password reset complete!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setTimeout(() => {
            navigate(`/auth/login`);
          }, 2000);
        });
    } else {
      toast.error("Confirmation wrong!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
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
        transition={Bounce}
      />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Reset Password</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>Enter your email to receive a code</p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                  <input
                    name="newPass"
                    type="password"
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Enter your new password"
                    required
                  />
                  <input
                    name="conPass"
                    type="password"
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-3 rounded-lg"
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordForm;
