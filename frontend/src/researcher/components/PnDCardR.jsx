import React, { useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link, useNavigate } from 'react-router-dom';

export default function PnDCardR({pnd}) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async () => {
        setIsSubmitting(true);
        setError(null);
    
        try {
          const response = await fetch('http://localhost:3000/api/researcher/pnd/' + pnd._id, {
            method: 'DELETE',
          });
    
          const json = await response.json();
    
          if (!response.ok) {
            throw new Error(json.error || 'Failed to delete post');
          }
    
          navigate(0);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsSubmitting(false);
        }
      };

  return (
    <div className="w-full mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex flex-col md:flex-row gap-4">
      {/* Image - Left Column */}
      <div className="w-full md:w-1/4 flex-shrink-0">
        <img
          src={`http://localhost:3000/${pnd.file}`}
          alt="news"
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>
      
      {/* Content - Right Column */}
      <div className="flex-1 flex flex-col">
        {/* Title and Date Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {pnd.title}
          </h3>
          
        </div>

        <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(pnd.createdAt), { addSuffix: true })}
          </span>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-2">
          <Link 
            to="/researcher/my-pnd/update" 
            state={{ pnd }}
            className="p-2 text-green-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>
          </Link>

          <button
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            onClick={handleDelete}
            disabled={isSubmitting}
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

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mt-2 text-right">
            {error}
          </div>
        )}
      </div>
    </div>
  </div>
  )
}
