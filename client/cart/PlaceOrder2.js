import React, {useState} from 'react'
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
import NoSSR from 'react-no-ssr'


const PlaceOrder2 = (props) => {

  const [values, setValues] = useState({
    order: {},
    error: '',
    redirect: false,
    orderId: ''
  })

  
  
  
  
  const placeOrderEvent = (data)=>{
    
    const jwt = auth.isAuthenticated()
    create({userId:jwt.user._id}, {
      t: jwt.token
    }, props.checkoutDetails).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        cart.emptyCart(()=> {
          setValues({...values, 'orderId':data._id,'redirect': true})
        })
      }
    })
  
  
  
  }

  if (values.redirect) {
    return (<Redirect to={'/order/' + values.orderId}/>)
  }
  
  return (
    <NoSSR>
    <div className="App">

     <Button color="secondary" variant="contained" onClick={placeOrderEvent}>place Order with flutterwave</Button>
     
     
    
    </div>
    </NoSSR>

    
  );
}


export default PlaceOrder2

