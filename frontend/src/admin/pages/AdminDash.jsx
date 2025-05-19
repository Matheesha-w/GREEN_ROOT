import React from 'react';
import useAuth from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
// import NavBar from './home/home_components/NavBar';
import NavBar2 from '@/Common/NavBar2';
import UserRoleChart from '../components/UserRoleChart';
// import Footer from './home/home_components/Footer';
import QuestionTitleChart from './qaManagement/QuestionTitleChart';


const AdminDash = () => {
    useAuth("admin");

    return (
        <div className="flex bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content + To-Do List */}
            <div className="flex flex-grow ml-64">
                <div className="flex-grow p-8">
                    {/* <NavBar /> */}
                    <NavBar2 />
                    <h1 className="text-3xl font-semibold text-gray-700">Admin Dashboard</h1>

                    {/* User Role Chart */}
                    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">User Role Distribution</h2>
                        <UserRoleChart />
                    </div>

                    {/* User Management Button */}
                    <div className="mt-6">
                        <Link
                            to={`/admin/user-management`}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg"
                        >
                            Manage Users
                        </Link>
                    </div>

                    {/* Question Title Chart */}
                    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">Questions Categorized by Title</h2>
                        <QuestionTitleChart />
                    </div>

                    {/* New Question management section */}
                    <div className="mt-8 mb-10">
                        <Link
                            to={`/admin/question-dash`}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg"
                        >
                            Manage Questions
                        </Link>
                    </div>

                    {/* Report management Section */}
                    <div className="mt-8 mb-10">
                        <Link
                            to={`/admin/report-dash`}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg"
                        >
                            Manage Reports
                        </Link>
                    </div>

                </div>

                {/* To-Do List Section */}
                {/* <div className="w-72 bg-white shadow-md p-6 border-l border-gray-300">
                    <h2 className="text-xl font-semibold mb-3">To-Do List</h2>

                </div> */}
            </div>
        </div>
    )
}

export default AdminDash
