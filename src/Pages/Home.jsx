import React from 'react'
import Hero from '../Components/Hero'
import Cards from '../Components/Cards'
import Coupon from '../Components/Coupon'
import Cards2 from '../Components/Cards2'
import Brand from '../Components/Brand'
import Categories from '../Components/Categories'
import PriceDrop from '../Components/PriceDrop'


const Home = () => {
  return (
    <div>    
    <Hero/>
    <Cards/>
    <Coupon/>
    <Cards2/>
    <Brand/>
    <Categories/>
    <PriceDrop/>
    </div>
  )
}

export default Home