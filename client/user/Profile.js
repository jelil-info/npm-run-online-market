import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import { read } from './api-user.js'
import { Redirect, Link } from 'react-router-dom'
import config from './../../config/config'
import stripeButton from './../assets/images/stripeButton.png'
import MyOrders from './../order/MyOrders'
import Auctions from './../auction/Auctions'
import { listByBidder } from './../auction/api-auction.js'
import NoSSR from 'react-no-ssr'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    "@media (max-width: 886px)": {
    
      marginTop: '100px',
      
      },
      "@media (max-width: 670px)": {
    
        marginTop: '100px',
        //margin: '50px',
        paddingLeft: '-5px',
        paddingRight: '-5px',
        width: '350px'
        },

        "@media (max-width: 382px)": {
    
          
          //margin: '50px',
          paddingLeft: '55px',
          paddingRight: '55px',
          width: '300px'
          },

          "@media (max-width: 368px)": {
    
          
            //margin: '50px',
            marginLeft: '-50px',
          
            },


  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    "@media (max-width: 390px)": {
    
    
      marginTop: '-10px',

    }
  },



  Imagestripe: {
    "@media (max-width: 662px)": {
    
    
        //marginTop: '-300px',
    
    

}
  },

  profile: {


    "@media (max-width: 390px)": {
    
    
      marginTop: '-100px',
  
  },

  },

  avatarList: {

    "@media (max-width: 390px)": {
    
    
      marginTop: '-80px',
  
  },

},

  gmailName: {
    "@media (max-width: 390px)": {
    
      marginLeft: -70
      //marginRight: '-1000px',

    }

},

profileList: {

  
    "@media (max-width: 390px)": {
    
      
    //marginLeft: -25

    

},
},


  
  stripe_connect: {
    marginLeft: '30px',
    //marginTop: '110px',
  },
  stripe_connected: {
    verticalAlign: 'super',
    marginRight: '10px',
    marginTop: '100px'
  },
  auctions: {
    maxWidth: 600,
    margin: '24px',
    padding: theme.spacing(3),
    backgroundColor: '#3f3f3f0d'
  },
  myProfileFlex: {
    
    "@media (max-width: 662px)": {
    
    
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    //justifyContent: 'flexStart',
    alignItems: 'stretch',
    overflow: 'hidden',
    backgroundColor: 'brown',
    //padding: '10px', 
    //marginTop: '20px',
    marginLeft: 100,
    
    //width:'10px' 

  
  },

  

  }
}))

export default function Profile({ match }) {
  const classes = useStyles()
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listByBidder({
      userId: match.params.userId
    }, { t: jwt.token }, signal).then((data) => {
      if (data.error) {
        setRedirectToSignin(true)
      } else {
        setAuctions(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const removeAuction = (auction) => {
    const updatedAuctions = [...auctions]
    const index = updatedAuctions.indexOf(auction)
    updatedAuctions.splice(index, 1)
    setAuctions(updatedAuctions)
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      userId: match.params.userId
    }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }

  }, [match.params.userId])

  if (redirectToSignin) {
    return <Redirect to='/signin' />
  }
  return (
  <NoSSR>
    <Paper className={classes.root} elevation={4}>

      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List className={classes.profileList} dense>
        <ListItem>
          <ListItemAvatar className={classes.avatarList}>

            <Avatar>
              <Person />
            </Avatar>


          </ListItemAvatar>
          <ListItemText  className={classes.gmailName}  primary={user.name} secondary={user.email} > </ListItemText>{
            auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
            (<ListItemSecondaryAction >
              {user.seller &&
                (user.stripe_seller
                  ? (<Button variant="contained" disabled className={classes.stripe_connected}>
                    Stripe connected
                  </Button>)
                  : (<a href={"https://connect.stripe.com/oauth/authorize?response_type=code&client_id=" + config.stripe_connect_test_client_id + "&scope=read_write"} className={classes.stripe_connect}>
                    <img  className={classes.Imagestripe} src={stripeButton} />
                  </a>)
                )
              }
              <div className={classes.myProfileFlex}>
              <Link  to={"/user/edit/" + user._id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteUser userId={user._id} />
              </div>
            </ListItemSecondaryAction>)
          }
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={"Joined: " + (
            new Date(user.created)).toDateString()} />
        </ListItem>
      </List>
      <MyOrders />
      <Paper className={classes.auctions} elevation={4}>
        <Typography type="title" color="primary">
          Auctions you bid in
        </Typography>
        <Auctions auctions={auctions} removeAuction={removeAuction} />
      </Paper>
    </Paper>
    </NoSSR>
  )
}
