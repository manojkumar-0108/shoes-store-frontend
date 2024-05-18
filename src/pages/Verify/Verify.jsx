import { toast } from 'react-toastify';
import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import './Verify.css'

import axiosInstance from '../../helpers/axiosInstance';

import { API_END_POINTS } from '../../assets';

const Verify = () => {
  const { token } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const navigate = useNavigate();

  const verifyPayment = async () => {

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
