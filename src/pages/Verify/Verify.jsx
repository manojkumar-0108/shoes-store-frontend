import { toast } from 'react-toastify';
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'

import axiosInstance from '../../helpers/axiosInstance';

import { API_END_POINTS } from '../../assets';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const navigate = useNavigate();

  const verifyPayment = async () => {

    try {

      const response = await axiosInstance.patch(
        `${API_END_POINTS.ORDERS}/verify/${orderId}`,
        { success }
      );

      if (response.data.success) {
        toast.success('Order placed successfully');
        navigate("/myorders");
      }
      else {
        toast.error('Order failed');
        navigate("/");
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    verifyPayment();
  }, [])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
