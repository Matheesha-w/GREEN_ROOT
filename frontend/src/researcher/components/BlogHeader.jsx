import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../extras/Greenroots-logo-color.png';

export default function BlogHeader() {
  return (
    <header className="bg-gray-200 h-20 flex items-center ">
      <div className="container mx-auto flex items-center justify-between p-4 ">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={Logo}
              alt="Green Roots Logo"
              className="ml-44 h-34 w-34"
            />
          </Link>
        </div>

        {/* Navigation Links - Updated with whitespace-nowrap and adjusted spacing */}
        <nav className="flex whitespace-nowrap space-x-4 absolute left-1/2 transform -translate-x-1/2 ml-20">
          <Link to="/blog" className="text-gray-700 hover:bg-amber-500 transition-colors font-bold py-2 px-3 rounded mr-10">
            Home
          </Link>
          <Link to="/blog/news" className="text-gray-700 hover:bg-amber-500 transition-colors font-bold py-2 px-3 rounded mr-10">
            News
          </Link>
          <Link to="/blog/growing-guide" className="text-gray-700 hover:bg-amber-500 transition-colors font-bold py-2 px-3 rounded mr-10">
            Growing Guide
          </Link>
          <Link to="/blog/pest-and-disease" className="text-gray-700 hover:bg-amber-500 transition-colors font-bold py-2 px-3 rounded mr-10">
            Pest and Disease
          </Link>
          <Link to="/blog/qna" className="text-gray-700 hover:bg-amber-500 transition-colors font-bold py-2 px-3 rounded mr-10">
            Q&A
          </Link>
          <Link to="/blog/publications" className="text-gray-700 hover:bg-amber-500 transition-colors font-bold py-2 px-3 rounded">
            Publications
          </Link>
        </nav>
      </div>
    </header>
  );
}