import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';
import pdfIcon from '../extras/pdf.png';

export default function PublicationsBlog() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/researcher/publications', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`
        },
        credentials: 'include'
      });
      
      const json = await response.json(); 
    
      if (response.ok) {
        setPublications(json);
      } else {
        setError(json.error || 'Failed to fetch publications');
      }
    } catch (error) {
      setError('Network error while fetching publications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );
  
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className='bg-gray-200 min-h-screen'>
      <BlogHeader />

      {/* Heading Section */}
      <div className="text-center my-8 md:my-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
          Research Publications & Insights
        </h2>
        <p className="text-gray-600">Explore expert knowledge to enhance sustainable farming practices</p>
      </div>

      {/* Publications List Container */}
      <div className="flex justify-center px-4 mb-20">
        <div className="w-full max-w-4xl"> {/* Control width here */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {publications.map((pub) => (
                <div key={pub._id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                  <div className="flex items-center space-x-4 min-w-0">
                    <img 
                      src={pdfIcon} 
                      alt="PDF Icon" 
                      className="w-8 h-8 flex-shrink-0" 
                    />
                    <div className="min-w-0">
                      <h3 className="text-lg font-medium text-gray-800 truncate">{pub.title}</h3>
                      <p className="text-sm text-gray-600 truncate">By {pub.author} • {new Date(pub.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {pub.file && (
                    <a 
                      href={`http://localhost:3000/${pub.file}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm whitespace-nowrap ml-4"
                    >
                      View
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BlogFooter />
    </div>
  );
}