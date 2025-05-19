import ProductItem from '../components/ProductItem';
import TopCategoryList from '../components/TopCategoryList';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '@/admin/pages/home/home_components/Footer';
import NavBar from '@/admin/pages/home/home_components/NavBar';

const CategoryPage = () => {

    const { cid } = useParams();
      console.log(cid)

    const { categoryName } = useParams();
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:3000/api/customer/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const json = await response.json();
                console.log("Fetched JSON:", json); // Debugging step
    
                const productList = Array.isArray(json) ? json : json.products || [];
                const filteredProducts = productList.filter(
                    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
                );
    
                setProducts(filteredProducts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, [categoryName]);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!products || products.length === 0) {
        return <div>No products found for {categoryName}.</div>;
    }

    return (
        
        <div>
            <NavBar />
            <Header custId={cid}/>

            <div>
  <h2 className="p-4 bg-green-700 text-white font-bold text-3xl text-center">
    {categoryName}
  </h2>

  <div className="px-4 sm:px-6 md:px-10 mb-6">
    <TopCategoryList custId={cid} selectedCategory={categoryName} />
  </div>

  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6 px-4 sm:px-6 md:px-10 mb-10'>
  {products.map((product) => (
    <ProductItem key={product._id} product={product} />
  ))}
</div>

</div>

            <Footer/>
        </div>
    );
};

export default CategoryPage;