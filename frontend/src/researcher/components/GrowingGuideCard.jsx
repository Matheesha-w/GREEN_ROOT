import React from 'react'
import { Link } from 'react-router-dom';

export default function GrowingGuideCard({ post }) {
  return (
    <Link 
      to={`/blog/growing-guide/${post._id}`} 
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 hover:-translate-y-1 bg-white"
    >
      <div className="aspect-square"> {/* Fixed aspect ratio */}
        <img 
          src={`http://localhost:3000/${post.file}`} 
          alt="post cover" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h4 className="text-gray-800 font-medium truncate">{post.title}</h4>
      </div>
    </Link>
  )
}