import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function MyQnACard({ ticket }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:3000/api/user/${ticket.farmerID}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || 
            `Request failed with status ${response.status}`
          );
        }

        const result = await response.json();
        
        // More flexible response handling
        const userData = {
          email: result.email || result.data?.email || 'no-email@example.com',
          firstName: result.firstName || result.data?.firstName || '',
          lastName: result.lastName || result.data?.lastName || ''
        };

        if (!userData.email) {
          throw new Error('User data incomplete');
        }

        setUser(userData);
        
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError(error.message || 'Failed to load farmer details');
        
        // Set fallback user data
        setUser({
          email: 'unknown@farmer.com',
          firstName: 'Unknown',
          lastName: 'Farmer'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [ticket.farmerID]);

  const handleCardClick = () => {
    navigate(`/researcher/my-qna/reply/${ticket._id}`);
  };

  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-lg animate-pulse">
        <div className="flex space-x-4">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full flex items-start space-x-4 p-4 bg-white hover:bg-gray-100 rounded-lg transition-colors cursor-pointer border"
      onClick={handleCardClick}
    >
      <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
        <span className="text-sm font-semibold text-white">
          {user?.firstName?.charAt(0).toUpperCase() || 'F'}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          {error && (
            <p className="text-xs text-red-500 truncate">Note: {error}</p>
          )}
          <p className="text-xs text-gray-600 truncate">
            From: {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {user?.email}
          </p>
          <h4 className="text-sm font-semibold text-gray-800 mt-1 truncate">
            {ticket.subject}
          </h4>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}