import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Navbar.css'


import { StoreContext } from '../../context/StoreContext';

import { assets } from '../../assets';
import { IconContext } from "react-icons";
import { AiOutlineLogout } from "react-icons/ai";
import { IoBagHandle } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FiBox } from "react-icons/fi";

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleMenuClick = (menu, path) => {
    setMenu(menu);
    navigate(`/${path}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }


  return (
    <div className='navbar'>

      <Link to='/'>
        <h1 className='shop-title'>inShop</h1>
      </Link>

      <ul className="navbar-menu">

        <Link
          to="/"
          onClick={() => handleMenuClick("home", '')}
          className={`${menu === "home" ? "active" : ""}`}
        >
          Home
        </Link>

        <a
          href='#explore-categories'
          onClick={() => handleMenuClick("categories", '#explore-categories')}
          className={`${menu === "categories" ? "active" : ""}`}
        >
          Categories
        </a>

        <a
          href='#footer'
          onClick={() => handleMenuClick("contact", '#footer')}
          className={`${menu === "contact" ? "active" : ""}`}
        >
          Contact us
        </a>
      </ul>

      <div className="navbar-right">

        <div className="hide-search">
          <IconContext.Provider value={{ size: '30px' }}>
            <CiSearch />
          </IconContext.Provider>
        </div>

        <Link
          to='/cart'
          className='navbar-search-icon'
        >
          <IconContext.Provider value={{ size: '30px' }}>
            <IoBagHandle />
          </IconContext.Provider>

          <div className={getTotalCartAmount() > 0 ? "dot" : ""} />
        </Link>

        {!token
          ?
          <button
            onClick={() => setShowLogin(true)}>
            Sign In
          </button>
          :
          <div className='navbar-profile'>
            <img
              src={assets.images.profileIcon}
              alt=""
            />

            <ul className='navbar-profile-dropdown'>
              <li
                onClick={() => navigate('/myorders')}
              >
                <IconContext.Provider value={{ size: '25px' }}>
                  <FiBox />
                </IconContext.Provider>
                <p>
                  Orders
                </p>
              </li>

              <hr />

              <li onClick={logout}>
                <IconContext.Provider value={{ size: '25px' }}>
                  <AiOutlineLogout />
                </IconContext.Provider>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar
