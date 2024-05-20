import { createContext, useEffect, useState } from "react";

import { API_END_POINTS, shoesCategories } from "../assets";
const { CARTS, SHOES } = API_END_POINTS;

import axiosInstance from "../helpers/axiosInstance";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [shoes, setShoes] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [category, setCategory] = useState("All")


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            try {
                await axiosInstance.post(
                    `${CARTS}/products/${itemId}`,
                    {},
                    { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } });
            } catch (error) {
                console.log("Error : ", error);
            }

        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {

            try {
                await axiosInstance.delete(`${CARTS}/products/${itemId}`, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } });
            } catch (error) {
                console.log("Error : ", error);
            }

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

        try {
            const response = await axiosInstance.get(`${SHOES}`, {});
            setShoes(response.data.data)
        } catch (error) {
            console.log("Error : ", error);
        }

    }

    const loadCartData = async (token) => {

        try {
            const response = await axiosInstance.get(`${CARTS}/products`, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } });
            setCartItems(response.data.data);
        } catch (error) {
            console.log("Error : ", error);
        }
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
        setCartItems,
        category,
        setCategory
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
