import { useContext } from 'react'
import './ExploreCategories.css'
import { StoreContext } from '../../context/StoreContext'

const ExploreCategories = () => {

  const { shoesCategories, category, setCategory } = useContext(StoreContext);

  return (
    <div className='explore-menu' id='explore-categories'>

      <h1>
        Explore our shoe categories
      </h1>

      <p className='explore-menu-text'>
        Choose from a diverse categories featuring a delectable array of shoes. Our mission is to satisfy customer needs and elevate their experience.
      </p>

      <div className="explore-menu-list">

        {shoesCategories.map((item, index) => {
          return (
            <div
              onClick={() => setCategory(prev => prev === item.category ? "All" : item.category)}
              key={index}
              className='explore-menu-list-item'
            >
              <img
                src={item.image}
                className={category === item.category ? "active" : ""}
                alt="" />

              <p>{item.category}</p>
            </div>
          )
        })}

      </div>
      <hr />
    </div>
  )
}

export default ExploreCategories
