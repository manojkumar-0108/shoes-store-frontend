import { useState } from 'react'

import ExploreCategories from '../../components/ExploreCategories/ExploreCategories'
import AppDownload from '../../components/AppDownload/AppDownload'
import ShoesCarousel from '../../components/Carousel/ShoesCarousel'
import DisplayShoes from '../../components/DisplayShoes/DisplayShoes'

const Home = () => {

  return (
    <>
      <ShoesCarousel />
      <ExploreCategories />
      <DisplayShoes />
      <AppDownload />
    </>
  )
}

export default Home
