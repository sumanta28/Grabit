import React from 'react'
import Hero from '../Components/Hero'
import Cards from '../Components/Cards'
import Coupon from '../Components/Coupon'
import Cards2 from '../Components/Cards2'
import Brand from '../Components/Brand'
import Categories from '../Components/Categories'
import PriceDrop from '../Components/PriceDrop'
import Seo from "../Components/Seo"

const Home = () => {
  return (
    <div>
       <Seo
        title="Grabit – Discover the best products online"
        description="Find exclusive deals and the latest trends on Grabit, your go-to multi-vendor shopping platform."
        canonical="https://www.grabit.com/home"
        image="https://www.grabit.com/assets/img/home-banner.jpg"
      />
      <Hero />
      <Cards />
      <Coupon />
      <Cards2 />
      <Brand />
      <Categories />
      <PriceDrop />
    </div>
  )
}

export default Home