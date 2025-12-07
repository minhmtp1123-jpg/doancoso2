import React from 'react'
import Hero from '../components/Hero'
import LastedCollection from '../components/LastedCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
    console.log("Home component render")

  return (
    <div>
      <Hero/>
      <LastedCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>  
    </div>
  )
}

export default Home