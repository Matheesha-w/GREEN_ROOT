import React, { useState, useEffect } from 'react';
import Product from "../components/productCard";
import SideBar from "../components/sideBar(seller)";
import axios from 'axios';
import NavBar from '@/admin/pages/home/home_components/NavBar';
import NavBar2 from '@/Common/NavBar2';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const SellerInventroy = () => {
  const { sid } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    fertilizer: '',
    image: '',
    category: '',
    supplier: '',
    sellerId: sid,
    price: '',
  });

  const defaultFormData = {
    _id: "",
    name: "",
    quantity: "",
    fertilizer: "",
    image: "",
    category: "",
    supplier: "",
    price: ""
  };

  const [formeData, setFormeData] = useState(defaultFormData);
  const [cid, setCategory] = useState("All");

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/RetailSeller/products/products/${sid}`);
        console.log(response)
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [cid,sid]);

  // Function to create a new product
  const createProduct = async () => {
    try {
      console.log(formData)
      const response = await axios.post('http://localhost:3000/api/RetailSeller/products/product', formData);
      console.log('Product created successfully:', response.data);
      setProducts((prevProducts) => [...prevProducts, response.data.product]);
      setIsModalOpen(false); // Close the modal after creating product
    } catch (error) {
      console.error('Error creating product:', error.response ? error.response.data : error.message);
    }
  };

  // Open edit modal and load product data
  const openEditModal = (eproduct) => {
    setIsEditModalOpen(true);
    setFormeData({ ...eproduct }); // Update state with the selected product's data
  };

  // Function to update a product by ID
  const updateProduct = async (productId, productData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/RetailSeller/products/product/${productId}`, productData);
      console.log('Product updated successfully:', response.data);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === productId ? response.data.product : product))
      );
      setIsEditModalOpen(false); // Close the modal after updating product
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
    }
  };

  // Function to delete a product by ID
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/RetailSeller/products/product/${productId}`);
      console.log('Product deleted successfully:', response.data);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      toast.error("Product deleted")
      
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submit for adding new product
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(); // Submit the form to create a new product
    toast.success("Product added")
  };

  // Handle form submit for updating product
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    updateProduct(formeData._id, formeData); // Submit the updated product data
     toast.success("product updated successfully")
  };

  return (
    <>
    <div className="bg-gray-100">
      <nav className="p-4"><NavBar2 /></nav>
      <ToastContainer position="top-center" />

      <div className="grid grid-cols-12 min-h-screen">
        {/* Sidebar */}
        <SideBar sellerid={sid} />

        {/* Main Content */}
        <div className="col-span-10 flex flex-col p-6">
          <h1 className="text-xl font-semibold mb-4">My products</h1>

          {/* Category Links */}
         {/* Category Links */}
            <div className="flex justify-end items-center gap-6 mb-10 mr-10">
            <a onClick={() => setCategory("All")}  href="#" className="text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:shadow-lg transition-all duration-300 px-6 py-3 rounded-full text-lg font-semibold transform hover:scale-105">
               All
              </a>
              <a onClick={() => setCategory("Fruits")} href="#" className="text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:shadow-lg transition-all duration-300 px-6 py-3 rounded-full text-lg font-semibold transform hover:scale-105">
               Fruits
              </a>
              <a onClick={() => setCategory("Vegetables")} href="#" className="text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:shadow-lg transition-all duration-300 px-6 py-3 rounded-full text-lg font-semibold transform hover:scale-105">
                Vegetables
              </a>
              <a onClick={() => setCategory("Grains")} href="#" className="text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:shadow-lg transition-all duration-300 px-6 py-3 rounded-full text-lg font-semibold transform hover:scale-105">
                Grains
              </a>
              
            </div>



          {/* Add Button */}
          <div className="flex justify-start items-center gap-12 mb-10 mr-10">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold text-xl py-4 px-8 border border-green-700 rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              +ADD
            </button>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products && products.map((product) => (
              <Product
                key={product._id}
                product={product}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
                openEditModal={openEditModal}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-30">
          <div className="w-[600px] bg-white shadow-lg rounded-lg overflow-hidden my-10">
            <div className="text-2xl py-4 px-6 bg-green-700 text-white text-center font-bold uppercase">
              Add a Product
            </div>
            <form className="py-4 px-6" onSubmit={handleSubmit}>
              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Product Name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Quantity</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  required
                />
              </div>

              {/* Fertilizer Used */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Fertilizer Used</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  type="text"
                  name="fertilizer"
                  value={formData.fertilizer}
                  onChange={handleChange}
                  placeholder="Enter fertilizer name"
                />
              </div>

              {/* Image URL */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Image URL</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter product image URL"
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Category</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter product category"
                  required
                />
              </div>

              {/* Supplier Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Supplier Name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  placeholder="Enter supplier name"
                  required
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Price</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400" type="submit">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
{isEditModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-30">
    <div className="w-[600px] bg-white shadow-lg rounded-lg overflow-hidden my-10">
      <div className="text-2xl py-4 px-6 bg-green-700 text-white text-center font-bold uppercase">
        Update a Product
      </div>
      <form className="py-4 px-6" onSubmit={handleSubmitEdit}>
        {/* Edit Product Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3"
            type="text"
            name="name"
            value={formeData.name}
            onChange={(e) => setFormeData({ ...formeData, name: e.target.value })}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Quantity</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3"
            type="number"
            name="quantity"
            value={formeData.quantity}
            onChange={(e) => setFormeData({ ...formeData, quantity: e.target.value })}
            placeholder="Enter quantity"
            required
          />
        </div>

        {/* Fertilizer Used */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Fertilizer Used</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3"
            type="text"
            name="fertilizer"
            value={formeData.fertilizer}
            onChange={(e) => setFormeData({ ...formeData, fertilizer: e.target.value })}
            placeholder="Enter fertilizer name"
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Image URL</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3"
            type="url"
            name="image"
            value={formeData.image}
            onChange={(e) => setFormeData({ ...formeData, image: e.target.value })}
            placeholder="Enter product image URL"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3"
            type="text"
            name="category"
            value={formeData.category}
            onChange={(e) => setFormeData({ ...formeData, category: e.target.value })}
            placeholder="Enter product category"
            required
          />
        </div>

        {/* Supplier Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Supplier Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3"
            type="text"
            name="supplier"
            value={formeData.supplier}
            onChange={(e) => setFormeData({ ...formeData, supplier: e.target.value })}
            placeholder="Enter supplier name"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3"
            type="number"
            name="price"
            value={formeData.price}
            onChange={(e) => setFormeData({ ...formeData, price: e.target.value })}
            placeholder="Enter price"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            type="button"
            onClick={() => setIsEditModalOpen(false)}
          >
            Cancel
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400" type="submit">
            Update Product
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
    </>
  );
};

export default SellerInventroy;
