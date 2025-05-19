import React from "react";

const Crop = ({ crop, onAddToCart, cart }) => {
    const farmer = crop.farmerID;

    // Handle adding crop to the cart
    const handleAddToCart = () => {
        if (!cart || !cart.items) {
            console.warn("Cart data is still loading...");
            alert("Cart data is still loading. Please wait and try again.");
            return;
        }

        // Check if the cart contains crops from a different farmer
        if (cart.items.length > 0 && cart.items[0].cropId.farmerID !== farmer) {
            alert("You can only add crops from the same farmer to the cart.");
            return;
        }

        // Call the add-to-cart function
        onAddToCart(crop._id);
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <img
                className="h-48 w-full object-cover object-end"
                src={crop.image}
                alt={crop.name}
            />
            <div className="p-6">
                <h4 className="font-semibold text-lg leading-tight truncate">{crop.name}</h4>
                <div className="mt-1 text-gray-700">${crop.price || "N/A"}</div>
                <div className="mt-2 flex items-center text-teal-600">
                    ⭐⭐⭐⭐
                    <span className="ml-2 text-gray-600 text-sm">34 reviews</span>
                </div>
                <div className="mt-2 text-gray-600">
                    <p><strong>Quantity:</strong> {crop.quantity}</p>
                    <p><strong>Fertilizer:</strong> {crop.fertilizer || "Not specified"}</p>
                </div>
                <div className="flex space-x-2 mt-8 mb-4">
                    <button
                        className={`px-4 py-1 rounded flex items-center space-x-2 ${
                            cart ? "bg-teal-700 text-white" : "bg-gray-400 text-gray-800 cursor-not-allowed"
                        }`}
                        onClick={handleAddToCart}
                        disabled={!cart}
                    >
                        <span>+ add to cart</span>
                    </button>
                    <button className="bg-green-600 text-white px-4 py-1 rounded">
                        ⋯ more <i className="fa-solid fa-ellipsis"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Crop;
