import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import CartItems from './CartItems'
import {StripeProvider} from 'react-stripe-elements'
import config from './../../config/config'
import Checkout2 from './Checkout2'
import Checkout from './Checkout'
import NoSSR from 'react-no-ssr'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
    "@media (max-width: 894px)": {
    
      marginTop: '100px'
        
    
      
      },
  }
}))

export default function Cart () {
  const classes = useStyles()
  const [checkout, setCheckout] = useState(false)

  const showCheckout = val => {
    setCheckout(val)
  }

    return (
    <NoSSR>
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <CartItems checkout={checkout}
                     setCheckout={showCheckout}/>
        </Grid>
        {/*{checkout &&
          <Grid item xs={6} sm={6}>
                 <Checkout2/>
            <StripeProvider apiKey={config.stripe_test_api_key}>
              <Checkout/>
        </StripeProvider>
          </Grid>}*/}
        </Grid>
      </div>
      </NoSSR>
      )
}
