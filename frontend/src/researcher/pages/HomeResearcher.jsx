import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarResearcher from '../components/SidebarResearcher';
import RightSideBar from '../components/RightSideBar';
import NewsIcon from '../extras/news.png';
import GardenerIcon from '../extras/gardener.png';
import PestControlIcon from '../extras/pest-control.png';
import QuestionMarkIcon from '../extras/questionmark.png';
import { getResearcherId } from '../utils/auth';

export default function HomeResearcher() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
      const userId = getResearcherId();
      
      if (userId) {
        setUserID(userId);
      } else {
        navigate(`/auth/login`);
      }
  }, []);

  return (
    <div className="flex relative mt-0 min-h-screen bg-gray-200">
      {/* Sidebar */}
      <SidebarResearcher />

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-7xl mx-auto pr-72 ml-64">
        {/* Welcome Text */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">Let's make groundbreaking discoveries together!</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-10">
          {/* Card 1: Latest News */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img src={NewsIcon} alt="News Icon" className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Latest News</h2>
            <p className="text-gray-500 mb-4">Publish updates on agriculture news and innovations</p>
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
              onClick={() => navigate(`/researcher/my-news`)}
            >
              Create News
            </button>
          </div>

          {/* Card 2: Growing Guide */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img src={GardenerIcon} alt="Gardener Icon" className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold text-green-800 mb-2">Growing Guide</h2>
            <p className="text-gray-500 mb-4">Share step-by-step guides on growing different crops</p>
            <button 
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-150 ease-in-out"
              onClick={() => navigate(`/researcher/my-growing-guide`)}
            >
              Create Post
            </button>
          </div>

          {/* Card 3: Pest Control */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center w-66">
            <img src={PestControlIcon} alt="Pest Control Icon" className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold text-orange-800 mb-2">Pest Control</h2>
            <p className="text-gray-500 mb-4">Preventing and treating plant pests and diseases</p>
            <button 
              className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-150 ease-in-out"
              onClick={() => navigate(`/researcher/my-pnd`)}
            >
              Create Post
            </button>
          </div>
        </div>

        {/* Help Center Card */}
        <div className="bg-black w-4xl rounded-lg shadow-md mt-20 p-6 flex items-center justify-between">
          <div className="flex items-center">
            <img src={QuestionMarkIcon} alt="Help Center Icon" className="w-12 h-12 mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Help Center</h2>
              <p className="text-gray-400">
                View and respond to farmers' questions on agriculture, crop management, 
                pest control, and best farming practices.
              </p>
            </div>
          </div>
          <button 
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-150 ease-in-out"
            onClick={() => navigate(`/researcher/my-qna`)}
          >
            View
          </button>
        </div>
      </div>

      {/* Right Sidebar with user data */}
      <RightSideBar userData={userID} />
    </div>
  );
}