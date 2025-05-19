import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 shadow-md transition-all duration-300 ease-in-out"
            onClick={() => navigate(-1)} // Navigate back to the previous page
        >
            Go Back
        </button>

    )
};

export default BackButton