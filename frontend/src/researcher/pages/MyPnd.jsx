import React, { useEffect, useState } from 'react'
import SidebarResearcher from '../components/SidebarResearcher'
import PnDForm from '../components/PnDForm'
import PnDCardR from '../components/PnDCardR'
import { useNavigate } from 'react-router-dom';
import { getResearcherId } from '../utils/auth';
import Cookies from 'js-cookie';

export default function MyPnd() {

  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [pnds, setPnds] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const userId = getResearcherId();
      
    if (userId) {
      setUserID(userId);
    } else {
      navigate(`/auth/login`);
    }

    const fetchPnd = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/researcher/pnd/my-pnd`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('authToken')}`
          },
          credentials: 'include'
        });
        
        const json = await response.json(); 
    
        if (response.ok) {
          setPnds(json);
        } else {
          console.error('Error response:', json);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchPnd();
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
          {showForm ? 'Cancel' : '+ Publish Post'}
        </button>
      </div>

      {/* Conditional News Form */}
      {showForm && <PnDForm />}

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 -mb-16 mt-6">Your Published posts</h1>
      </div>

      {/* News List */}
      <div className='mt-16 w-6xl'>
        {pnds.map((pnd) => (
          <PnDCardR key={pnd._id} pnd={pnd} />
        ))}
      </div>
    </div>
  </div>
  )
}
