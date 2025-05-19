import React from 'react'
import { Link } from 'react-router-dom';

const Table = ({ user }) => {
    return (
        <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Phone</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {user.map((user, index) => (
                            <tr key={user._id} className="even:bg-gray-100 odd:bg-white hover:bg-gray-200 transition">
                                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                                    <img className="h-10 w-10 rounded-full border" src={`/profile/${user.image}`} alt={user.firstName} />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{user.firstName}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{user.phone}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{user.role}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <div className="flex gap-2">
                                        <Link to={`/admin/user-management/user/view/${user._id}`}
                                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-md hover:shadow-lg transition">
                                            👁 View
                                        </Link>
                                        <Link to={`/admin/user-management/user/edit/${user._id}`}
                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md hover:shadow-lg transition">
                                            ✏️ Edit
                                        </Link>
                                        <Link to={`/admin/user-management/user/delete/${user._id}`}
                                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md hover:shadow-lg transition">
                                            🗑 Delete
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table