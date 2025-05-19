import React, { useState, useEffect, useRef } from 'react';

const Slider = () => {
  const imageUrls = [
    '/customer_images/Slide_img_01.jpg',
    '/customer_images/Slide_img_03.jpg',
    '/customer_images/Slide_img_02.jpg',
  ];

  const phrases = [
    'Fresh is our Passion.',
    'Nature’s Goodness on Your Plate.',
    'From Farm to Your Table.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 3000;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);
    return () => resetTimeout();
  }, [currentIndex]);

  return (
    <div className="font-sans">
      {/* Slider Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* matheesha updated,plcing Images */}
        {imageUrls.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Overlay Text */}
        <div className="absolute top-1/4 left-12 md:left-24 text-white z-10 max-w-[700px]">
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
            {phrases[currentIndex]}
          </h1>
          <button className="mt-8 bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition-all duration-300">
            Explore Freshness
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {imageUrls.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? 'bg-green-600' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>

        {/* Slide Number */}
        <div className="absolute bottom-6 left-6 text-white font-bold text-xl z-20">
          0{currentIndex + 1} <span className="text-sm text-gray-300">/0{imageUrls.length}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full bg-green-50 py-8 flex justify-center">
        <div className="flex flex-wrap md:flex-nowrap space-x-6 md:space-x-10 text-center px-4">
          <div>
            <div className="text-3xl mb-2">📦</div>
            <p className="text-lg font-semibold text-green-800">Track Orders</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🥦</div>
            <p className="text-lg font-semibold text-green-800">Vegetables & Fruits</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🌾</div>
            <p className="text-lg font-semibold text-green-800">Grains</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📊</div>
            <p className="text-lg font-semibold text-green-800">Analyse</p>
          </div>
          <div>
            <div className="text-3xl mb-2">ℹ️</div>
            <p className="text-lg font-semibold text-green-800">Info</p>
          </div>
        </div>
      </div>

      {/* Two Side-by-Side Images with Overlaid Text */}
<div className="flex w-full relative">
  {/* First Image with Text */}
  <div className="relative w-1/2 h-[400px]">
    <img
      src="/customer_images/order_hostory.png"
      alt="Shop All"
      className="w-full h-full object-cover"
    />
    <div className="absolute top-1/4 left-6 md:left-12 z-10 text-white">
      <h2 className="text-2xl md:text-4xl font-extrabold drop-shadow-md">
        Shop all your <br />
        Veggies, Fruits & Grains <br />
        in One Place
      </h2>
    </div>
  </div>

  {/* Second Image with Text */}
  <div className="relative w-1/2 h-[400px]">
    <img
      src="/customer_images/productdetails_background.avif"
      alt="Fresh Farms"
      className="w-full h-full object-cover"
    />
    <div className="absolute top-1/4 left-6 md:left-12 z-10 text-white">
      <h2 className="text-2xl md:text-4xl font-extrabold drop-shadow-md">
        Every Product <br />
        Comes from <br />
        Fresh Farms
      </h2>
    </div>
  </div>
</div>

    </div>
  );
};

export default Slider;
