import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';

export default function SinglePndPage() {
    const { id } = useParams();
    const [pnd, setPnd] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPnd = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/researcher/pnd/${id}`);
                const json = await response.json();
        
                if (response.ok) {
                    setPnd(json);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPnd();
    }, [id]);

    if (loading) {
        return (
            <div className='min-h-screen bg-gray-200'>
                <BlogHeader />
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
            </div>
        );
    }
  
    if (!pnd) {
        return (
            <div className='min-h-screen bg-gray-50'>
                <BlogHeader />
                <div className="max-w-4xl mx-auto p-6 text-center py-20">
                    <p className="text-xl text-gray-600">Post not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-200'>
            <BlogHeader />
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Image with shadow and hover effect */}
                {pnd.file && (
                    <div className="mb-8 overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                        <img
                            src={`http://localhost:3000/${pnd.file}`}
                            alt={pnd.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                )}

                {/* Title (original style) */}
                <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-4">
                    {pnd.title}
                </h1>

                {/* Metadata (Author and Date - original style) */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span className="font-semibold">{pnd.author}</span>
                    <div className='ml-0.5 mr-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1e90ff" className="size-5">
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span>
                        {formatDistanceToNow(new Date(pnd.createdAt), { addSuffix: true })}
                    </span>
                </div>

                {/* Content sections with cards */}
                <div className="space-y-8">
                    {/* Description */}
                    {pnd.description && (
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Description</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {pnd.description}
                            </p>
                        </div>
                    )}

                    {/* Causes */}
                    {pnd.causes && (
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Causes</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {pnd.causes}
                            </p>
                        </div>
                    )}

                    {/* Solution */}
                    {pnd.solution && (
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Solution</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {pnd.solution}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <BlogFooter/>
        </div>
    );
}