import { useContext } from 'react'
import './MyOrders.css'

import { StoreContext } from '../../context/StoreContext';
import images from '../../assets/images';

import currencyFormatter from '../../helpers/currency.formatter';


const MyOrders = () => {

  const { ordersData } = useContext(StoreContext);
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {ordersData.length > 0 && ordersData.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              <img src={images.parcelIcon} alt="" />
              <p>{order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity
                }
                else {
                  return item.name + " x " + item.quantity + ", "
                }

              })}</p>
              <p>{currencyFormatter(order.amount)}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.order_status}</b></p>
              <button>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
