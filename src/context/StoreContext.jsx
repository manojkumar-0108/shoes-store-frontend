import { createContext, useEffect, useState } from "react";

import { API_END_POINTS, shoesCategories } from "../assets";
const { CARTS, SHOES } = API_END_POINTS;

import axiosInstance from "../helpers/axiosInstance";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [shoes, setShoes] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axiosInstance.post(
                `${CARTS}/products/${itemId}`,
                {},
                { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axiosInstance.delete(`${CARTS}/products/${itemId}`, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } });
        }
    }

    const getTotalCartAmount = () => {

        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = shoes.find((product) => product.id === Number(item));
                totalAmount += itemInfo?.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchShoesList = async () => {
        const response = await axiosInstance.get(`${SHOES}`, {});
        setShoes(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axiosInstance.get(`${CARTS}/products`, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } });

        console.log('Cart Data', response.data.data);
        setCartItems(response.data.data);
    }

    useEffect(() => {
        async function loadData() {
            await fetchShoesList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [])

    const contextValue = {
        shoes,
        shoesCategories,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
