import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import SidebarResearcher from '../components/SidebarResearcher';
import SolutionForTicket from '../components/SolutionForTicket';
import QnAReplyForm from '../components/QnAReplyForm';
import { getResearcherId } from '../utils/auth';

export default function ReplyQnA() {

  const [userID, setUserID] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ticket ID from the URL
  const [ticket, setTicket] = useState(null); // Ticket details
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {

    const userId = getResearcherId();
      
    if (userId) {
      setUserID(userId);
    } else {
      navigate(`/auth/login`);
    }

    const fetchTicket = async () => {
      try {
        console.log('Fetching ticket with ID:', id); // Log the ticket ID

        const response = await fetch(`http://localhost:3000/api/v1/ticket/${id}`);
        const json = await response.json();

        console.log('Backend Response:', json); // Log the response

        if (!response.ok) {
          throw new Error('Failed to fetch ticket');
        }

        setTicket(json.data); // Adjust based on the actual response structure
      } catch (error) {
        console.error('Error fetching ticket:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <div>
        <SidebarResearcher />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div>
        <SidebarResearcher />
        <p className="text-center text-gray-600">Ticket not found.</p>
      </div>
    );
  }

  return (
    <div>
      <SidebarResearcher />
      <div className="ml-64 p-6 w-6xl">
        
        {/* Ticket Details */}
        <div className="bg-gray-200 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ticket Details</h2>

          {/* Ticket Subject */}
          <h4 className="text-lg font-semibold text-gray-800">{ticket.subject}</h4>

          {/* Ticket Date */}
          <p className="text-sm text-gray-500 mt-1">
            Posted {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
          </p>

          {/* Ticket Description */}
          <p className="text-sm text-gray-600 mt-4">{ticket.description}</p>

          {/* Ticket Image */}
          {ticket.image && (
            <img
              src={ticket.image}
              alt="Ticket"
              className="w-88 h-48 object-cover rounded-lg mt-4"
            />
          )}
        </div>
      </div>
      {/* Right Side: Solutions */}
      <div className="w-4xl bg-green-100 rounded-lg shadow-md p-6 float-right mr-32 mb-10">
            <SolutionForTicket ticketID={id} /> {/* Use the SolutionList component */}
          </div>

      <div className='ml-66'>
          <QnAReplyForm ticketID={id}/>
      </div>
    </div>
  );
}