
import axios from 'axios';
import { BACKEND_BASE_URL } from '../assets';

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL
});

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log("Error : ", error.response);
        return Promise.resolve(error.response);
    }
);

export default axiosInstance;
