import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../extras/Greenroots-logo-color.png'; 

export default function SidebarResearcher() {
  return (
    <div
      id="sidebar"
      className="bg-white h-screen fixed left-0 top-0 w-60 shadow-xl px-3 overflow-y-auto"
    >
      {/* Logo */}
      <div className="flex justify-center mt-6">
        <Link to="/">
        <img
          src={Logo}
          alt="Greenroots Logo"
          className="w-40 h-40" 
        /></Link>
      </div>

      {/* Menu Items */}
      <div className="mt-8 space-y-2">
        {/* Dashboard */}
        <Link
          to="/researcher"
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
        >
          <svg
            className="w-6 h-6 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          <span className="ml-2">Dashboard</span>
        </Link>

        {/* News */}
        <Link
          to="/researcher/my-news"
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
        >
          <svg
            className="w-6 h-6 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="ml-2">News</span>
        </Link>

        {/* Growing Guide */}
        <Link
          to="/researcher/my-growing-guide"
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
        >
          <svg
            className="w-6 h-6 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252zM2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="ml-2">Growing Guide</span>
        </Link>

        {/* Pest and Disease */}
        <Link
          to="/researcher/my-pnd"
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
        >
          <svg
            className="w-6 h-6 fill-current"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.478 1.6a.75.75 0 0 1 .273 1.026 3.72 3.72 0 0 0-.425 1.121c.058.058.118.114.18.168A4.491 4.491 0 0 1 12 2.25c1.413 0 2.673.651 3.497 1.668.06-.054.12-.11.178-.167a3.717 3.717 0 0 0-.426-1.125.75.75 0 1 1 1.298-.752 5.22 5.22 0 0 1 .671 2.046.75.75 0 0 1-.187.582c-.241.27-.505.52-.787.749a4.494 4.494 0 0 1 .216 2.1c-.106.792-.753 1.295-1.417 1.403-.182.03-.364.057-.547.081.152.227.273.476.359.742a23.122 23.122 0 0 0 3.832-.803 23.241 23.241 0 0 0-.345-2.634.75.75 0 0 1 1.474-.28c.21 1.115.348 2.256.404 3.418a.75.75 0 0 1-.516.75c-1.527.499-3.119.854-4.76 1.049-.074.38-.22.735-.423 1.05 2.066.209 4.058.672 5.943 1.358a.75.75 0 0 1 .492.75 24.665 24.665 0 0 1-1.189 6.25.75.75 0 0 1-1.425-.47 23.14 23.14 0 0 0 1.077-5.306c-.5-.169-1.009-.32-1.524-.455.068.234.104.484.104.746 0 3.956-2.521 7.5-6 7.5-3.478 0-6-3.544-6-7.5 0-.262.037-.511.104-.746-.514.135-1.022.286-1.522.455.154 1.838.52 3.616 1.077 5.307a.75.75 0 1 1-1.425.468 24.662 24.662 0 0 1-1.19-6.25.75.75 0 0 1 .493-.749 24.586 24.586 0 0 1 4.964-1.24h.01c.321-.046.644-.085.969-.118a2.983 2.983 0 0 1-.424-1.05 24.614 24.614 0 0 1-4.76-1.05.75.75 0 0 1-.516-.75c.057-1.16.194-2.302.405-3.417a.75.75 0 0 1 1.474.28c-.164.862-.28 1.74-.345 2.634 1.237.371 2.517.642 3.832.803.085-.266.207-.515.359-.742a18.698 18.698 0 0 1-.547-.08c-.664-.11-1.311-.612-1.417-1.404a4.535 4.535 0 0 1 .217-2.103 6.788 6.788 0 0 1-.788-.751.75.75 0 0 1-.187-.583 5.22 5.22 0 0 1 .67-2.04.75.75 0 0 1 1.026-.273Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="ml-2">Pest and Disease</span>
        </Link>

        {/* Stats */}
        <Link
          to="/researcher/my-stats"
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
        >
          <svg
            className="w-6 h-6 fill-current"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="ml-2">Stats</span>
        </Link>

        {/* Q&A */}
        <Link
          to="/researcher/my-qna"
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
        >
          <svg
            className="w-6 h-6 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="ml-2">Q&A</span>
        </Link>

        {/* Publications */}
        <Link
          to="/researcher/publications"
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
        >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path 
              fillRule="evenodd" 
              d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
          </svg>

          <span className="ml-2">Publications</span>
        </Link>

        {/* View Blog */}
        <Link
          to="/blog"
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
        >
          <svg
            className="w-6 h-6 fill-current"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
              clipRule="evenodd"
            />
            <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
          </svg>
          <span className="ml-2">View Blog</span>
        </Link>
      </div>
    </div>
  );
}
