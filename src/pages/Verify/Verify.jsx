import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Verify.css';

import axiosInstance from '../../helpers/axiosInstance';
import { API_END_POINTS } from '../../assets';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const verifyPayment = async () => {
    try {
      const response = await axiosInstance.patch(
        `${API_END_POINTS.ORDERS}/verify/${orderId}`,
        { success }
      );

      console.log("Response : ", response.data);
      if (response.data.success) {
        navigate("/myorders");
        toast.success('Order placed successfully');
      } else {
        navigate("/");
        toast.error('Order failed');
        console.log(response?.data?.message);
      }
    } catch (error) {
      console.log("Error : ", error?.data?.message);
    } finally {
      setVerified(true); // Update verified state after verification is completed
    }
  }

  useEffect(() => {
    if (!verified && success && orderId) {
      verifyPayment();
    }
  }, [verified, success, orderId]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
