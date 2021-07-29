import React, { useMemo } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {stripeCharge} from '../api'


const CheckoutForm = () => {


  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details:{
            email: event.target.email.value
        }
    })

    if(!error){
        console.log(paymentMethod);
        const {id} = paymentMethod;
        const amount = 199;
        try{
            const result = await stripeCharge({id, amount })
            console.log(result);
        }catch(error){
            console.log(error)
        }   
    }
  };

  return (
    <form onSubmit={handleSubmit} className="CheckoutForm">
      <label>
        Email
        <input name="email" type="email" placeholder="email" required />
      </label>
      <label>
        Card details
        <CardElement />
      </label>
      <button type="submit" disable={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
