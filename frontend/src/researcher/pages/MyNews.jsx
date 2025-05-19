import React, { useState, useEffect } from 'react';
import SidebarResearcher from '../components/SidebarResearcher';
import NewsForm from '../components/NewsForm';
import NewsCardR from '../components/NewsCardR';
import { useNavigate } from 'react-router-dom';
import { getResearcherId } from '../utils/auth';
import Cookies from 'js-cookie';

export default function MyNews() {

  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [newss, setNewss] = useState([]);
  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    const userId = getResearcherId();
      
    if (userId) {
      setUserID(userId);
    } else {
      navigate(`/auth/login`);
    }

    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/researcher/news/my-news`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('authToken')}`
          },
          credentials: 'include'
        });
        
        const json = await response.json(); 
    
        if (response.ok) {
          setNewss(json);
        } else {
          console.error('Error response:', json);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchNews();
  }, []); 

  return (
    <div className="min-h-screen bg-gray-200 flex">
      {/* Sidebar */}
      <SidebarResearcher />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        {/* Toggle Button for News Form */}
        <div className="mb-6 mt-10">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Publish New News'}
          </button>
        </div>

        {/* Conditional News Form */}
        {showForm && <NewsForm />}

        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800 -mb-16 mt-6">Your Published News</h1>
        </div>

        {/* News List */}
        <div className='mt-16 w-6xl'>
          {newss.map((news) => (
            <NewsCardR key={news._id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
}