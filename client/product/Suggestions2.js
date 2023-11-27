//import React from 'react'
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import ViewIcon from '@material-ui/icons/Visibility'
import Icon from '@material-ui/core/Icon'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import AddToCart from './../cart/AddToCart'
//import { useState } from 'react';
//import { makeStyles } from '@material-ui/styles';
//import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
//import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
//import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
//import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import PersonIcon from '@material-ui/icons/Person';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

//import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import ImageList from '@material-ui/core/ImageList';
//import { ImageList } from '@material-ui/core';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
//import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
//import itemData from './itemData';
import NoSSR from 'react-no-ssr'

const useStyles = makeStyles(theme => ({

  


  mobileRoot: {

    padding: '10px',
    //paddingBottom: 24,
    backgroundColor: 'yellow',
    display: 'flex',
    //flexWrap: 'wrap',
    //justifyContent: 'space-around',
    flexWrap: 'nowrap',
    'overflow-x': 'scroll',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    //overflow: 'hidden',

    //'width':'700px',
    "@media (min-width: 957px)": {

      'display': 'none'
    },

  },

  

  

mobileTitle: {

    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: 'red',
    fontSize: '1.1em',
    display: 'block',
    "@media (min-width: 957px)": {

      'display': 'none'
    },
  },





  
  

  
  

  mobileViewButton: {
    verticalAlign: 'middle',
    color:'blue'
  },

  

  
  mobileCard: {
    margin: '10px',
    //maxWidth: 300,
    backgroundColor:'white',
    width: '300px',
    height: '280px',
    textAlign: 'center'
    //'width':'700px',
    // width: '100%',
    //display: 'inline-flex',
    //flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    //transform: 'translateZ(0)',
  },

  

  mobileDetails: {
    display: 'inline-block',
    width: "100%",
    backgroundColor:'orange',
    float:'left'
  },

  
  mobileContent: {
    //flex: '1 0 auto',
    //padding: '16px 8px 0px'
    backgroundColor:'aqua'
  },

  
  mobileCover: {
    backgroundColor:'red',
    //width: '65%',
    //height: 130,
    width:'280px',
    height: '200px',
    margin: '8px' ,
  },

  
  mobileControls: {
    //marginTop: '8px',
    padding:0,
    //backgroundColor:'gray',
  },

  

  mobileDate: {
    color: 'rgba(0, 0, 0, 0.4)',
    display:'inline',
    color:'wheat'
  },

  

  mobileIcon: {
    verticalAlign: 'sub',
    color:'teal'
  },

  

  mobileIconButton: {
    width: '28px',
    height: '28px',
    color:'navy'
  },

  
  mobileProductTitle: {
    fontSize: '1.15em',
    marginBottom: '5px',
    color:'brown'
  },

  

  mobileSubheading: {
    //color: 'rgba(88, 114, 128, 0.67)'
    color:'green'
  },

  
  mobileActions: {
    float: 'right',
    marginRight: '6px',
    color:'orchid'
  },

  

  mobilePrice: {
    display: 'inline',
    lineHeight: '3',
    paddingLeft: '8px',
    color: theme.palette.text.secondary
  },

 /* expand: {
    marginLeft: 'auto'
  },*/

   rootImage: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '10px', 
    marginTop: '100px', 
   
    "@media (min-width: 911px)": {

      'display': 'none'
    },

  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleImage: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },


/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */






















}));

/*const ExpandIcon = ({ expanded }) =>
  expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;*/

export default function Suggestions(props) {
  const classes = useStyles();
  //const [expanded, setExpanded] = useState(false);
  /*const toggleExpanded = () => {
    setExpanded(!expanded);
  };*/

  
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Define the screen width at which you want the component to appear/disappear
      const screenWidthThreshold = 1000; // Change this value as needed

      if (window.innerWidth > screenWidthThreshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Add a resize event listener to update the visibility on window resize
    window.addEventListener('resize', handleResize);

    // Initial check for visibility
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  

  



  return (
  <NoSSR>
  <div>

    <Typography type="title" className={classes.mobileTitle}>
      {props.title}
    </Typography>

    {isVisible && <Paper className={classes.mobileRoot} elevation={4}>

      {props.products.map((item, i) => {
        return <span style={{ 'color': 'white' }} key={i}>


          <Card className={classes.mobileCard}>

          

            <Typography component="p" className={classes.mobileDate}>
                  Added on this {(new Date(item.created)).toDateString()}
            </Typography>


            <CardMedia style={{'text-align': 'center'}} 
              className={classes.mobileCover}
              image={'/api/product/image/' + item._id}
              
            />


            <List 
            
            orientation="horizontal"
      variant="outlined"
      sx={{
        //flexGrow: 0,
        //mx: 'auto',
        //'--ListItemDecorator-size': '0px',
        //'--ListItem-paddingY': '3rem',
        //'--ListItemWidth': '15px',
        //'--ListItemHeight': '15px',
        //borderRadius: 'sm',
        //padding:'-24px',
        //marginTop: '30px',
        width:'500px',
        height:'50px'
      }}
            
            
            
            
            >
              
              <ListItem >

              

              <ListItemDecorator>

                <Link to={'/product/' + item._id}>
                  <Typography variant="h3" component="h3" 
                  className={classes.mobileProductTitle} color="primary">{item.name}
                  </Typography>
                </Link>

                <ListDivider inset="gutter" /> 

                <Link to={'/shops/' + item.shop._id}>

                  <Typography type="subheading" className={classes.mobileSubheading}>
                    <Icon className={classes.icon}>shopping_basket</Icon> {item.shop.name}
                  </Typography>
                </Link>
                
                


              
                <ListDivider inset="gutter" />

              <div className={classes.mobileControls}>

                <Typography type="subheading" component="h3" className={classes.mobilePrice} color="primary">
                ₦ {item.price}
                </Typography>

                

                <span className={classes.mobileActions}>
                  <Link to={'/product/' + item._id}>
                    <IconButton color="secondary" dense="dense">
                      <ViewIcon className={classes.mobileIconButton} />
                    </IconButton>
                  </Link>
                  <AddToCart item={item} />
                </span>
              </div>


              </ListItemDecorator>

                

</ListItem>

            </List>


            

          </Card>

          


          
                     
          
        </span>




      })
      }


      
    </Paper>}

    
    
    {/*<div className={classes.rootImage}>
      <ImageList className={classes.imageList} cols={3}>
        {props.products.map((item,i) => (
          
          <ImageListItem >
            <CardMedia
              className={classes.mobileCover}
              image={'/api/product/image/' + item._id}
              
            />
            <ImageListItemBar
              
              title={item.name}
               actionIcon={
                <IconButton aria-label={`star ${item.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
            </div>*/}
    



    {/*<List 
      orientation="horizontal"
      variant="outlined"
      sx={{
        //flexGrow: 0,
        //mx: 'auto',
        '--ListItemDecorator-size': '0px',
        //'--ListItem-paddingY': '3rem',
        '--ListItemWidth': '15px',
        '--ListItemHeight': '15px',
        //borderRadius: 'sm',
        padding:'-24px',
        marginTop: '30px',
        width:'500px',
        height:'50px'
      }}
    >

      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/1.jpg" />
        </ListItemDecorator>
        Mabel Boyle
      </ListItem>

      <ListDivider inset="gutter" />

      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/2.jpg" />
        </ListItemDecorator>
        Boyd Burt
      </ListItem>

      <ListDivider inset="gutter" />

      <ListItem>
        <ListItemDecorator>
          <Avatar size="sm" src="/static/images/avatar/3.jpg" />
        </ListItemDecorator>
        Adam Tris
      </ListItem>

    </List>*/}

    

  </div>

</NoSSR>

  )
}

Suggestions.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}
