import React from 'react';
import Sidebar from '../../components/Sidebar';
import BackButton from '../../components/BackButton';
import UserRoleChart from '@/admin/components/UserRoleChart';
import QuestionTitleChart from '../qaManagement/QuestionTitleChart';
import SalesChart from './charts/SalesChart';
import BulkOrderChart from './charts/BulkOrderChart';
import BulkOrderExcelDownloader from './charts/BulkOrderExcelDownloader ';

const ReportManageDash = () => {
    return (
        <>
            <div className='flex h-screen'>
                {/* SideBar */}
                <Sidebar />

                <div className="flex-1 p-6 ml-20">
                    <div className="mb-4">
                        <BackButton />
                    </div>

                    {/* Content */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Report Management</h2>

                        {/* User report */}
                        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">User Role Distribution</h2>
                            <UserRoleChart />
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">User Questions</h2>
                            <QuestionTitleChart />
                        </div>

                        {/* Sales Cart */}
                        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">Sales Chart</h2>
                            <SalesChart />
                        </div>

                        {/* Bulk Order Chart */}
                        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">Bulk Order</h2>
                            <BulkOrderChart />

                            <div className='flex justify-center'>
                                <BulkOrderExcelDownloader />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ReportManageDash