import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';
import MyQnACard from '../components/MyQnACard';
import { formatDistanceToNow } from 'date-fns';

export default function QnABlog() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [solutions, setSolutions] = useState({}); // Store solutions for each ticket
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/ticket`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch tickets');
        }

        const ticketsArray = Array.isArray(data) ? data : 
                          (data.data ? (Array.isArray(data.data) ? data.data : [data.data]) : 
                          []);
                          
        setTickets(ticketsArray);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError(error.message || 'Failed to load tickets');
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const toggleTicketExpansion = async (ticketId) => {
    if (!solutions[ticketId] && expandedTicket !== ticketId) {
      try {
        const response = await fetch(`http://localhost:3000/api/researcher/solutions/ticket/${ticketId}`);
        const data = await response.json();
        
        if (response.ok) {
          setSolutions(prev => ({
            ...prev,
            [ticketId]: Array.isArray(data) ? data : []
          }));
        }
      } catch (error) {
        console.error('Error fetching solutions:', error);
        setSolutions(prev => ({
          ...prev,
          [ticketId]: []
        }));
      }
    }
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  const handleCreateNew = () => {
    navigate('/farmer/:uid/experts');
  };

  if (loading) {
    return (
      <div>
        <BlogHeader />
        <div className="min-h-screen p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Q&A Forum</h1>
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Create New
              </button>
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-full p-4 bg-white rounded-lg animate-pulse">
                  <div className="flex space-x-4">
                    <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BlogFooter />
      </div>
    );
  }

  return (
    <div className='bg-gray-200'>
      <BlogHeader />
      {/* Heading Section */}
      <div className="text-center my-8 md:my-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                       Ask, Learn, Grow
                    </h2>
                    <p className="text-gray-600">Need Help? Get Answers from Agriculture Experts</p>
                </div>


      <div className="min-h-screen p-4 md:p-8 mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            {/* <h1 className="text-2xl font-bold text-gray-800">Q&A Forum</h1> */}
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Create Ticket
            </button>
          </div>

          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {tickets.length === 0 && !loading && !error ? (
            <div className="text-center py-10">
              <p className="text-gray-600">No tickets found.</p>
              <button
                onClick={handleCreateNew}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Create your first ticket
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <div key={ticket._id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="p-4">
                    <MyQnACard ticket={ticket} />
                  </div>
                  
                  <div className="px-4 pb-4">
                    <div className="mt-3">
                      <h3 className="font-semibold text-gray-800 mb-1">Question:</h3>
                      <p className="text-gray-600 whitespace-pre-line">{ticket.description}</p>
                    </div>
                    
                    {ticket.image && (
                      <div className="mt-3">
                        <h4 className="font-medium text-gray-700 mb-1">Attachment:</h4>
                        <img
                          src={ticket.image}
                          alt="Ticket attachment"
                          className="w-96 h-auto max-h-60 rounded-lg border"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xs text-gray-500">
                        Posted {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                      </p>
                      <button
                        onClick={() => toggleTicketExpansion(ticket._id)}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition text-sm"
                      >
                        {expandedTicket === ticket._id ? 'Hide Solutions' : 'View Solutions'}
                      </button>
                    </div>
                  </div>
                  
                  {expandedTicket === ticket._id && (
                    <div className="p-4 border-t bg-gray-50">
                      <h3 className="font-semibold text-gray-700 mb-3">Solutions:</h3>
                      {solutions[ticket._id]?.length > 0 ? (
                        solutions[ticket._id].map((solution) => (
                          <div key={solution._id} className="mb-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                              <p className="text-sm text-gray-600">{solution.description}</p>
                              {solution.file && (
                                <img
                                  src={solution.file}
                                  alt="Solution"
                                  className="w-full h-32 object-cover rounded-lg mt-2"
                                />
                              )}
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-xs text-gray-500">
                                Posted {formatDistanceToNow(new Date(solution.createdAt), { addSuffix: true })}
                              </p>
                  
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600">No solutions provided yet.</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BlogFooter />
    </div>
  );
}