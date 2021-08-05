import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { stripeCharge } from '../api';
import { Card, ListGroup } from 'react-bootstrap';

const CheckoutForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [error, setError] = useState(null);
  const [details, setDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  console.log(error);
  const handleSubmit = async (event) => {

    event.preventDefault();
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: event.target.email.value,
      },
    });

    if (error) {
      return setError(error);
    }

    const { id } = paymentMethod;

    try {
      
      const result = await stripeCharge({ id });

      if (result.orderId) {
        const {
          orderId,
          payment: { amount, description },
        } = result;
        setDetails({ orderId, amount, description });
        setPaymentMethod(paymentMethod);
        setProcessing(false);
      } else {
        setError( result.raw.message );
        setProcessing(false);
      }

    } catch (error) {
      setError(error);
    }
  };

  const reset = () => {
    setError(null);
    setPaymentMethod(null);
    setDetails({});
  };

  return paymentMethod ? (
    <div className="Result">
      <div>
        <Card style={{ width: '100%' }}>
          <Card.Header className="ResultTitle" role="alert">
            Payment successful
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Order Number: {details.orderId}</ListGroup.Item>
            <ListGroup.Item>Payment Method: {paymentMethod.id}</ListGroup.Item>
            <ListGroup.Item>Amount: ${details.amount / 100}</ListGroup.Item>
            <ListGroup.Item>Description: {details.description}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      <button className="ResetButton" onClick={reset}>
        Reset
      </button>
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
      
      <button
        className="PayButton"
        type="submit"
        disable={!stripe || processing}
      >
        {processing ? 'Processing...' : 'Pay'}
      </button>
      <label>{error && error}</label>
    </form>
  );
};

export default CheckoutForm;
