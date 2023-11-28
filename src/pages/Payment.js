import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { payToken } from '../store/actions/payment';
import CheckOutForm from '../components/CheckOutForm';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const stripePromise = loadStripe('pk_test_51MiXl9FYkhASZIsiaa9XfTnp4Jyd2QD9x6cauLnMDZVB1QPlhS7it5jJ6GOxOZx0RohsVmzsTlo8OOA9VqVXGIbD00RqxrYF95');



export default function Payment() {

  const token = localStorage.getItem("userToken")
  const dispatch = useDispatch()
  const [clientSecret, setClientSecret] = useState()
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      if (token) {
        try {
          const data = await dispatch(payToken({
            "amount": 2000,
  
          }))
          setClientSecret(data.payload.paymentIntent.client_secret);
           
        } catch {
          alert("Payment is not working")
        }

      }
    })()


  }, [])

  if (!clientSecret) {
    return null
  }


  const options = {
    clientSecret
  }


  return (
    <div>

      <div>
        <Elements stripe={stripePromise} options={options}>
          <Toast/>
          <CheckOutForm />
        </Elements>
      </div>

    </div>
  )
}
