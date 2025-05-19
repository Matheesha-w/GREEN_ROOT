import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../utills/authUtils";
import { UserProvider } from "../utills/UserContext";

function Sidebar2() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      setUserID(userId);
    } else {
      navigate(`/farmer`);
    }
  }, []);

  return (
    <UserProvider>
      <div className="relative">
        <button
          className="p-2 bg-white rounded-md border border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div
          className={`absolute md:relative bg-white h-screen md:h-auto w-60 transition-transform duration-300 ease-in-out ${
            isOpen
              ? "top-12 left-0 shadow-lg z-50"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="space-y-6 mt-10 px-3">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
                alt="Avatar"
                className="w-16 h-16 rounded-full mx-auto"
              />
              <h2 className="font-medium text-sm text-teal-500">
                Linal Wickram
              </h2>
              <p className="text-xs text-gray-500">Farmer</p>
            </div>
            <div className="border-2 border-gray-200 rounded-md flex focus-within:ring-2 ring-teal-500">
              <input
                type="text"
                className="w-full px-2 py-2 text-sm text-gray-600 focus:outline-none"
                placeholder="Search"
              />
              <button className="px-2 py-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col space-y-2">
              <Link to={`/farmer/${userID}/dashboard`} className="sidebar-link">
                Dashboard
              </Link>
              <Link
                to={`/farmer/${userID}/cropProducts`}
                className="sidebar-link"
              >
                Crops
              </Link>
              <Link to="/farmer/orders" className="sidebar-link">
                Orders
              </Link>
              <Link to={`/farmer/${userID}/experts`} className="sidebar-link">
                Chat
              </Link>
              <Link to={`/farmer/${userID}/schedule`} className="sidebar-link">
                Calendar
              </Link>
              <Link to="/farmer/test" className="sidebar-link">
                Test
              </Link>
              <Link to="/farmer/users" className="sidebar-link">
                Users
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

export default Sidebar2;
