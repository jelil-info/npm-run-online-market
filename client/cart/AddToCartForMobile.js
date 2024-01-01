import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import AddCartIcon from '@material-ui/icons/AddShoppingCart'
import DisabledCartIcon from '@material-ui/icons/RemoveShoppingCart'
import cart from './cart-helper.js'
import { Redirect } from 'react-router-dom'
import NoSSR from 'react-no-ssr'

const useStyles = makeStyles(theme => ({
  iconButton: {
    width: '28px',
    height: '28px',
    marginLeft: '-10px',
    marginBottom: '0px',
    /*"@media (max-width: 960px)": {

      marginLeft: '-100px',
      marginBottom: '-35px'
    
    },
    "@media (max-width: 400px)": {

      marginLeft: '-150px',
      marginBottom: '-35px'
    
    },*/
    
  },

  disabledIconButton: {
    color: '#7f7563',
    width: '28px',
    height: '28px',
    marginLeft: '-10px',
    marginBottom: '0px'
    
    /*"@media (max-width: 400px)": {

      marginLeft: '-150px',
      marginBottom: '-35px'
      
    },*/
    
  }
}))

export default function AddToCart(props) {
  const classes = useStyles()
  const [redirect, setRedirect] = useState(false)

  const addToCart = () => {
    cart.addItem(props.item, () => {
      setRedirect({redirect:true})
    })
  }
    if (redirect) {
      return (<Redirect to={'/cart'}/>)
    }
    return (
    <NoSSR>
    <span>
      {props.item.quantity >= 0 ?
        <IconButton color="secondary" dense="dense" onClick={addToCart}>
          <AddCartIcon className={props.cartStyle || classes.iconButton}/>
        </IconButton> :
        <IconButton disabled={true} color="secondary" dense="dense">
          <DisabledCartIcon className={props.cartStyle || classes.disabledIconButton}/>
        </IconButton>}
      </span>
      </NoSSR>
      )
}

AddToCart.propTypes = {
  item: PropTypes.object.isRequired,
  cartStyle: PropTypes.string
}
