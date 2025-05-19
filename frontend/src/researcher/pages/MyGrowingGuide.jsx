import React, { useEffect, useState } from 'react'
import GrowingGuideForm from '../components/GrowingGuideForm'
import SidebarResearcher from '../components/SidebarResearcher'
import MyGrowingguideCard from '../components/MyGrowingguideCard'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getResearcherId } from '../utils/auth';

export default function MyGrowingGuide() {
  
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);
    const [posts, setPosts] = useState([])
    const [showForm, setShowForm] = useState(false) 

    useEffect(() => {

      const userId = getResearcherId();
      
      if (userId) {
        setUserID(userId);
      } else {
        navigate(`/auth/login`);
      }

        const fetchPosts = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/researcher/posts/my-posts`, {
              headers: {
                'Authorization': `Bearer ${Cookies.get('authToken')}`
              },
              credentials: 'include'
            });
            
            const json = await response.json(); 
        
            if (response.ok) {
              setPosts(json);
            } else {
              console.error('Error response:', json);
            }
          } catch (error) {
            console.error('Fetch error:', error);
          }
        };
    
        fetchPosts();
      }, []);

  return (
    <div className='min-h-screen bg-gray-200 flex'>
       <div>
         <SidebarResearcher/>
       </div>
        
      {/* Main Content */}
      <div className="flex-1 p-8 ml-66">
        {/* Add New Post Button */}
        <div className="mb-6 mt-10">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Create New Growing Guide'}
          </button>
        </div>

        {/* Conditionally render the form */}
        {showForm && <GrowingGuideForm />}

        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800 -mb-16 mt-6">Your Published Posts</h1>
        </div>

        {/* Posts List */}
        <div className='mt-16 w-5xl gap-4 p-4'>
          {posts.map((post) => (
            <MyGrowingguideCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}