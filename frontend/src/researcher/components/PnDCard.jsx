import React from 'react'
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function PnDCard({pnd}) {
  return (
    <Link to={`/blog/pest-and-disease/${pnd._id}`}> {/* Link to single pnd page */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <img
          src={`http://localhost:3000/${pnd.file}`}
          alt="news"
          className="w-full h-32 object-cover"
        />

        {/* Content */}
        <div className="p-4">

          {/* Title */}
          <h4 className="text-lg font-bold text-gray-800 mt-1 mb-2 hover:text-green-600 transition-colors duration-300 line-clamp-3">
            {pnd.title}
          </h4>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {pnd.description}
          </p>

          {/* Metadata (Author and Date) */}
          <div className="flex items-center text-xs text-gray-500 ">
          <div className='mr-1'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
           <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
          </svg>
          </div>

            <span>
              {formatDistanceToNow(new Date(pnd.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
