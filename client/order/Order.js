import React, {useState, useEffect}  from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import {makeStyles} from '@material-ui/core/styles'
import {read} from './api-order.js'
import {Link} from 'react-router-dom'
import Flutterwave from './../cart/Flutterwave'
import Checkout2 from './../cart/Checkout2'
import PropTypes from 'prop-types'
import cart from './../cart/cart-helper.js'
import auth from './../auth/auth-helper'
import NoSSR from 'react-no-ssr'
import { useHistory } from 'react-router'
import {Redirect} from 'react-router-dom'
import {create} from './../order/api-order.js'

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    flexGrow: 1,
    margin: 30,

    "@media (max-width: 900px)": {
    
      
  
      //padding: '5px',
      marginTop: '80px'
        
    
      
      },
    
  },
    
  cart: {
    textAlign: 'left',
    width: '100%',
    display: 'inline-flex',
  },
  details: {
    display: 'inline-block',
    width: "100%",
    padding: "4px",
    "@media (max-width: 566px)": {
    
      
  
      //padding: '5px',
      width: '80px'
        
    
      
      },

  },
  content: {
    flex: '1 0 auto',
    padding: '16px 8px 0px'
  },
  cover: {
    width: 160,
    height: 125,
    margin: '8px',
    /*"@media (max-width: 566px)": {
    
      
  
      //padding: '5px',
      width: '1400px'
        
    
      
      },*/
  },
  info: {
    color: 'rgba(83, 170, 146, 0.82)',
    fontSize: '0.95rem',
    display: 'inline'
  },
  thanks:{
    color: 'rgb(136, 183, 107)',
    fontSize: '0.9rem',
    fontStyle: 'italic'
  },
  innerCardItems: {
    textAlign: 'left',
    margin: '24px 10px 24px 24px',
    padding: '24px 20px 40px 20px',
    backgroundColor: '#80808017',
    "@media (max-width: 566px)": {
        
          
      
      paddingLeft: '0px',
      paddingRight: '5px',
      //marginLeft: '-20px'
        
    
      
      }
    
      },
      innerCardItems2: {
        
        "@media (max-width: 566px)": {
        
          
      
          //padding: '5px',
          //marginLeft: '-20px'
            
        
          
          }
          },
  innerCard: {
    textAlign: 'left',
    margin: '24px 24px 24px 10px',
    padding: '30px 45px 40px 45px',
    backgroundColor: '#80808017'
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle
  },
  productTitle: {
    fontSize: '1.15em',
    marginBottom: '5px'
  },
  itemTotal: {
    float: 'right',
    marginRight: '40px',
    fontSize: '1.5em',
    color: 'rgb(72, 175, 148)'
  },
  itemShop: {
    display: 'block',
    fontSize: '1em',
    color: '#78948f'
  },
  checkout: {
    float: 'right',
    margin: '24px'
  },
  total: {
    fontSize: '1.2em',
    color: 'rgb(53, 97, 85)',
    marginRight: '16px',
    fontWeight: '600',
    verticalAlign: 'bottom'
  }
}))

export default function Order({match}) {

  const classes = useStyles()
  const [order, setOrder] = useState({products:[], delivery_address:{}})

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      orderId: match.params.orderId
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOrder(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const getTotal = () => {
    return order.products.reduce((a, b) => {
       const quantity = b.status == "Cancelled" ? 0 : b.quantity
        return a + (quantity*b.product.price)
    }, 0)
  }



  const user = auth.isAuthenticated().user
  const [values, setValues] = useState({
    checkoutDetails: {
      products: cart.getCart(),
      //amount: cart.getTotal(),
      customer_name: user.name,
      customer_email: user.email,
      delivery_address: { street: '', city: '', state: '', zipcode: '', country: '' }
    },
    error: ''
  })
  /*function settingValue(e) {
    const item = e.target.value;
    console.log(item);
    setValues([...values, item]);
  }*/

  

  
  useEffect(() => {
    const handleLoad = name => event => {
      event.preventDefault();
      
        // Perform actions after the component has fully loaded
        event.preventDefault();
      event.returnValue = '';
      
      };
    window.addEventListener('beforeunload', handleLoad);
    return () => {
      window.removeEventListener('beforeunload', handleLoad);
    };
  }, []);
  

  
  
  /*props => {

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
  
  
  }*/
  

//const history = useHistory()

// then add this to the function that is called for re-rendering
//history.go(-1)
//history.pushState(null, '/');

    return (
    <NoSSR>
      <Card className={classes.card}>
        <Typography type="headline" component="h2" className={classes.title}>
            Order Details
        </Typography>
        <Typography type="subheading" component="h2" className={classes.subheading}>
            Order Code: <strong>{order._id}</strong> <br/> Placed on {(new Date(order.created)).toDateString()}
        </Typography><br/>
        <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <Card className={classes.innerCardItems}>
                  {order.products.map((item, i) => {
                    return  <span className={classes.innerCardItems2} key={i}>
                      <Card className={classes.cart} >
                        <CardMedia
                          className={classes.cover}
                          image={'/api/product/image/'+item.product._id}
                          title={item.product.name}
                        />
                        <div className={classes.details}>
                          <CardContent className={classes.content}>
                            <Link to={'/product/'+item.product._id}><Typography type="title" component="h3" className={classes.productTitle} color="primary">{item.product.name}</Typography></Link>
                            <Typography type="subheading" component="h3" className={classes.itemShop} color="primary">₦{item.product.price} x {item.quantity}</Typography>
                            <span className={classes.itemTotal}>₦{item.product.price * item.quantity}</span>
                            <span className={classes.itemShop}>Shop: {item.shop.name}</span>
                            <Typography type="subheading" component="h3" color={item.status == "Cancelled" ? "error":"secondary"}>Status: {item.status}</Typography>
                          </CardContent>
                        </div>
                      </Card>
                      <Divider/>
                    </span>})
                  }
                  <div className={classes.checkout}>
                    <span className={classes.total}>Total: ₦{getTotal()}</span>
                  </div>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <Card className={classes.innerCard}>
                <Typography type="subheading" component="h2" className={classes.productTitle} color="primary">
                 Deliver to:
                </Typography>
                <Typography type="subheading" component="h3" className={classes.info} color="primary"><strong>{order.customer_name}</strong></Typography><br/>
                <Typography type="subheading" component="h3" className={classes.info} color="primary">{order.customer_email}</Typography><br/>
                <br/>
                <Divider/>
                <br/>
                <Typography type="subheading" component="h3" className={classes.itemShop} color="primary">{order.delivery_address.street}</Typography>
                <Typography type="subheading" component="h3" className={classes.itemShop} color="primary">{order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zipcode}</Typography>
                <Typography type="subheading" component="h3" className={classes.itemShop} color="primary">{order.delivery_address.country}</Typography><br/>
                <Typography type="subheading" component="h3" className={classes.thanks} color="primary">Thank you for shopping with us! <br/>You can track the status of your purchased items on this page.</Typography>
              </Card>
              <Flutterwave  getTotal={getTotal} checkoutDetails={values.checkoutDetails} />
            </Grid>
        </Grid>
      </Card>
      </NoSSR>
    )
}

Order.propTypes = {
  checkoutDetails: PropTypes.object.isRequired,
  
}
