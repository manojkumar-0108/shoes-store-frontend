import { useState } from 'react'

import ExploreCategories from '../../components/ExploreCategories/ExploreCategories'
import AppDownload from '../../components/AppDownload/AppDownload'
import ShoesCarousel from '../../components/Carousel/ShoesCarousel'
import DisplayShoes from '../../components/DisplayShoes/DisplayShoes'

const Home = () => {

  const [category, setCategory] = useState("All")

  return (
    <>
      <ShoesCarousel />
      <ExploreCategories setCategory={setCategory} category={category} />
      <DisplayShoes category={category} />
      <AppDownload />
    </>
  )
}

export default Home
