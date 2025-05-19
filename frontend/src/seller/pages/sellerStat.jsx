import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/admin/pages/home/home_components/NavBar";
import SideBar from "../components/sideBar(seller)";
import SalesBarChart from "../components/salesChart";
import PieChartComponent from "../components/productsChart";
import NavBar2 from "@/Common/NavBar2";
import { useParams } from "react-router-dom";

const SellerStat = () => {
    const { sid } = useParams();
    const [counts, setCounts] = useState({ bulkOrders: 0, normalOrders: 0, totalProducts: 0 });
    //const sellerId = "67d8e72067646fe0d3f87794"; // Replace with dynamic seller ID if needed

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [bulkRes, normalRes, productRes] = await Promise.all([
                    axios.get(`http://localhost:3000/api/RetailSeller/stats/bulk-order-count/${sid}`),
                    axios.get(`http://localhost:3000/api/RetailSeller/stats/normal-order-count/${sid}`),
                    axios.get(`http://localhost:3000/api/RetailSeller/stats/product-count/${sid}`)
                ]);
                
                setCounts({
                    bulkOrders: bulkRes.data.count,
                    normalOrders: normalRes.data.count,
                    totalProducts: productRes.data.count
                });
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };
        
        fetchCounts();
    }, [sid]);

    return (
        <div className="min-h-screen grid grid-cols-12">
            {/* Navbar */}
            <nav className=" p-4 text-center font-semibold w-full col-span-12">
                <NavBar2 />
            </nav>
            
            {/* Sidebar */}
            <SideBar sellerid={sid} />
            
            {/* Main Content */}
            <main className="col-span-10 p-6">
                <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[    
                        { label: "Bulk orders", count: counts.bulkOrders, color: "text-blue-500" },
                        { label: "Normal orders", count: counts.normalOrders, color: "text-amber-500" },
                        { label: "Total products", count: counts.totalProducts, color: "text-red-500" }
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col px-6 py-4 bg-white shadow rounded-lg text-center">
                            <div className={`text-6xl font-bold ${item.color}`}>{item.count}</div>
                            <div className={`text-lg font-medium ${item.color}`}>{item.label}</div>
                        </div>
                    ))}
                </div>

                {/* Bar Charts Row */}
                <div className="flex flex-col md:flex-row gap-6 mt-6">
                    <div className="flex-1 bg-white p-4 shadow rounded-lg">
                        <SalesBarChart />
                    </div>
                    <div className="flex-1 bg-white p-4 shadow rounded-lg">
                        <PieChartComponent />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SellerStat;
