import Banner from '../components/Banner'
import CategoryList from '../components/CategoryList'
import ProductList from '../components/ProductList'
import Slider from '../components/Slider'
import React from 'react'
import Header from '../components/Header'
import NavBar from '@/admin/pages/home/home_components/NavBar'

import Footer from '@/admin/pages/home/home_components/Footer'

import { useParams } from 'react-router-dom'

const Home = () => {
  const { cid } = useParams();
  console.log(cid)

  return (
    <div >
      <NavBar/>
      <Header custId={cid}/>
    <div >
      
       <Slider/>
       <CategoryList custId={cid}/>
       <ProductList custId={cid}/>
       <Banner/>
       
    </div>
    <Footer/>
    </div>
  )
}

export default Home