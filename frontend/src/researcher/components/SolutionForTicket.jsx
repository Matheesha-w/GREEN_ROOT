import React, { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function SolutionForTicket({ ticketID }) {
  const [solutions, setSolutions] = useState([]); // Solutions for the ticket
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch solutions for the ticket
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/researcher/solutions/ticket/${ticketID}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch solutions');
        }

        // Check if the response is an array (even if empty)
        if (!Array.isArray(data)) {
          throw new Error('Invalid solutions data');
        }

        setSolutions(data); // Set solutions data
      } catch (error) {
        console.error('Error fetching solutions:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchSolutions();
  }, [ticketID]);

  // Handle delete solution
  const handleDelete = async (solutionId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/researcher/solutions/${solutionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete solution');
      }

      // Remove the deleted solution from the state
      setSolutions(solutions.filter((solution) => solution._id !== solutionId));
    } catch (error) {
      console.error('Error deleting solution:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-green-100">
      {solutions.length > 0 ? (
        solutions.map((solution) => (
          <div key={solution._id} className="mb-4">
            {/* Solution Description */}
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{solution.description}</p>
            </div>

            {/* Solution File (if any) */}
            {solution.file && (
              <img
                src={solution.file}
                alt="Solution"
                className="w-full h-32 object-cover rounded-lg mt-2"
              />
            )}

            {/* Solution Date */}
            <p className="text-xs text-gray-500 mt-2">
              Posted {formatDistanceToNow(new Date(solution.createdAt), { addSuffix: true })}
            </p>

            {/* Delete Button */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#6B7280"
                className="size-6 cursor-pointer float-right"
                onClick={() => handleDelete(solution._id)} // Pass solution._id to handleDelete
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No solutions provided yet.</p>
      )}
    </div>
  );
}