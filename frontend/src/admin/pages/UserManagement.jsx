import React from 'react'
import Card from '../components/Card';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';

const UserManagement = () => {
    return (
        <>
            <div className="flex h-screen">
                {/* sidebar */}
                <Sidebar />


                <div className="flex-1 p-6 ml-20">
                    <div className="mb-4">
                        <BackButton />
                    </div>

                    {/* content */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
                        <Card />
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserManagement