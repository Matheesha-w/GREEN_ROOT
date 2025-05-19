import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ResearcherProfilePic from "../extras/researcherprofilepic.jpg";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function RightSidebar({ userData: userID }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userID) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/user/${userID}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result?.data) {
          setUserData({
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            email: result.data.email
          });
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userID]);

  const handleLogout = () => {
    // 1. Remove auth token from cookies
    Cookies.remove('authToken');
    
    // 2. Clear any user data from state
    setUserData(null);
    
    // 3. Redirect to login page
    navigate('/auth/login');
    
    // Optional: You might want to refresh the page to clear any cached data
    // window.location.reload();
  };

  if (loading) {
    return (
      <div className="fixed right-0 top-0 w-72 h-screen overflow-y-auto bg-white shadow-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed right-0 top-0 w-72 h-screen overflow-y-auto bg-white shadow-xl flex items-center justify-center p-4">
        <p className="text-red-500">Error loading user data: {error}</p>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 w-72 h-screen overflow-y-auto bg-white shadow-xl">
      <div className="font-poppins antialiased h-full flex flex-col">
        <div className="px-4 py-6 flex-1">
          {/* Profile Section */}
          <div className="mb-8">
            <h2 className="text-gray-800 text-xl font-bold">Profile</h2>
          </div>

          <div className="text-center mb-8">
            <img
              src={ResearcherProfilePic}
              alt="Researcher Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            {userData ? (
              <>
                <h2 className="text-gray-800 text-lg font-semibold">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-gray-600 text-sm">
                  {userData.email}
                </p>
              </>
            ) : (
              <p className="text-gray-500">User data not available</p>
            )}
          </div>

          {/* Calendar */}
          <div>
            <h3 className="text-gray-800 text-md font-semibold mb-4">Calendar</h3>
            <Calendar
              className="react-calendar bg-gray-100 border-none text-gray-800 rounded-lg"
              tileClassName="text-gray-800 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-150 ease-in-out"
            />
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-4 py-6 border-t border-gray-200">
          <button 
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}