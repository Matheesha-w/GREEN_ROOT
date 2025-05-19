import NavBar2 from "@/Common/NavBar2";
import { ToastContainer } from "react-toastify";
import SideBar from "../components/sideBar(seller)";
import { useParams } from "react-router-dom";
import NewsCardSeller from "../components/newsCard";
import { useEffect, useState } from "react";
import axios from "axios";

const AgroDetails = () => {
  const { sid } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=agriculture&language=en&sortBy=popularity&pageSize=10&apiKey=f80bdd65fe2c4a279b116d051f74e10d')
        setArticles(response.data.articles); // <- fixed here (must be .articles, not whole response.data)
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />

      {/* Navbar */}
      <nav className="p-4">
        <NavBar2 />
      </nav>

      <div className="grid grid-cols-12 min-h-screen">
        {/* Sidebar */}
        <SideBar sellerid={sid} />

        {/* Main Content */}
        <div className="col-span-10 flex flex-col p-6">
          <h1 className="text-lg font-semibold mb-4">Top Crop productions last year</h1>

          {/* Cards Row */}
          <div className="grid grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCardSeller key={index} article={article} />
            ))}
          </div>

          <h1 className="text-lg font-semibold mb-4 mt-10">Average prices of the crops</h1>
        </div>
      </div>
    </>
  );
};

export default AgroDetails;
