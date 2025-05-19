import React, { useEffect, useState } from 'react';
import PnDCard from '../components/PnDCard';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';

export default function PnDBlog() {

    const [pndList, setPndList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPnd = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/researcher/pnd');
            const json = await response.json();
    
            if (response.ok) {
              // Sort news by createdAt date (newest first)
              const sortedPnd = json.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              setPndList(sortedPnd);
            }
          } catch (error) {
            console.error('Error fetching posts:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPnd();
      }, []);

  return (
    <div className='bg-gray-200'>
      <BlogHeader />
      
     {/* Heading Section */}
     <div className="text-center my-8 md:my-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                       Protect Your Crop
                    </h2>
                    <p className="text-gray-600">Common Pests & Plant Diseases Explained</p>
                </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : (
        /* News Grid */
        <div className="max-w-7xl mx-auto px-4 pb-12">
          {pndList.length === 0 ? (
            <p className="text-center text-gray-600">No posts available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
              {pndList.map((pnd) => (
                <PnDCard 
                  key={pnd._id} 
                  pnd={pnd}
                  showNewBadge={Date.now() - new Date(pnd.createdAt) < 7 * 24 * 60 * 60 * 1000}
                />
              ))}
            </div>
          )}
        </div>
      )}
      
      <BlogFooter />
    </div>
  )
}
