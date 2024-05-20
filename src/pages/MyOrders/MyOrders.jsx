import { useContext, useEffect, useState } from 'react'
import './MyOrders.css'

import axiosInstance from '../../helpers/axiosInstance';

import { StoreContext } from '../../context/StoreContext';
import images from '../../assets/images';

import { API_END_POINTS } from '../../assets';
import currencyFormatter from '../../helpers/currency.formatter';


const MyOrders = () => {

  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);

  const fetchOrders = async () => {

    try {
      const response = await axiosInstance.get(
        `${API_END_POINTS.ORDERS}`,
        { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } });
      setData(response.data.data)
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
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
