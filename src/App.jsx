/**
 * packages import
 */
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

/**
 * Custom components and functions import
 */
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import Verify from './pages/Verify/Verify';
import ProductDetails from './pages/ProductDetails/ProductDetails';


/**
 * Main Application
 * @returns
 */
function App() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/:productId" element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>

      </div>

      <Footer />

    </>
  )
}

export default App
