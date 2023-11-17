import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Edit from '@material-ui/icons/Edit'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import {listByShop} from './../product/api-product.js'
import DeleteProduct from './../product/DeleteProduct'
import NoSSR from 'react-no-ssr'

const useStyles = makeStyles(theme => ({
  products: {
    padding: '24px',
    "@media (max-width: 662px)": {
    
      width:'90%',
      
      //marginTop: '420px', 
      
    
    },
  },

  flexproducts2:{
    "@media (max-width: 662px)": {
    
    
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    //justifyContent: 'flexStart',
    alignItems: 'stretch',
    overflow: 'hidden',
    backgroundColor: 'brown',
    padding: '10px', 
    //marginTop: '20px', 
    width:'650px',
    marginLeft:'-40px',
    //marginRight:'-40px'

  
  },
},
  addButton:{
    float:'right',
    marginRight: "8px",
    "@media (max-width: 860px)": {
    
      marginRight: "-38px"
      //marginTop: "-8px",
      //height: '20px'
      //float:'left',
    
    },
  },
  leftIcon: {
    marginRight: "8px",
    "@media (max-width: 860px)": {
    
     // marginRight: "-18px"
      //marginTop: "-8px",
      //height: '20px'
      
    
    },
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  cover: {
    width: 110,
    height: 100,
    margin: '8px'
  },
  details: {
    padding: '10px'
  },
}))

export default function MyProducts (props){
  const classes = useStyles()
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listByShop({
      shopId: props.shopId
    }, signal).then((data)=>{
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const removeProduct = (product) => {
    const updatedProducts = [...products]
    const index = updatedProducts.indexOf(product)
    updatedProducts.splice(index, 1)
    setProducts(updatedProducts)
  }

    return (
    <NoSSR>
      <Card className={classes.products}>
        <Typography type="title" className={classes.title}>
          Products
          <span className={classes.addButton}>
            <Link to={"/seller/"+props.shopId+"/products/new"}>
              <Button color="primary" variant="contained">
                <Icon className={classes.leftIcon}>add_box</Icon>  New Product
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
        {products.map((product, i) => {
            return <span key={i}>
              <ListItem className={classes.flexproducts2}>
                <CardMedia
                  className={classes.cover}
                  image={'/api/product/image/'+product._id+"?" + new Date().getTime()}
                  title={product.name}
                />
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.productTitle}>
                    {product.name}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    Quantity: {product.quantity} | Price: ${product.price}
                  </Typography>
                </div>
                <ListItemSecondaryAction>
                  <Link to={"/seller/"+product.shop._id+"/"+product._id+"/edit"}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit/>
                    </IconButton>
                  </Link>
                  <DeleteProduct
                    product={product}
                    shopId={props.shopId}
                    onRemove={removeProduct}/>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/></span>})}
        </List>
      </Card>
      </NoSSR>
      )
}
MyProducts.propTypes = {
  shopId: PropTypes.string.isRequired
}

