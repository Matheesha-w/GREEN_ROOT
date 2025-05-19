import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

const SalesChart = () => {

    const [data, setData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/admin/report/sales/over-time')
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // download as an image file
    const downloadImage = () => {
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
                    link.download = 'sales_chart.png';
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

    const downloadExcel = () => {
        window.open('http://localhost:3000/api/admin/report/sales/over-time/excel', '_blank');
    };

    return (
        <>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Total Sales Over Time</h2>
                <div ref={chartRef} className="bg-white p-4 rounded shadow-md">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="finalTotal" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className='flex justify-center'>
                    <button
                        onClick={downloadImage}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Download Image
                    </button>

                    <button
                        onClick={downloadExcel}
                        className="mt-4 px-4 ml-1.5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Download Excel
                    </button>
                </div>

            </div>
        </>
    )
}

export default SalesChart