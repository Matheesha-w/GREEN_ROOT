import axios from 'axios';
import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

import NavBar2 from '@/Common/NavBar2';
import Footer from './home/home_components/Footer';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
        image: "avatar.png",
    });

    // set form background image
    const [formImage, setFormImage] = useState(
        "https://example.com/default-image.png"
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleSelection = (role) => {
        setFormData({ ...formData, role: role });

        // change the form backgdound image
        switch (role) {
            case "farmer":
                setFormImage(`https://w0.peakpx.com/wallpaper/192/253/HD-wallpaper-farming-agriculture-field-farm-farmer-indian.jpg`);
                break;
            case "seller":
                setFormImage(`https://cdn.pixabay.com/photo/2022/02/28/15/36/food-7039506_1280.jpg`);
                break;
            case "customer":
                setFormImage(`https://png.pngtree.com/background/20250207/original/pngtree-a-customer-buying-sustainable-organic-vegetables-from-cart-picture-image_15587120.jpg`);
                break;
            case "researcher":
                setFormImage(`https://b3075642.smushcdn.com/3075642/wp-content/uploads/Canva-Farmer-in-sugar-beet-field-1-scaled.jpg?lossy=1&strip=1&webp=1`);
                break;
            default:
                setFormImage(`https://deliverinperson.com/wp-content/uploads/2024/06/DIP-About-Why-Partner-with-Deliver-In-Person-02.jpg`);
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, address, email, phone, password, confirmPassword, role } = formData;

        // Validation checks
        if (!firstName || !lastName || !address || !email || !phone || !password || !confirmPassword || !role) {
            Swal.fire({
                title: "Please fill out all fields!",
                icon: "warning",
            });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            Swal.fire({
                title: "Invalid email format!",
                icon: "error",
            });
            return;
        }

        if (phone.length !== 10 || isNaN(phone)) {
            Swal.fire({
                title: "Phone number must contain exactly 10 digits!",
                icon: "error",
            });
            return;
        }

        if (password.length <= 6) {
            Swal.fire({
                title: "Password must be longer than 6 characters!",
                icon: "error",
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                title: "Passwords do not match!",
                icon: "error",
            });
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/auth/register`, formData);

            navigate('/auth/login'); // Navigate to the login page
            Swal.fire({
                title: "Registration successful!",
                text: "",
                timer: 1500,
                showConfirmButton: false,
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Error during registration!",
                text: error.response?.data.message || "Please try again later.",
                icon: "error",
            });
            console.log(error);
        }
    };

    return (
        <>
            <>
                <NavBar2 />
            </>
            <section className="bg-white">
                <div className="flex justify-center min-h-screen">
                    {/* Form Image */}
                    <div
                        className="hidden bg-cover lg:block lg:w-3/5"
                        style={{
                            backgroundImage: `url(${formImage})`,
                        }}
                    ></div>

                    {/* Form */}
                    <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
                                Get your free account now.
                            </h1>

                            <p className="mt-4 text-gray-500">
                                Select your role to get started.
                            </p>

                            {/* Role Selection Buttons */}
                            <div className="mt-6">
                                <div className="flex flex-wrap gap-4">
                                    {["farmer", "seller", "customer", "researcher", "deliveryPerson"].map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => handleRoleSelection(role)}
                                            className={`px-4 py-2 rounded-lg ${formData.role === role
                                                ? "bg-blue-700 text-white"
                                                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                                }`}
                                        >
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Form Fields */}
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="First Name"
                                        required
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Last Name"
                                        required
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Address"
                                        required
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        required
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        required
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm Password"
                                        required
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number"
                                        required
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="col-span-2 flex items-center justify-center w-full px-6 py-3 mt-4 text-sm tracking-wide text-white bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg"
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <>
                <Footer />
            </>
        </>
    )
}

export default Register