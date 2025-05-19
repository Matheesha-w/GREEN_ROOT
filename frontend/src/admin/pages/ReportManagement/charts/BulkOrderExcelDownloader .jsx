import React, { useState } from 'react';

const BulkOrderExcelDownloader = () => {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1);

    const handleDownload = () => {
        const url = `http://localhost:3000/api/admin/report/bulk-orders-filter?year=${year}&month=${month}`;
        window.open(url, '_blank');
    };

    return (
        <div className="mt-2 p-6 pr-10 pl-10 border rounded bg-white shadow max-w-md">
            <h2 className="text-lg font-semibold mb-2">Download Bulk Orders Report</h2>

            <div className="flex gap-2 mb-4">
                <select
                    className="border rounded px-2 py-1"
                    value={month}
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min="2020"
                    className="border rounded px-2 py-1 w-24"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                />
            </div>

            <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleDownload}
            >
                Download Excel
            </button>
        </div>
    );
};

export default BulkOrderExcelDownloader;
