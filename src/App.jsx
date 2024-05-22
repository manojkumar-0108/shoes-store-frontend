/**
 * packages import
 */
import { useContext, useState } from 'react'
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
import { StoreContext } from './context/StoreContext';


/**
 * Main Application
 * @returns
 */
function App() {

  const [showLogin, setShowLogin] = useState(false);
  const { appLoading } = useContext(StoreContext);

  if (appLoading) {
    return (
      <div className='app'>
        <div className="loading-overlay">
          <div className="spinner-container">
            <div className="spinner"></div>
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

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
