import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

import { API_END_POINTS } from '../../assets';

import currencyFormatter from '../../helpers/currency.formatter';
import { IconContext } from "react-icons";
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {

  const { cartItems, shoes, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {shoes.map((item, index) => {
          if (cartItems[item.id] > 0) {
            return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={API_END_POINTS.IMAGES + '/' + item.image} alt="" />
                <p>{item.name}</p>
                <p>{currencyFormatter(item.price)}</p>
                <div>{cartItems[item.id]}</div>
                <p>{currencyFormatter(item.price * cartItems[item.id])}</p>

                <IconContext.Provider value={{ size: '20px' }}>
                  <MdDeleteForever
                    className='cart-items-remove-icon'
                    onClick={() => removeFromCart(item.id)}
                  />
                </IconContext.Provider>

              </div>
              <hr />
            </div>)
          }
        })}

      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{currencyFormatter(getTotalCartAmount())}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{currencyFormatter(getTotalCartAmount() === 0 ? 0 : 50)}</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}
              </b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>
            PROCEED TO CHECKOUT
          </button>

        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
