import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import html2canvas from 'html2canvas';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'];

const QuestionTitleChart = () => {
    const [data, setData] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/qna/questions/all');
                const questions = response.data;

                const categoryCounts = questions.reduce((acc, question) => {
                    acc[question.title] = (acc[question.title] || 0) + 1;
                    return acc;
                }, {});

                const formattedData = Object.keys(categoryCounts).map(title => ({
                    title,
                    count: categoryCounts[title]
                }));

                setData(formattedData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchQuestions();
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
                    link.download = 'question-pie-chart.png';
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
        window.open('http://localhost:3000/api/admin/report/questions/excel', '_blank');
    };

    return (
        <div className='p-5'>
            <>
                <h2 className='text-center text-lg font-bold'>Questions Categorized by Title</h2>
                <div ref={chartRef} style={{ width: '75%', height: '400px', margin: '0 auto' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="count"
                                nameKey="title"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </>
            <div className='text-center mt-4'>
                <button
                    onClick={downloadChartImage}
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                >
                    Download Image
                </button>

                <button
                    onClick={downloadExcel}
                    className='bg-blue-500 text-white ml-1.5 px-4 py-2 rounded hover:bg-blue-600'
                >
                    Download Excel
                </button>
            </div>

        </div>
    );
};

export default QuestionTitleChart;