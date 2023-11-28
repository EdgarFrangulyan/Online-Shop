import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { payConfirm } from '../store/actions/payment'
import { useDispatch } from 'react-redux'

export default function ConfirmCard() {

  const [searchParams] = useSearchParams()
   const query = Object.fromEntries([...searchParams])
   const dispatch = useDispatch()
   console.log(query)

 

useEffect(() => {

(async() => {
if(query.redirect_status){
  const data = await dispatch(payConfirm({
    paymentIntentClientSecret: query.payment_intent_client_secret.toString(),
    paymentIntent: query.payment_intent.toString()
  }))
  console.log(data)
}
})()

}, [query.payment_intent])



  return (
    <div>ConfirmCard</div>
  )
}
