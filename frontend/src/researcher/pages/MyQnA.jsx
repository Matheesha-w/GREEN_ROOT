import React, { useEffect, useState } from 'react';
import SidebarResearcher from '../components/SidebarResearcher';
import MyQnACard from '../components/MyQnACard';
import { getResearcherId } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function MyQnA() {

  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [tickets, setTickets] = useState([]); // All tickets
  const [ticketsWithNoSolutions, setTicketsWithNoSolutions] = useState([]); // Tickets with no solutions
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {

    const userId = getResearcherId();
      
    if (userId) {
      setUserID(userId);
    } else {
      navigate(`/auth/login`);
    }

    const fetchTicketsAndSolutions = async () => {
      try {
        // Fetch all tickets
        const ticketsResponse = await fetch('http://localhost:3000/api/v1/ticket');
        const ticketsData = await ticketsResponse.json();

        if (!ticketsResponse.ok) {
          throw new Error('Failed to fetch tickets');
        }

        // Fetch all solutions
        const solutionsResponse = await fetch('http://localhost:3000/api/researcher/solutions');
        const solutionsData = await solutionsResponse.json();

        if (!solutionsResponse.ok) {
          throw new Error('Failed to fetch solutions');
        }

        // Map solutions to their ticket IDs
        const solutionsMap = solutionsData.reduce((map, solution) => {
          if (!map[solution.ticketID]) {
            map[solution.ticketID] = [];
          }
          map[solution.ticketID].push(solution);
          return map;
        }, {});

        // Attach solutions to tickets
        const ticketsWithSolutions = ticketsData.data.map((ticket) => ({
          ...ticket,
          solutions: solutionsMap[ticket._id] || [], // Attach solutions or an empty array
        }));

        // Separate tickets into two groups
        const noSolutionTickets = ticketsWithSolutions.filter(
          (ticket) => ticket.solutions.length === 0
        );

        setTickets(ticketsWithSolutions); // All tickets
        setTicketsWithNoSolutions(noSolutionTickets); // Tickets with no solutions
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchTicketsAndSolutions();
  }, []);

  // Handle Reply Button Click
  const handleReply = (ticketId) => {
    console.log('Replying to ticket:', ticketId);
    // Navigate to a reply form or open a modal for submitting a solution
    // Example: window.location.href = `/reply/${ticketId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col min-h-screen bg-gray-200">
      <SidebarResearcher />
      <div className="ml-64 p-6">
        {/* Tickets to Reply (No Solutions) */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tickets to Reply</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ticketsWithNoSolutions.length > 0 ? (
            ticketsWithNoSolutions.map((ticket) => (
              <MyQnACard
                key={ticket._id}
                ticket={ticket}
                onReply={handleReply} // Pass the handleReply function
              />
            ))
          ) : (
            <p className="text-gray-600">No tickets to reply.</p>
          )}
        </div>

        {/* All Tickets */}
        <h1 className="text-2xl font-bold text-gray-800 mt-10 mb-6">All Tickets</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <MyQnACard
                key={ticket._id}
                ticket={ticket}
                onReply={handleReply} // Pass the handleReply function
              />
            ))
          ) : (
            <p className="text-gray-600">No tickets found.</p>
          )}
        </div>
      </div>
    </div>
  );
}