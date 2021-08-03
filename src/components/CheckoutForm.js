import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { stripeCharge } from '../api';

const CheckoutForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [error, setError] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: '',
  });
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: event.target.email.value,
      },
    });

    if (!error) {
      setPaymentMethod(paymentMethod);

      const { id } = paymentMethod;
      const amount = 199;
      try {
        const result = await stripeCharge({ id, amount });
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(error);
    }
  };

  const reset = () => {
    setError(null);
    setPaymentMethod(null);
    setBillingDetails({ email: '' });
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        PaymentMethod: {paymentMethod.id}
      </div>
      <button className="ResetButton"onClick={reset}> Reset</button> 
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="CheckoutForm">
      <label>
        Email
        <input name="email" type="email" placeholder="email" required />
      </label>
      <label>
        Card details
        <CardElement />
      </label>
      <button className="PayButton" type="submit" disable={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
