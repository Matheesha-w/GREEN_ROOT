import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import Table from '../components/Table';

const DeliveryPersonManagement = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/user/deliveryPerson')
            .then((res) => {
                setUser(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="mb-4">
                    <BackButton />
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Delivery Person Management</h2>
                    <Link
                        to={`/admin/user-management/user/create`}
                        className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        + Create New Account
                    </Link>
                </div>

                <div>
                    <Table user={user} />
                </div>
            </div>
        </>
    )
}

export default DeliveryPersonManagement