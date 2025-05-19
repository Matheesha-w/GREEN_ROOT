import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

function OtpForm2() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(null);
  const [userDets, setuserDet] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [emailEntered, setEmailEntered] = useState(false);

  const otpSend = () => {
    if (!userEmail) {
      toast.error("Please enter the email!", {
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
      return;
    } else {
      axios
        .post("http://localhost:3000/api/v1/user/b/parameters", {
          email: `${userEmail}`,
        })
        .then((res) => {
          if (res.status == 404) {
            alert("user Not Found");
            return;
          }
          if (res.status == 200) {
            setuserDet(res.data.data);
          }

          if (userDets != null) {
            let generateCode = Math.floor(1000 + Math.random() * 9000);
            setOtp(generateCode);

            axios.post("http://localhost:3000/api/v1/otp", {
              otpCode: generateCode,
              email: userEmail,
            });

            toast.success("Otp Sent!", {
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

            setuserDet(res.data.data);
            console.log(res.data.data);

            setEmailEntered(true);
          } else {
            console.log(userDets);
          }
        })
        .catch((err) => {
          toast.error("Please create an account!", {
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
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    const result = Object.values(data).join("");

    if (result == otp) {
      toast.success("OTP success", {
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

      navigate(`/forgetPassword/${userDets[0]._id}`);
    } else {
      toast.error("Wrong OTP", {
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
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                {emailEntered ? (
                  <p>We have sent a code to your email {userEmail}</p>
                ) : (
                  <p>Enter your email to receive a code</p>
                )}
              </div>
            </div>

            <div>
              {!emailEntered ? (
                <div className="flex flex-col space-y-4">
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Enter your email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                  />
                  <button
                    className="w-full bg-blue-700 text-white py-3 rounded-lg"
                    onClick={otpSend}
                  >
                    Send OTP
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      {Array(4)
                        .fill()
                        .map((_, i) => (
                          <input
                            key={i}
                            className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            name={`digit${i + 1}`}
                            required
                            maxLength="1"
                          />
                        ))}
                    </div>
                    <div className="flex flex-col space-y-5">
                      <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-5 rounded-xl"
                      >
                        Verify Account
                      </button>
                      <div className="flex flex-row items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't receive a code?</p>
                        <button className="text-blue-600" onClick={otpSend}>
                          Resend
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpForm2;
