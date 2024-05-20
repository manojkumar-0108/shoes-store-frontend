import { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'


import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../helpers/axiosInstance';
import { StoreContext } from '../../context/StoreContext';

import { API_END_POINTS } from '../../assets';

import currencyFormatter from '../../helpers/currency.formatter';


const PlaceOrder = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const { getTotalCartAmount, token, shoes, cartItems, setCartItems } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        let orderItems = [];

        shoes.map((item) => {
            if (cartItems[item.id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item.id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 5,
        };

        try {
            let response = await axiosInstance.post(
                `${API_END_POINTS.ORDERS}`,
                orderData,
                { headers: { 'x-access-token': token } }
            );

            if (response.data.success) {
                const session_url = response.data.data;
                window.location.replace(session_url);
            } else {
                console.log("Error : ", response.data);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error : ", error);
            toast.error('An error occurred while placing the order.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        if (!token) {
            toast.error("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p><p>{currencyFormatter(getTotalCartAmount())}</p>

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
                                {currencyFormatter(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50)}
                            </b>
                        </div>
                    </div>
                </div>

                <button
                    className='place-order-submit'
                    type='submit'
                    disabled={isLoading} // Disable button while loading
                >
                    Proceed To Payment
                </button>
            </div>
            {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <div>Processing...</div>
                    </div>
                </div>
            )}


        </form>
    )
}

export default PlaceOrder
