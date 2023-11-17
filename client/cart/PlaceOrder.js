import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import auth from './../auth/auth-helper'
import cart from './cart-helper.js'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {create} from './../order/api-order.js'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  subheading: {
    color: 'rgba(88, 114, 128, 0.87)',
    marginTop: "20px",
  },
  checkout: {
    float: 'right',
    margin: '20px 30px'
  },
  error: {
    display: 'inline',
    padding: "0px 10px"
  },
  errorIcon: {
    verticalAlign: 'middle'
  },
  StripeElement: {
    display: 'block',
    margin: '24px 0 10px 10px',
    maxWidth: '408px',
    padding: '10px 14px',
    boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
    borderRadius: '4px',
    background: 'white'
  }
}))

const PlaceOrder = (props) => {
  const classes = useStyles()
  const [values, setValues] = useState({
    order: {},
    PBFKey: '',
    //txRef : number,
    error: '',
    redirect: false,
    orderId: ''
  })
  
  
  const placeOrder = ()=>{
    

    const PBFKey = "FLWPUBK-16ddebf73894c626d0cf438dcd57df08-X"; // paste in the public key from your dashboard here
    const txRef = ''+Math.floor((Math.random() * 1000000000) + 1); //Generate a random id for the transaction reference
              
    
      
  
    
  
          
            FlutterwaveCheckout({
              public_key: PBFKey,
              tx_ref: txRef,
              amount: 100,
              currency: "NGN",
              payment_options: "card, mobilemoneyghana, ussd",
              redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
              meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a",
              },
              customer: {
                email: "oyekanmijelili@gmail.com",
                phone_number: "07030786761",
                name: "jelil",
              },
              customizations: {
                title: "The Titanic Store",
                description: "Payment for an awesome cruise",
                logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
              },
            });
          
          
  
      


}


    if (values.redirect) {
      return (<Redirect to={'/order/' + values.orderId}/>)
    }
    return (
    <span>
      <Typography type="subheading" component="h3" className={classes.subheading}>
        Card details
      </Typography>
      
      <div className={classes.checkout}>
        { values.error &&
          (<Typography component="span" color="error" className={classes.error}>
            <Icon color="error" className={classes.errorIcon}>error</Icon>
              {values.error}
          </Typography>)
        }
        <Button color="secondary" variant="contained" onClick={placeOrder}>Place Order</Button>
      </div>
    </span>)

}
PlaceOrder.propTypes = {
  checkoutDetails: PropTypes.object.isRequired
}

export default PlaceOrder
