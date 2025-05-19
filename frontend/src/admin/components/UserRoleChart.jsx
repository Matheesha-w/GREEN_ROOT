import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

const UserRoleChart = () => {
    const [data, setData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchUserCounts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/allusers');
                const formattedData = response.data.map(item => ({
                    role: item._id,
                    count: item.count
                }));
                setData(formattedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserCounts();
    }, []);

    const downloadChartImage = () => {
        if (chartRef.current) {
            const svgElement = chartRef.current.querySelector('svg');
            if (svgElement) {
                const svgData = new XMLSerializer().serializeToString(svgElement);
                const canvas = document.createElement('canvas');
                const svgSize = svgElement.getBoundingClientRect();
                canvas.width = svgSize.width;
                canvas.height = svgSize.height;
                const ctx = canvas.getContext('2d');

                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                    const link = document.createElement('a');
                    link.download = 'user-role-chart.png';
                    link.href = canvas.toDataURL('image/png');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
                img.onerror = (error) => {
                    console.error('Error loading SVG as image:', error);
                };
                img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
            } else {
                console.warn('SVG element not found within the chart ref.');
            }
        } else {
            console.warn('Chart ref is not attached.');
        }
    };

    // download excel
    const downloadExcel = () => {
        window.open('http://localhost:3000/api/admin/report/user-data/excel', '_blank');
    };

    return (
        <div className='p-5'>
            <h2 className='text-center text-lg font-bold'>User Distribution by Role</h2>

            <div ref={chartRef} style={{ width: '75%', height: '400px', margin: '0 auto' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="role" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" barSize={90} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className='text-center mt-4'>
                <button
                    onClick={downloadChartImage}
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                >
                    Download Image
                </button>

                <button
                    onClick={downloadExcel}
                    className='bg-blue-500 text-white px-4 py-2 ml-1.5 rounded hover:bg-blue-600'
                >
                    Download Excel
                </button>
            </div>
        </div>
    );
};

export default UserRoleChart;
