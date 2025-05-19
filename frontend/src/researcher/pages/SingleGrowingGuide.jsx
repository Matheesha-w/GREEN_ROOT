import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';

export default function SingleGrowingGuide() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/researcher/posts/${id}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const json = await response.json();
        setPost(json);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-200">
        <BlogHeader />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

 

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <BlogHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg w-5xl ml-56">
          <img
            src={`http://localhost:3000/${post.file}`}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {post.title}
          </h1>
          
          {/* Binomial Name */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Binomial Name</h2>
              <p className="text-gray-600 italic">{post.binominalName}</p>
            </div>

          {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">{post.description}</p>
            </div>

          {/* Growing Requirements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Sun Requirement */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-600 mb-1">Sun Requirement</h3>
                <p className="text-gray-700">{post.sunRequirement}</p>
              </div>

            {/* Soil Requirement */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-600 mb-1">Soil Requirement</h3>
                <p className="text-gray-700">{post.soilRequirements}</p>
              </div>

            {/* Sowing Method */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-600 mb-1">Sowing Method</h3>
                <p className="text-gray-700">{post.sowingMethod}</p>
              </div>

            {/* Watering Needs */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-600 mb-1">Watering Needs</h3>
                <p className="text-gray-700">{post.wateringNeeds}</p>
              </div>

            {/* Spread */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-600 mb-1">Spread</h3>
                <p className="text-gray-700">{post.spread} cm</p>
              </div>

            {/* Row Spacing */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-600 mb-1">Row Spacing</h3>
                <p className="text-gray-700">{post.rowSpacing} cm</p>
              </div>

            {/* Height */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-600 mb-1">Height</h3>
                <p className="text-gray-700">{post.height} cm</p>
              </div>
          </div>
        </div>
      </main>

      <BlogFooter />
    </div>
  )
}