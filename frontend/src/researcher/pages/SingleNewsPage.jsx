import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';

export default function SingleNewsPage() {
  const { id } = useParams(); // Get the news ID from the URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/researcher/news/${id}`);
        const json = await response.json();

        if (response.ok) {
          setNews(json);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className='bg-gray-200'>
        <BlogHeader />
        <div className="bg-gray-200 flex justify-center items-center h-64 ">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 "></div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className='bg-gray-200'>
        <BlogHeader />
        <p className="text-center text-gray-600">News not found.</p>
      </div>
    );
  }

  return (
    <div className='bg-gray-200'>
      <BlogHeader />
      <div className="max-w-4xl mx-auto p-6">
        {/* Image */}
        <img
          src={`http://localhost:3000/${news.file}`}
          alt="news"
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-4">
          {news.title}
        </h1>

        {/* Metadata (Author and Date) */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span className="font-semibold">{news.author}</span>
          <div className='ml-0.5 mr-5'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1e90ff " class="size-5">
         <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
         </svg>
          </div>
          <span>
            {formatDistanceToNow(new Date(news.createdAt), { addSuffix: true })}
          </span>
        </div>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed">
          {news.content}
        </p>
      </div>
      <BlogFooter/>
    </div>
  );
}