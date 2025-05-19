import React, { useEffect, useState } from 'react';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';
import HowToGrowImage from '../extras/howtogrow.jpg'; 
import PestAndDiseaseImage from '../extras/leavesdisease.jpg';
import QnAImage from '../extras/qna.jpg';

export default function Blog() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className='bg-gray-200'>
      <BlogHeader />
      
      {/* Hero Section */}
      <div 
        className="relative py-24 rounded-3xl mx-auto mt-10 mb-10 max-w-7xl overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HowToGrowImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          minHeight: '400px' 
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 relative z-10 h-full">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 ml-0 md:ml-24">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-14">
              We empower farmers<br />
              for a great future<br />
              with innovative tools<br />
              and expert knowledge.
            </h1>
            <p className="text-lg text-gray-200 mb-10">
              Originated at Green Roots, we are committed to empowering farmers with sustainable solutions and innovative tools.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <a
                href="/donate"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Support Researchers →
              </a>
              <a
                href="/get-involved"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Help Us Reach More Farmers
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 py-12">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl md:text-left ml-0 md:ml-80 text-black-900 mb-6 leading-10">
            Innovating agriculture for a brighter tomorrow<br />
            by equipping farmers with sustainable tools<br />
            to grow healthier crops and resilient communities.
          </h2>
        </div>
      </div>

      {/* Pest and Disease Section */}
      <div
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center my-10 rounded-lg mx-auto max-w-7xl"
        style={{ backgroundImage: `url(${PestAndDiseaseImage})` }}
      >
        <div className="relative text-center text-white max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Pest and Disease (Crop Protection)</h2>
          <p className="text-lg mb-8">
            Protecting your plants from pests and diseases is crucial for a successful harvest.
          </p>
          <a
            href="/pest-and-disease"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Learn More →
          </a>
        </div>
      </div>

      {/* Q&A Section */}
      <div
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center my-10 rounded-lg mx-auto max-w-7xl"
        style={{ backgroundImage: `url(${QnAImage})` }}
      >
        <div className="relative text-center text-white max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Q&A (Ask the Experts)</h2>
          <p className="text-lg mb-8">
            Get answers to your farming questions from experienced researchers and agricultural experts.
          </p>
          <a
            href="/qna"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Learn More →
          </a>
        </div>
      </div>
      
      <BlogFooter />
    </div>
  );
}