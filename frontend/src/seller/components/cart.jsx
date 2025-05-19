import React from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your public key (replace with your actual key)
const stripePromise = loadStripe('pk_test_51R5p89RvsikKtmloiLC3Fvftp1daEyZtpOuFqXbCxbVCmIeI7V9fYRBnxK8zOi2y6xypm5KLsOlX7CAqLQNGlY3S00nJl1yKKt'); // Replace with your Stripe public key

const Cart = ({ cart, onClose, onRemoveItem }) => {
  const cartItems = cart ? cart.items : [];
  const tot = cart.totalPrice; // The total price of the cart
  const cartID = cart._id
  const sellerId = cart.sellerId

  console.log("meta",cartID,sellerId)


  const handleRemove = (itemId) => {
    onRemoveItem(itemId);
  };
  //cartId, userId 

  const handleCheckout = async () => {
    try {
      console.log("Checkout Started: ", cartItems, tot); // Debugging log
      // Send cart items to backend to create Stripe Checkout session
      const response = await axios.post('http://localhost:3000/api/RetailSeller/payment/stripe', {
        cartItems: cartItems,
        totalAmount: tot, // Use 'tot' here instead of 'totalAmount'
        cartId:cartID,
        userId:sellerId,
      });

      const { sessionId } = response.data;

      // Ensure Stripe is loaded before redirecting
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error redirecting to Stripe Checkout:", error);
        alert("There was an error with your payment. Please try again.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Something went wrong while processing your payment.");
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-screen max-w-md bg-white shadow-xl transform transition-transform ease-in-out duration-500 sm:duration-700">
      <div className="flex flex-col h-full">
        {/* Cart Header */}
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={onClose} className="text-teal-700 hover:text-gray-500">
            <span className="sr-only">Close panel</span> <span className="text-xl">𐤕</span>
          </button>
        </div>

        {/* Cart Items (Scrollable) */}
        <div className="flex-grow overflow-y-auto mt-4 px-4">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <li key={index} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.cropId.image}
                      alt={item.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.color || "N/A"}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity || 1}</p>
                      <button
                        type="button"
                        className="font-medium text-teal-600 hover:text-indigo-500"
                        onClick={() => handleRemove(item.cropId._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty</p>
            )}
          </ul>
        </div>

        {/* Subtotal & Checkout (Fixed at the bottom) */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${tot.toFixed(2)}</p>
            </div>
            <div className="mt-6">
              <button
                className="flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-white font-medium shadow-xs hover:bg-green-700 w-full"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <button
                  id="continue-shopping"
                  onClick={onClose}
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Continue Shopping &rarr;
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
