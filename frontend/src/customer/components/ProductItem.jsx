import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ProductItemDetail from '../components/ProductItemDetail';

const ProductItem = ({ product, custId }) => {
  return (
    <div
      className="p-4 md:p-8 flex flex-col items-center justify-center gap-4 bg-white border border-gray-400 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all ease-in-out cursor-pointer"
    >
      {/* Image with hover effect */}
      <img
        src={product.image}
        alt="product"
        width={500}
        height={200}
        className="h-[200px] w-[200px] object-contain mb-4 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-110 "
      />
      
      <h2 className="font-semibold text-xl text-green-800">{product.name}</h2>
      <h2 className="font-semibold text-lg text-green-600">Rs.{product.price}</h2> {/* Price */}

      {/* Dialog and Add to Cart Button */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="mt-4 py-2 px-6 bg-green-600 text-white font-semibold text-lg rounded-md border-2 border-green-600 transition-all duration-300 ease-in-out hover:bg-red-500 hover:border-red-500 hover:scale-105 hover:shadow-lg"
          >
            Add to Cart
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-800 font-bold">Product Details</DialogTitle>
            <DialogDescription>
              <ProductItemDetail custId={custId} product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
