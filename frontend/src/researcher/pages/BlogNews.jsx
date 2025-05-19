import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';

export default function BlogNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/researcher/news');
        const json = await response.json();

        if (response.ok) {
          // Sort news by createdAt date (newest first)
          const sortedNews = json.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setNewsList(sortedNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className='bg-gray-200'>
      <BlogHeader />
      
     {/* Heading Section */}
     <div className="text-center my-8 md:my-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                       Agriculture News
                    </h2>
                    <p className="text-gray-600">Stay Updated, Stay Ahead</p>
                </div>

      {/* Loading State */}
      {loading ? (
        <div className=" flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : (
        /* News Grid */
        <div className="max-w-7xl mx-auto px-4 pb-12">
          {newsList.length === 0 ? (
            <p className="text-center text-gray-600">No news available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
              {newsList.map((news) => (
                <NewsCard 
                  key={news._id} 
                  news={news}
                  showNewBadge={Date.now() - new Date(news.createdAt) < 7 * 24 * 60 * 60 * 1000}
                />
              ))}
            </div>
          )}
        </div>
      )}
      
      <BlogFooter />
    </div>
  );
}