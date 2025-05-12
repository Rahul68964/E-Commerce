import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const Verify = () => {

  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');
  const success = searchParams.get('success');

  const verifyPayment = async () => {
    try {
      if(!token){
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'withCredentials': true
        }
      });
      console.log('verify response : ', response);
      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      }
      else {
        navigate('/cart');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    verifyPayment();
  },[token])

  return (
    <div>
      <h1>Verifying</h1>
    </div>
  )
}

export default Verify