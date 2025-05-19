import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {

  const { cid } = useParams();
  console.log(cid)


  const images = [
    '/customer_images/melon.jpg',
    '/customer_images/product_details.webp',
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
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);
    return () => resetTimeout();
  }, [currentIndex]);

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/customer/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setProducts(json.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-green-700 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-xl">Error: {error.message}</div>;
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/customer_images/productdetails_05.jpg')` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Sidebar */}
      <div className="w-60 h-screen fixed z-20">
        <Sidebar className="w-60 h-screen" custId={cid}/>
      </div>

      {/* here I am using product details ,with image slider.Main content. */}
      <div className="ml-60 p-6 md:p-10 w-full overflow-auto h-screen relative z-20">
        <div className="bg-gray-600 rounded-2xl p-10 shadow-xl mx-4 mt-0 mb-5">
          <div className="flex items-center justify-center gap-4">
            <img
              src="/customer_images/Our_logo.png"
              alt="Logo"
              width={90}
              height={90}
              className="rounded-full"
            />
            <h2 className="text-5xl font-bold text-white order-heading">Product Details</h2>
            <img
              src="/customer_images/Our_logo.png"
              alt="Logo"
              width={90}
              height={90}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Image Slider */}
        <div className="relative w-full h-[600px] overflow-hidden mb-8">
          {images.map((src, index) => (
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
            {images.map((_, idx) => (
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
            0{currentIndex + 1} <span className="text-sm text-gray-300">/0{images.length}</span>
          </div>
        </div>

        {/*in here i am displaying Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-28 h-28 object-cover rounded-lg shadow-md"
                />
                <h2 className="text-2xl font-bold text-green-800 mt-4">{product.name}</h2>
                <p className="text-sm font-bold text-green-600 text-center mt-2">
                  These delicious, organic <span className="font-semibold">{product.category}</span> are cultivated with care at {product.supplier}, known for their commitment to sustainable and natural farming practices.
                </p>
                <p className="text-sm font-bold text-green-600 mt-2"><strong>Fertilizer:</strong> {product.fertilizer}</p>
                <p className="text-sm font-bold text-green-600 mt-1"><strong>Supplier:</strong> {product.supplier}</p>

                <button
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg "
                  
                >
                  Verified
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
