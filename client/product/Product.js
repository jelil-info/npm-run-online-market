import React, {useState, useEffect}  from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {read, listRelated} from './api-product.js'
import {Link} from 'react-router-dom'
import Suggestions from './../product/Suggestions'
import AddToCart from './../cart/AddToCart'
//import ImageList from '@material-ui/core/ImageList'
//import ImageListItem from '@material-ui/core/ImageListItem';
import NoSSR from 'react-no-ssr'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex:{
    display:'flex',
    maxWidth: 544
  },
  card: {
    padding:'24px 40px 40px',
   // maxWidth: 345,
    "@media (max-width: 894px)": {
      
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(1),
    
      
      },

      "@media (max-width: 418px)": {
        
        padding:'12px 5px 12px 5px',
        
        
        },
        
        "@media (max-width: 348px)": {
        
        padding:'12px 1px 12px 1px',
        
        
        },
        
        

        /*"@media (min-width: 300px)": {
        
          padding:'3.5px 7px 7px',
          
          },

          "@media (max-width: 352px)": {
        
            padding:'1px 3px 3px',
            
            },
            
            "@media (max-width: 340px)": {
        
            padding:'-50px -20px -20px',
            
            },

            "@media (max-width: 324px)": {
        
              padding:'-5px -2px -2px',
              
              },
              
              "@media (max-width: 315px)": {
        
              padding:'-10px -6px -6px',
              
              },*/

           /*   "@media (max-width: 348px)": {
        
                padding:'0.5px 2.5px 2.5px',
                
                },

                "@media (max-width: 328px)": {
        
                  padding:'0px 1px 1px',
                  
                  },*/
  
  },
  subheading: {
    margin: '24px',
    color: theme.palette.openTitle
  },
  price: {
    padding: '16px',
    margin: '16px 0px',
    display: 'flex',
    backgroundColor: '#93c5ae3d',
    fontSize: '1.3em',
    color: '#375a53',
  },
  media: {
    height: 200,
    display: 'inline-block',
    maxWidth: '50%',
    marginLeft: '24px',
    //height: 0,
    //paddingTop: '56.25%', // 16:9

    "@media (max-width: 338px)": {
      
      height: 200,
      display: 'inline-block',
      maxWidth: '50%',
      marginLeft: '24px',
      
      },
  },
  //imageList: {width:'500px'},

  icon: {
    verticalAlign: 'sub'
  },
  link:{
    color: '#3e4c54b3',
    fontSize: '0.9em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    borderRadius: '0.25em',
    backgroundColor: '#5f7c8b'
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  },
  mobileImage: {

    "@media (max-width: 500px)": {
      
      width:'130px',
      //heigth: '330px',
      marginLeft: '-24px',
      
      },

  }
}))

export default function Product ({match}) {
  const classes = useStyles()
  const [product, setProduct] = useState({shop:{}})
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      read({productId: match.params.productId}, signal).then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setProduct(data)
        }
      })
    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.productId])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

        listRelated({
          productId: match.params.productId}, signal).then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setSuggestions(data)
          }
        })
  return function cleanup(){
    abortController.abort()
  }
}, [match.params.productId])

    const imageUrl = product._id
          ? `/api/product/image/${product._id}?${new Date().getTime()}`
          : '/api/product/defaultphoto'
          
    return (
    <NoSSR>
        <div className={classes.root}>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <Card className={classes.card}>
                <CardHeader
                  title={product.name}
                  subheader={product.quantity > 0? 'In Stock': 'Out of Stock'}
                  action={
                    <span className={classes.action}>
                      <AddToCart cartStyle={classes.addCart} item={product}/>
                    </span>
                  }
                />
                <div className={classes.flex}>
                
                  <CardMedia
                    className={classes.media}
                    
                    title={product.name}
                  >

                    <img  className={classes.mobileImage} src={imageUrl}/>
                  
                  </CardMedia>

                
                  <Typography component="p" variant="subtitle1" className={classes.subheading}>
                    {product.description}<br/>
                    <span className={classes.price}>₦ {product.price}</span>
                    <Link to={'/shops/'+product.shop._id} className={classes.link}>
                      <span>
                        <Icon className={classes.icon}>shopping_basket</Icon> {product.shop.name}
                      </span>
                    </Link>
                  </Typography>

                </div>
              </Card>
            </Grid>
            {suggestions.length > 0 &&
              (<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Suggestions  products={suggestions} title='Related Products'/>
              </Grid>)}
          </Grid>
        </div>
        </NoSSR>
        )
}
