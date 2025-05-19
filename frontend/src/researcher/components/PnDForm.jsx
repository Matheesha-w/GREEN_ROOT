import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getResearcherId } from '../utils/auth'

export default function PnDForm() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [causes, setCauses] = useState('')
    const [solution, setSolution] = useState('')
    const [author, setAuthor] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true); // Set loading state
        setError(null); // Clear previous errors

         // Get the researcher's ID
        const researcherId = getResearcherId();
        if (!researcherId) {
          setError('You must be logged in as a researcher to submit news.');
          setIsSubmitting(false);
          return;
        }

        const data = new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('causes', causes);
        data.set('solution', solution);
        data.set('author', author);
        data.set('user_id', researcherId);

        // Only add file if it exists
        if (file && file[0]) {
            data.set('file', file[0])
        }


        try {
            const response = await fetch('http://localhost:3000/api/researcher/pnd', {
            method: 'POST',
            body: data,
           credentials: 'include',
         });
      
          const json = await response.json();
      
          if (!response.ok) {
            setError(json.error);
          }
      
          if (response.ok) {
            setTitle('')
            setDescription('')
            setCauses('')
            setSolution('')
            setAuthor('')
            setFile(null)

            console.log('Post Added Successfully', json);
          }
      
            // Redirect to the same page to refresh data
            navigate(0); // Reloads the current page
          }  catch (error) {
            setError(error.message); // Set error message
          } finally {
            setIsSubmitting(false); // Reset loading state
          }
    }

  return (
    <div className="w-5xl ">
      {/* News Submission Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter title"
          />
        </div>

        {/* description Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter description"
            rows="5"
          />
        </div>

        {/* Causes Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Causes
          </label>
          <input
            type="text"
            onChange={(e) => setCauses(e.target.value)}
            value={causes}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter causes"
          />
        </div>

        {/* Solution Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Solution
          </label>
          <input
            type="text"
            onChange={(e) => setSolution(e.target.value)}
            value={solution}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter solution"
          />
        </div>

        {/* Author Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter author name"
          />
        </div>

        {/* File Upload Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
            Upload File
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}
