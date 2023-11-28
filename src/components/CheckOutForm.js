import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { result } from 'lodash'

import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CheckOutForm() {

const [name, setName] = useState('')
const stripe = useStripe()
const elements = useElements()
const navigate = useNavigate()


const handleSubmit = async (ev) => {
  ev.preventDefault();

  const result = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: window.location.origin + "/complete",
      payment_method_data: {
        billing_details: {
          name,
          
        }
      }
    },
  });
 console.log(result)
}

  return (
    <div className='payment'>
<form onSubmit={(ev) => handleSubmit(ev)}>
<PaymentElement/>
<input value={name} onChange={(ev) => setName(ev.target.value)} type = 'text' placeholder='Your Name' />
<button disabled={!stripe || !elements}>Pay</button>
</form>


    </div>
  )
}
