import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../helpers/axiosInstance'

import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';

import { IconContext } from "react-icons";
import { IoCloseCircleOutline } from "react-icons/io5";

import { API_END_POINTS } from '../../assets';
const { USERS } = API_END_POINTS


const LoginPopup = ({ setShowLogin }) => {

    const { setToken, loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        try {
            let newURL = USERS;
            if (currState === "Login") {
                newURL += "/login";
            }
            else {
                newURL += "/register"
            }
            const response = await axiosInstance.post(newURL, data);

            if (response.data.success) {
                setToken(response.data.data);
                localStorage.setItem("token", response.data.data);
                loadCartData({ token: response.data.data });
                setShowLogin(false);
                navigate('/', { replace: true });
                window.location.reload();
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">

                    <h2>{currState}</h2>

                    <IconContext.Provider value={{ size: '20px' }}>
                        <IoCloseCircleOutline onClick={() => setShowLogin(false)} />
                    </IconContext.Provider>

                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button>{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
