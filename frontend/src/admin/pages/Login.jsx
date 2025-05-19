import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
// import loginImg from "../extras/loginImage.svg";
import NavBar2 from "@/Common/NavBar2";
import Footer from "./home/home_components/Footer";

// logo
import Logo from "/Greenroots-logo-color.png";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        {
          withCredentials: true, // Ensures cookies are sent and received
        }
      );

      if (response.status === 200) {
        const token = Cookies.get("authToken");
        console.log("JWT TOKEN:", token);
        Swal.fire({
          title: "Login successfull!",
          text: "",
          timer: 1500,
          showConfirmButton: false,
          icon: "success",
        });

        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
          // console.log(payload.role);
          // console.log(payload.userId);

          switch (payload.role) {
            case "admin":
              navigate(`/admin/${payload.userId}/dashboard`);
              break;
            case "farmer":
              navigate(`/farmer/${payload.userId}/dashboard`);
              break;
            case "seller":
              navigate(`/seller/${payload.userId}/home`);
              break;
            case "researcher":
              navigate(`/researcher`);
              break;
            case "deliveryPerson":
              navigate(`/diliveryGuy/dash`);
              break;
            default:
              navigate("/");
          }
        }
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Incorrect email or password");
    }
  };

  return (
    <>
      <NavBar2 />

      <>
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div>
                <img
                  src={Logo}
                  className="w-45 h-52"
                  alt="Sign In Illustration"
                />
              </div>

              {error && (
                <p className="text-red-500 text-center mb-3">{error}</p>
              )}

              <div className="mt-12 flex flex-col items-center">
                <div className="w-full flex-1 mt-8">
                  <div className="flex flex-col items-center">
                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                      <div className="bg-white p-2 rounded-full">
                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                          <path
                            d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                            fill="#4285f4"
                          />
                          <path
                            d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                            fill="#34a853"
                          />
                          <path
                            d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                            fill="#fbbc04"
                          />
                          <path
                            d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                            fill="#ea4335"
                          />
                        </svg>
                      </div>
                      <span className="ml-4">Sign In with Google</span>
                    </button>
                  </div>

                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or sign in with Cartesian Email
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />

                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />

                    <div className="flex justify-center">
                      <span className="text-red-600 underline hover:text-blue-700 float-right">
                        <Link to={`/otp/send`}>Forgot password</Link>
                      </span>
                    </div>

                    <button
                      className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit"
                    >
                      <span>Sign In</span>
                    </button>
                  </form>

                  <p className="text-center mt-1.5">
                    Still Don't have an account?{" "}
                    <span className="text-blue-600 underline hover:text-blue-700">
                      <Link to={`/auth/register`}>Sing Up</Link>
                    </span>
                  </p>

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by GreenRoots{" "}
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div
              className="flex-1 bg-green-100 text-center hidden lg:flex"
              style={{
                backgroundImage: `url('https://img.freepik.com/premium-photo/farmer-field_1031776-7345.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      </>
      <Footer />
    </>
  );
};

export default Login;
