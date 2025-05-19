import React from 'react';
// import { format } from 'timeago.js'; // Optional, for formatting createdAt

const Product = ({ product, updateProduct, deleteProduct, openEditModal }) => {
  const {
    name,
    quantity,
    fertilizer,
    image,
    category,
    supplier,
    price,
    _id,
    createdAt,
    sellerId,
  } = product;

  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col">
      <div className="relative">
        <a href="#">
          <img
            className="w-full h-48 object-cover"
            src={
              image ||
              'https://www.seedway.com/app/uploads/2021/09/Yaya-mat-1-1550x1029.jpg'
            }
            alt="Product"
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </a>
        <a href="#">
          <div className="text-xs absolute top-0 right-0 bg-teal-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-teal-600 transition duration-500 ease-in-out">
            Category: {category}
          </div>
        </a>
      </div>

      <div className="px-6 py-4 mb-auto">
        <a
          href="#"
          className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
        >
          {name}
        </a>
        <p className="text-gray-500 text-sm">Quantity: {quantity}kg</p>
        <p className="text-gray-500 text-sm">Fertilizer Used: {fertilizer}</p>
        <p className="text-gray-500 text-sm">Supplier: {supplier}</p>
        <p className="text-gray-500 text-sm">Price: ${price}</p>
        <p className="text-gray-500 text-sm">Seller ID: {sellerId?._id || 'N/A'}</p>
      </div>

      <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          <svg height="13px" width="13px" viewBox="0 0 512 512">
            <g>
              <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
            </g>
          </svg>
          <span className="ml-1">Added {createdAt}</span>
        </span>

        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400"
            onClick={() => openEditModal(product)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded ml-2 hover:bg-red-400"
            onClick={() => deleteProduct(_id)}
          >
            Delete
          </button>
        </span>
      </div>
    </div>
  );
};

export default Product;
