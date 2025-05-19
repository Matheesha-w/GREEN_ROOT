import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function QnAReplyForm({ ticketID }) {
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the description field
    if (!description.trim()) {
      setError('Please write a solution before submitting.');
      return;
    }

    setIsSubmitting(true); // Set loading state
    setError(null); // Clear previous errors

    const solution = { ticketID, description };

    try {
      const response = await fetch('http://localhost:3000/api/researcher/solutions', {
        method: 'POST',
        body: JSON.stringify(solution),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Failed to submit solution');
      }

      // Reset form
      setDescription('');
      setError(null);

      // Redirect to the same page to refresh data
      navigate(0); // Reloads the current page
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="p-6 w-6xl">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            placeholder="Write your solution..."
            className="w-full p-3 border border-green-300 rounded-lg outline-1 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400"
          >
            {isSubmitting ? 'Submitting...' : 'Send'}
          </button>
        </div>
        {error && <div className="text-red-500 text-sm ">{error}</div>}
      </form>
    </div>
  );
}