import React from "react";
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    MessageSquare,
    Calendar,
    List,
    Layers,
    Users,
} from "lucide-react";

function Sidebar({custId}) {



    return (
        <div className="bg-gradient-to-b from-green-800 to-green-900 h-screen md:block shadow-xl px-3 md:w-60 lg:w-60 overflow-y-auto">
            <div className="space-y-6 md:space-y-10 mt-10">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full overflow-hidden w-20 h-20 border-2 border-green-600">
                        <img
                            src="/customer_images/customer.jpg"
                            alt="User Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div id="profile" className="space-y-3">
                    <div>
                        <h2 className="font-semibold text-lg text-center text-white">
                            Green Roots
                        </h2>
                        <p className="text-sm text-gray-300 text-center">Customer</p>
                    </div>
                </div>
                <div id="menu" className="flex flex-col space-y-2">
                    <Link
                        to={`/Customer/Dashboard/${custId}`}
                        className="text-sm font-medium text-white py-2 px-3 rounded-md transition duration-200 ease-in-out flex items-center hover:bg-green-700"
                    >
                        <LayoutDashboard className="w-4 h-4 mr-2 text-green-300" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to={`/Customer/ProductDetailsPage/${custId}`}
                        className="text-sm font-medium text-white py-2 px-3 rounded-md transition duration-200 ease-in-out flex items-center hover:bg-green-700"
                    >
                        <Package className="w-4 h-4 mr-2 text-green-300" />
                        <span>Product Details</span>
                    </Link>
                    <Link
                        to={`/Customer/Orderhistory/${custId}`}
                        className="text-sm font-medium text-white py-2 px-3 rounded-md transition duration-200 ease-in-out flex items-center hover:bg-green-700"
                    >
                        <ShoppingCart className="w-4 h-4 mr-2 text-green-300" />
                        <span>Order history</span>
                    </Link>
                    <Link
                        to={`/Customer/ChartPage/${custId}`}
                        className="text-sm font-medium text-white py-2 px-3 rounded-md transition duration-200 ease-in-out flex items-center hover:bg-green-700"
                    >
                        <MessageSquare className="w-4 h-4 mr-2 text-green-300" />
                        <span>Chart</span>
                    </Link>
                    
                    <Link
                        to={`/Customer/FeedbackPage/${custId}`}
                        className="text-sm font-medium text-white py-2 px-3 rounded-md transition duration-200 ease-in-out flex items-center hover:bg-green-700"
                    >
                        <List className="w-4 h-4 mr-2 text-green-300" />
                        <span>Feedback</span>
                    </Link>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default Sidebar;