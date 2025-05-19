import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarResearcher from '../components/SidebarResearcher';
import { getResearcherId } from '../utils/auth';


export default function NewsUpdate() {

    const location = useLocation();
    const navigate = useNavigate();
    const { news } = location.state || {};
    const [userID, setUserID] = useState(null);

    const [title, setTitle] = useState(news?.title || '');
    const [content, setContent] = useState(news?.content || '');
    const [author, setAuthor] = useState(news?.author || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
      const userId = getResearcherId();
        
      if (userId) {
        setUserID(userId);
      } else {
        navigate(`/auth/login`);
      }})

    const handleSubmit = async (e) =>  {
   
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMsg('');

        try {
            const updatedNews = { title, content, author}

            const response = await fetch(`http://localhost:3000/api/researcher/news/${news._id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedNews),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' 
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update news');
            }

            setSuccessMsg('News updated successfully!');
            setTimeout(() => navigate('/researcher/my-news'), 1500);
            
            } catch (error) {
                setError(error.message);
                console.error('Update error:', error);
            } finally {
                setIsSubmitting(false);
            }


    }

    if (!news) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-800">No news selected for editing</h2>
                {/* Success and error messages */}
                {successMsg && (
                    <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
                        {successMsg}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
                        {error}
                    </div>
                )}
                <button 
                    onClick={() => navigate('/researcher/my-news')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Back to news
                </button>
            </div>
        );
    }


  return (

    <div>
         <SidebarResearcher/>

         <div className="min-h-screen bg-gray-200 p-8 ">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit New</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title*
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)} value={title}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
             onChange={(e) => setContent(e.target.value)} value={content}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

            {/* Author */}
            <div>
              <label htmlFor="sunRequirement" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
               type="text"
                onChange={(e) => setAuthor(e.target.value)} value={author}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
                
            </div>

          <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/researcher/my-news')}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Guide'}
                        </button>
                    </div>
        </form>
      </div>
    </div>

    </div>
  )
}
