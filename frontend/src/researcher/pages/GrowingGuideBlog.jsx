import React, { useState, useEffect } from 'react';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';
import GrowingGuideCard from '../components/GrowingGuideCard';
import BlogCrop from '../pages/BlogCrop'

export default function GrowingGuideBlog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/researcher/posts');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const json = await response.json();
                setPosts(json);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
        
        // Cleanup function
        return () => {
            // Cancel any pending requests if component unmounts
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            <BlogHeader />
            <main className="flex-grow">
                {/* Heading Section */}
                <div className="text-center my-8 md:my-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                        Learn, Grow, Harvest
                    </h2>
                    <p className="text-gray-600">Discover expert growing guides for your plants</p>
                </div>

                <div className="p-4  ml-26 -mb-10">
                <h3 className="text-xl font-bold text-gray-800 ">
                  Popular plants to grow
                </h3>
                
              </div>

                {/* Content Section */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-500 mb-2">Failed to load posts</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="px-4 sm:px-6 lg:px-8 py-6">
                        <div className="p-4 text-center">
                
              </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            {posts.map((post) => (
                                <GrowingGuideCard key={post._id} post={post} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No growing guides available yet.</p>
                    </div>
                )}
            </main>

            <div className='ml-30 mb-16 mt-6' >
               <BlogCrop/>
            </div>


            <BlogFooter />
        </div>
    );
}