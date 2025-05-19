import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ custId }) => {
  const categoryImages = [
    '/customer_images/fruits.jpg',
    '/customer_images/vegetables.webp',
    '/customer_images/grains.jpg',
  ];

  const categoryNames = ['Fruits', 'Vegetables', 'Grains'];

  return (
    <div className="mt-5 bg-green-200 py-10 px-4 rounded-xl shadow-inner">
      <h2 className="text-green-900 font-bold text-4xl mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center">
        {categoryImages.map((imageUrl, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <Link
              to={`/Customer/products-category/${categoryNames[index]}/${custId}`}
              className="w-72 h-72 bg-green-100 border-4 border-green-200 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-green-50 hover:border-green-600 hover:scale-105 shadow-lg"
            >
              <img
                src={imageUrl}
                alt={`category ${index + 1}`}
                className="w-4/5 h-4/5 object-cover rounded-full border-4 border-white"
              />
            </Link>
            <h2 className="text-green-800 font-semibold text-3xl text-center group-hover:text-green-700">
              {categoryNames[index]}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
