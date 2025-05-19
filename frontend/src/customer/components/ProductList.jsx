import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { toast } from "react-toastify";
import { Search, X } from "lucide-react";

const ProductList = ({ custId }) => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/customer/products");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // POST search and update filtered products
  const handleSearch = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/customer/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search_name: searchName }),
      });

      if (!res.ok) throw new Error('Failed to add search');

      const matched = products.filter((product) =>
        product.name.toLowerCase().includes(searchName.trim().toLowerCase())
      );

      setSearchResults(matched);
      // toast.success('Search recorded and results updated!');
    } catch (err) {
      console.error(err);
      toast.error('Search failed');
    }
  };

  // DELETE all saved searches
  const handleClearSearches = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/customer/search', {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete searches');

      // toast.success('All searches cleared!');
      setSearchName('');
      setSearchResults([]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to clear searches');
    }
  };

  return (
    <div>
      {/* Product Section */}
      <div className="mt-10 bg-gray-300 py-10 px-4 rounded-xl shadow-lg">
        <h2 className="text-green-800 font-bold text-3xl text-center mb-6">Our Popular Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {products.slice(0, 32).map((product) => (
            <ProductItem
              custId={custId}
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>

      {/* Search Section */}
      <div className="mt-10 bg-gray-300 py-10 px-4 rounded-xl shadow-lg">
         <div className="relative w-full mt-4">
    {/* Input Field */}
    <input
      type="text"
      placeholder="Search for products..."
      value={searchName}
      onChange={(e) => setSearchName(e.target.value)}
      className="pl-10 pr-10 py-2 w-full border border-gray-400 rounded-md focus:outline-none"
    />

    {/* Search Icon - Left */}
    <Search
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
      onClick={handleSearch}
      title="Search"
    />

    {/* Clear Icon - Right */}
    {searchName && (
      <X
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 cursor-pointer"
        onClick={handleClearSearches}
        title="Clear"
      />
    )}
  </div>

        <h3 className="mt-4 text-xl font-semibold text-green-800">Search Results</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-4">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <ProductItem
                custId={custId}
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <p className="text-gray-600 col-span-full">No matching products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
