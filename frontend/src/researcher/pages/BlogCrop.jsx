import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CropCategories = () => {
  const [categories, setCategories] = useState([

    { name: 'Vegetables', query: 'vegetables' },
    { name: 'Fruits', query: 'fruits' },
    { name: 'Grains', query: 'grains' },
    { name: 'Herbs', query: 'herbs' },
    { name: 'Flowers', query: 'flowers' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('vegetables');
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://openfarm.cc/api/v1/crops/?filter=${selectedCategory}`
        );
        const data = await response.json();
        setCrops(data.data);
      } catch (error) {
        console.error('Error fetching crops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [selectedCategory]);

  return (
    <div className='w-7xl'>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 ">Crop Categories</h1>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.query}
            onClick={() => setSelectedCategory(category.query)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.query
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {crops.map((crop) => (
            <Link
              to={`/blog/crop/${crop.id}`}
              key={crop.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 "
            >
              <div className="h-48 bg-white flex items-center justify-center">
                {crop.attributes.main_image_path ? (
                  <img
                    src={crop.attributes.main_image_path }
                    alt={crop.attributes.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No image available</span>
                )}
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {crop.attributes.name}
                </h3>
                
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropCategories;