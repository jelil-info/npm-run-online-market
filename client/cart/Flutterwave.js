//import React, {useState} from 'react'
import React, {useState, useEffect}  from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import CartItems from './CartItems'
//import cart from './cart-helper.js'
import auth from './../auth/auth-helper'
import cart from './cart-helper.js'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {create} from './../order/api-order.js'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {read} from './../order/api-order.js'
import Checkout2 from './../cart/Checkout2'
import NoSSR from 'react-no-ssr'


const Flutterwave = (props) => {

  

  const [cartItems, setCartItems] = useState(cart.getCart())

  
  const getTotal = props.getTotal;

  

   const config = {
    public_key: 'FLWPUBK-16ddebf73894c626d0cf438dcd57df08-X',
    tx_ref: Date.now(),
    amount: getTotal(),
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    redirect_url: "http://localhost:3000/",
    customer: {
      email: props.checkoutDetails.customer_email,
      phone_number: props.checkoutDetails.delivery_address.zipcode,
      name: props.checkoutDetails.customer_name,
    },
    customizations: {
      //title: props.checkoutDetails.delivery_address.country,
      //description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response);
     closePaymentModal() // this will close the modal programmatically
   },
   onClose: (incomplete) => {

    if (incomplete === true) {

      return (<Redirect to={'/http://localhost:3000/'}/>)}
      
    }

   }
    
    


  
  
  return (
  
  <NoSSR>
    
    <Button className="App">
      
    <FlutterWaveButton  {...fwConfig} />
    
    </Button>

  </NoSSR>
    
  );
}

Flutterwave.propTypes = {
  checkoutDetails: PropTypes.object.isRequired,
  getTotal: PropTypes.func.isRequired
  
}

export default Flutterwave

