import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBasket } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ProductItemDetail = ({ product }) => {
  if (!product) {
    return <div>Product not available.</div>;
  }

  const [productPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [typeCustomer, setTypeCustomer] = useState(null);
  const [loadingType, setLoadingType] = useState(true);
  const [errorType, setErrorType] = useState(null);

  // matheesha UPDAted,Recompute total price whenever quantity changes
  useEffect(() => {
    let calculatedTotal = quantity * productPrice;

    if (typeCustomer && typeCustomer.length > 0 && typeCustomer[0].cus_type === 'Bronze') {
      calculatedTotal = calculatedTotal - calculatedTotal * 0.10; // apply 10% discount
    }

    setTotalPrice(calculatedTotal.toFixed(2));
  }, [quantity, productPrice, typeCustomer]);

  // Fetch customer type
  useEffect(() => {
    const fetchTypeCustomer = async () => {
      setLoadingType(true);
      setErrorType(null);
      try {
        const res = await fetch('http://localhost:3000/api/customer/typeCustomer');
        if (!res.ok) throw new Error('Failed to fetch customer type');
        const data = await res.json();
        setTypeCustomer(data);
      } catch (err) {
        setErrorType(err.message);
      } finally {
        setLoadingType(false);
      }
    };
    fetchTypeCustomer();
  }, []);

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return;
    setQuantity(newQty);
  };

  const handleAddToCart = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/customer/addtocart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: productPrice,
          name: product.name,
          image: product.image,
          quantity,
          totalPrice,
          sellerId: product.sellerId._id,
        }),
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      
      // Show success toast message
      toast.success('Item was added to the cart!');
    } catch (err) {
      console.error(err);
      // Show error toast message
      toast.error('Error adding to cart');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <img
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <h2 className="text-sm text-green-700">* Seller : {product.supplier}</h2>
        <h2 className="text-green-700">* Seller ID: {product.sellerId ? product.sellerId._id : 'N/A'}</h2>
        <h2 className="font-bold text-2xl">* Rs.{product.price} per item</h2>
        <h2 className="font-medium text-lg">Quantity ({quantity})</h2>

        <h2 className="font-bold text-3xl text-blue-800">Total :</h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-10 items-center px-5">
  <button
    disabled={quantity === 1}
    onClick={() => handleQuantityChange(quantity - 1)}
    className="w-8 h-8 bg-green-600 text-white font-bold border border-green-600 rounded-full flex items-center justify-center disabled:bg-green-300 disabled:cursor-not-allowed"
  >
    -
  </button>
  <h2>{quantity}</h2>
  <button
    onClick={() => handleQuantityChange(quantity + 1)}
    className="w-8 h-8 bg-green-600 text-white font-bold border border-green-600 rounded-full flex items-center justify-center"
  >
    +
  </button>
</div>

            <h2 className="text-2xl font-bold text-blue-800">= Rs.{totalPrice}</h2>
          </div>

          <Button className="flex gap-3 w-37 bg-green-500" onClick={handleAddToCart}>
            <ShoppingBasket />
            Add To Cart
          </Button>
        </div>

        <h2>
          <span className="font-bold">Category:</span> {product.category}
        </h2>

        {loadingType ? (
          <p className="text-sm text-gray-500">Loading customer type…</p>
        ) : errorType ? (
          <p className="text-sm text-red-500">Error: {errorType}</p>
        ) : typeCustomer && typeCustomer.length > 0 ? (
          <>
            <h2>
              <span className="font-bold">Customer Type:</span> {typeCustomer[0].cus_type || '—'}
            </h2>
            {typeCustomer[0].cus_type === 'Bronze' && (
              <p className="text-2xl text-green-700 font-semibold">
                You're a Bronze customer – 10% discount applied
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">Ordinary Level</p>
        )}
      </div>

      {/* Toast container to render the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default ProductItemDetail;
