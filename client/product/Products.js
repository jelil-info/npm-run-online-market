import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import {Link} from 'react-router-dom'
import AddToCart from './../cart/AddToCart'
import NoSSR from 'react-no-ssr'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '0 8px'
  },
  container: {
    minWidth: '100%',
    paddingBottom: '14px'
  },

  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px',
    "@media (max-width: 956px)": {

      'display': 'none'

    },
  },
  
  mobileGridList1: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px',
    "@media (max-width: 824px)": {

      'display': 'none'
    },

    "@media (min-width: 956px)": {

      'display': 'none'
    },

  },

  mobileGridList2: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px',
    "@media (min-width: 824px)": {

      'display': 'none'
    },
  },

  
    title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%'
  },
  tile: {
    textAlign: 'center'
  },
  image: {
  width: '50%',
  height: '100%',
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left'
  },
  tileTitle: {
    fontSize:'1.1em',
    marginBottom:'5px',
    color:'rgb(189, 222, 219)',
    display:'block'
  }
}))

export default function Products(props){
  const classes = useStyles()
    return (
    <NoSSR>
      <div className={classes.root}>
      {props.products.length > 0 ?
        (<div className={classes.container}>
          <GridList cellHeight={200} className={classes.gridList} cols={4}>
          {props.products.map((product, i) => (
            <GridListTile key={i} className={classes.tile}>
              <Link style={{'text-align': 'center'}}  to={"/product/"+product._id}><img className={classes.image} src={'/api/product/image/'+product._id}  alt={product.name} /></Link>
              <GridListTileBar className={classes.tileBar}
                title={<Link to={"/product/"+product._id} className={classes.tileTitle}>{product.name}</Link>}
                subtitle={<span>$ {product.price}</span>}
                actionIcon={
                  <AddToCart item={product}/>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        
        <GridList cellHeight={200} className={classes.mobileGridList1} cols={3}>
          {props.products.map((product, i) => (
            <GridListTile key={i} className={classes.tile}>
              <Link style={{'text-align': 'center'}}  to={"/product/"+product._id}><img className={classes.image} src={'/api/product/image/'+product._id}  alt={product.name} /></Link>
              <GridListTileBar className={classes.tileBar}
                title={<Link to={"/product/"+product._id} className={classes.tileTitle}>{product.name}</Link>}
                subtitle={<span>$ {product.price}</span>}
                actionIcon={
                  <AddToCart item={product}/>
                }
              />
            </GridListTile>
          ))}
        </GridList>


        <GridList cellHeight={200} className={classes.mobileGridList2} cols={2}>
          {props.products.map((product, i) => (
            <GridListTile key={i} className={classes.tile}>
              <Link style={{'text-align': 'center'}}  to={"/product/"+product._id}><img className={classes.image} src={'/api/product/image/'+product._id}  alt={product.name} /></Link>
              <GridListTileBar className={classes.tileBar}
                title={<Link to={"/product/"+product._id} className={classes.tileTitle}>{product.name}</Link>}
                subtitle={<span>$ {product.price}</span>}
                actionIcon={
                  <AddToCart item={product}/>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        
        

        

        
        </div>) : props.searched && (<Typography variant="subheading" component="h4" className={classes.title}>No products found! </Typography>)}
      </div>
      </NoSSR>
      )
}
Products.propTypes = {
  products: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired
}
