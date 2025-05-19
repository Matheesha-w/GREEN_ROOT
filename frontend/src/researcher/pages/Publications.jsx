import React, { useState, useEffect } from 'react';
import SidebarResearcher from '../components/SidebarResearcher';
import { useNavigate } from 'react-router-dom';
import { getResearcherId } from '../utils/auth';
import Cookies from 'js-cookie';

export default function Publications() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [userID, setUserID] = useState(null);
    const [pubs, setPubs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const userId = getResearcherId();
          
        if (userId) {
            setUserID(userId);
            fetchPublications();
        } else {
            navigate('/auth/login');
        }
    }, []);

    const fetchPublications = async () => {
        setIsFetching(true);
        try {
            const response = await fetch('http://localhost:3000/api/researcher/publications/my-publications', {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                },
                credentials: 'include'
            });
            
            const json = await response.json(); 
        
            if (response.ok) {
                setPubs(json);
            } else {
                setError(json.error || 'Failed to fetch publications');
            }
        } catch (error) {
            setError('Network error while fetching publications');
        } finally {
            setIsFetching(false);
        }
    };

    const handleDelete = async (pubId) => {
    
        try {
            const response = await fetch(`http://localhost:3000/api/researcher/publications/${pubId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                },
                credentials: 'include'
            });
    
            const json = await response.json();
    
            if (!response.ok) {
                throw new Error(json.error || 'Failed to delete publication');
            }
    
            // Refresh the publications list after successful deletion
            fetchPublications();
            setSuccessMessage('Publication deleted successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const researcherId = getResearcherId();
        if (!researcherId) {
            setError('You must be logged in as a researcher to submit publication.');
            return;
        }

        if (!file) {
            setError('Please select a PDF file');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccessMessage('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('file', file);
        formData.append('user_id', researcherId);

        try {
            const response = await fetch('http://localhost:3000/api/researcher/publications', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || 'Failed to upload publication');
            }

            setTitle('');
            setAuthor('');
            setFile(null);
            setSuccessMessage('Publication uploaded successfully!');
            fetchPublications(); // Refresh the publications list
            navigate(0)
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = (filePath) => {
        window.open(`http://localhost:3000/${filePath}`, '_blank');
    };

 return (
        <div className="min-h-screen bg-gray-200 flex">
            {/* Sidebar */}
            <SidebarResearcher />   

            {/* Main Content */}
            <div className="flex-1 p-8 max-w-4xl mx-auto ml-100">
                <h1 className="text-2xl font-bold mb-6">Upload New Publication</h1>
                
                {/* Messages */}
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Upload Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="title">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="author">
                                Author
                            </label>
                            <input
                                id="author"
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="file">
                                PDF File
                            </label>
                            <input
                                id="file"
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full p-2 border border-gray-300 rounded file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">Only PDF files are accepted (Max 10MB)</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Uploading...' : 'Upload Publication'}
                        </button>
                    </form>
                </div>

               {/* Publications List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Your Publications</h2>
    
                {isFetching ? (
                 <p>Loading publications...</p>
                ) : pubs.length === 0 ? (
                 <p className="text-gray-500">No publications found</p>
                ) : (
                <div className="space-y-4">
                    {pubs.map((pub) => (
                      <div key={pub._id} className="border-b pb-4 flex justify-between items-start">
                     <div>
                        <h3 className="font-medium text-lg">{pub.title}</h3>
                        <p className="text-gray-600">By: {pub.author}</p>
                        <p className="text-sm text-gray-500">
                            Uploaded: {new Date(pub.createdAt).toLocaleDateString()}
                        </p>
                        {pub.file && (
                            <button
                                onClick={() => handleDownload(pub.file)}
                                className="mt-2 text-blue-600 hover:text-blue-800"
                            >
                                View
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => handleDelete(pub._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete publication"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                            />
                          </svg>
                           </button>
                         </div>
                 ))}
            </div>
             )}
        </div>
            </div>
        </div>
    );
}