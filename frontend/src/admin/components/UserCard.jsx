import React, { useEffect } from 'react';
import backImg from "../extras/user_view_background.jpg";
import { Link } from 'react-router-dom';
import BackButton from './BackButton';

const UserCard = ({ user }) => {
    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return (
        <>
            <div key={user._id} className="bg-gradient-to-r from-green-200 to-green-500 min-h-screen p-4"
                style={{ backgroundImage: `url(${backImg})` }}
            >

                <div className='m-2 flex justify-start'>
                    <BackButton /> {/* Add Back Button Here */}
                </div>
                <div className='flex justify-center items-center min-w-full min-h-dvh'>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
                        <div className="flex flex-col md:flex-row">
                            {/* Left Section */}
                            <div className="md:w-1/3 text-center mb-8 md:mb-0">
                                <img
                                    src={`/profile/${user.image}`}
                                    alt="Profile Picture"
                                    className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-green-300 dark:border-green-700 transition-transform duration-300 hover:scale-105"
                                />
                                <h1 className="text-2xl font-bold text-green-700 dark:text-white mb-2">
                                    {user.name}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">{user.firstName} {user.lastName}</p>
                                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
                                    <Link to={`/admin/user-management/user/edit/${user._id}`}>Edit Profile</Link>
                                </button>
                            </div>

                            {/* Right Section */}
                            <div className="md:w-2/3 md:pl-8">
                                <h2 className="text-xl font-semibold text-green-700 dark:text-white mb-4">
                                    About Me
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-6">
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">First Name:</span> {user.firstName}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Last Name:</span> {user.lastName}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Status:</span> {user.status}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Role:</span> {user.role}</p>
                                </p>
                                <h2 className="text-xl font-semibold text-green-700 dark:text-white mb-4">
                                    Contact Information
                                </h2>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>{user.email}</li>
                                    <li>{user.phone}</li>
                                    <li>{user.address}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCard;
