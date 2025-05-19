import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';

const CropDetails = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  const [activeTab, setActiveTab] = useState('details');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch crop details
        const cropResponse = await fetch(
          `https://openfarm.cc/api/v1/crops/${id}/`
        );
        
        if (!cropResponse.ok) {
          throw new Error('Failed to fetch crop details');
        }
        
        const cropData = await cropResponse.json();
        setCrop(cropData.data);
        
        // Fetch crop pictures
        const picturesResponse = await fetch(
          `https://openfarm.cc/api/v1/crops/${id}/pictures/`
        );
        
        if (!picturesResponse.ok) {
          throw new Error('Failed to fetch crop pictures');
        }
        
        const picturesData = await picturesResponse.json();
        setPictures(picturesData.data || []);
      } catch (error) {
        console.error('Error fetching crop details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Link
          to="/blog/growing-guide"
          className="inline-flex items-center text-green-600 hover:text-green-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Growing Guide
        </Link>
      </div>
    );
  }

  if (!crop) {
    return <div className="text-center py-10">Crop not found</div>;
  }

  const attributes = crop.attributes || {};
  const tags = attributes.tags || [];

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      
      <main className="flex-grow bg-gray-200">
        <div className="container mx-auto px-16 py-8">
          <Link
            to="/blog/growing-guide"
            className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back 
          </Link>

          {/* Main Crop Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/3 ">
                <div className="h-64 md:h-full bg-gray-200 flex items-center justify-center">
                  {attributes.main_image_path ? (
                    <img
                      src={attributes.main_image_path}
                      alt={attributes.name || 'Crop image'}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23e5e7eb"><rect width="100" height="100" rx="4" ry="4"/><text x="50%" y="50%" font-family="Arial" font-size="10" text-anchor="middle" dominant-baseline="middle" fill="%236b7280">Image not available</text></svg>';
                      }}
                    />
                  ) : (
                    <div className="text-center p-6 text-gray-500">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto mb-3" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                      <p>No image available</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {attributes.name || 'Unnamed Crop'}
                </h1>
                <p className="text-lg text-gray-600 italic mb-4">
                  {attributes.binomial_name || 'No binomial name specified'}
                </p>
                <p className="text-gray-700 mb-4">
                  {attributes.description || 'No description available'}
                </p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-4 font-medium text-sm ${
                  activeTab === 'details'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Growing Details
              </button>
              <button
                onClick={() => setActiveTab('pictures')}
                className={`py-2 px-4 font-medium text-sm ${
                  activeTab === 'pictures'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Pictures ({pictures.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Growing Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Sun Requirements</h3>
                  <p className="text-gray-600">{attributes.sun_requirements || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Growing Degree Days</h3>
                  <p className="text-gray-600">{attributes.growing_degree_days || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Sowing Method</h3>
                  <p className="text-gray-600">{attributes.sowing_method || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Spacing</h3>
                  <p className="text-gray-600">{attributes.spread || 'Not specified'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pictures' && (
            <div>
              {pictures.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {pictures.map((picture) => (
                    <div key={picture.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-48 relative">
                        <img
                          src={picture.attributes?.thumbnail_url || ''}
                          alt={`${attributes.name || 'Crop'} image`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentElement.innerHTML = `
                              <div class="h-full flex items-center justify-center bg-gray-100 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            `;
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-16 w-16 mx-auto mb-4 text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                  <p className="text-gray-500">No pictures available for this crop</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <BlogFooter />
    </div>
  );
};

export default CropDetails;