import React, {useState, useEffect}  from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import auth from '../auth/auth-helper'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
//import css from './bidContainer.css'
//import  './../styles/bidContainer.css';
//import  './bidContainer.css';
//import  './client/auction/styles.css'
//import './../client/style.css';
import  styles from  './App.module.css';
import NoSSR from 'react-no-ssr';

//const io = require('socket.io-client')
const { io } = require("socket.io-client");
const socket = io()
const useStyles = makeStyles(theme => ({
    bidHistory: {
        marginTop: '20px',
        backgroundColor: '#f3f3f3',
        padding: '16px',
        //width:'500px',
        //display:'flex',
        //'overflow':'auto',
        //'flex-wrap':'no-wrap',
        
        "@media (max-width: 638px)": {
        
            width: '350px',
            padding: '15px',
                
        },

        "@media (max-width: 633px)": {
        
            width: '400px',
            padding: '15px',
                },


        "@media (max-width: 567px)": {
        
            width: '330px',
            padding: '20px',
                
        },

        "@media (max-width: 535px)": {
        
            width: '210px',
            //padding: '25px',
            //'overflow-x': 'auto',
            //'overflow-y': 'scroll',
            
                
        },

        "@media (max-width: 377px)": {
        
            width: '150px',
            //padding: '25px',
            //'overflow-x': 'auto',
            //'overflow-y': 'scroll',
            
                
        },   

        
        "@media (max-width: 349px)": {
        
            width: '120px',
            //padding: '25px',
            //'overflow-x': 'auto',
            //'overflow-y': 'scroll',
            
                
        },        


        

        
        
        
                
    },

    /*bidContainer: {
         
        display: 'grid',
        'grid-template-columns': 'auto auto auto',
        'grid-column-gap' : '50px',
        'justify-content' : 'start'
        //padding: '10px',
        
    
    },

     

    bidContainerItem: {
         
        
        //padding: '20px',
    
    },

    bidContainer2: {
         
        display: 'grid',
        'grid-template-columns': 'auto auto auto',
        'grid-column-gap' : '10px',
        'justify-content' : 'start'
        //padding: '10px',
        
    
    },

    bidContainerItem2: {
         
        
        //padding: '20px',
    
    },*/


    divBidContainer: {
        "@media (max-width: 535px)": {
        
            //width: '500px',
            //padding: '25px',
            
            
                
        },
        
    },

    
    placeForm: {
        margin: '0px 16px 16px',
        backgroundColor: '#e7ede4',
        display: 'inline-block',
        "@media (max-width: 400px)": {
    
    
            width:170 ,
            marginLeft: -30
        
          
          },
    },
    marginInput: {
        margin: 16,
        "@media (max-width: 400px)": {
    
    
            //width:70 ,
            //marginLeft: 0
        
          
          },
    },
    marginBtn: {
        margin: '8px 16px 16px'
    },

    bidHead1: {
        "@media (max-width: 638px)": {
        
    marginLeft: '120px'
        },
    
     },
    
     bidHead2: {
        "@media (max-width: 638px)": {
        
            marginLeft: '120px'
    
        },
    
     },
    
     bidHead3: {
        "@media (max-width: 638px)": {
        
            marginLeft: '20px'
    
        },
    
     },

 bid1: {
    "@media (max-width: 638px)": {
    
        marginLeft: '520px'


        },

 },

 bid2: {
    "@media (max-width: 638px)": {
    
        marginLeft: '520px'
        },

 },

 bid2: {
    "@media (max-width: 638px)": {
    
        marginLeft: '520px'
        },

 },

 
}))

export default function Bidding (props) {
    const classes = useStyles()
    const [bid, setBid] = useState('')

    const jwt = auth.isAuthenticated()

    useEffect(() => {
        socket.emit('join auction room', {room: props.auction._id})
        return () => {
            socket.emit('leave auction room', {
              room: props.auction._id
            })
          }
    }, [])

    useEffect(() => {
        socket.on('new bid', payload => {
          props.updateBids(payload)
        })
        return () => {
            socket.off('new bid')
        }
    })
    const handleChange = event => {
        setBid(event.target.value)
    }
    const placeBid = () => {
        let newBid = {
            bid: bid,
            time: new Date(),
            bidder: jwt.user
        }
        socket.emit('new bid', {
            room: props.auction._id,
            bidInfo:  newBid
        })
        setBid('')
    }
    const minBid = props.auction.bids && props.auction.bids.length> 0 ? props.auction.bids[0].bid : props.auction.startingBid
    return(
    <NoSSR>
        <div>
            {!props.justEnded && new Date() < new Date(props.auction.bidEnd) && <div className={classes.placeForm}>
                <TextField id="bid" label="Your Bid (₦)"  
                        value={bid} onChange={handleChange} 
                        type="number" margin="normal"
                        helperText={`Enter ₦${Number(minBid)+1} or more`}
                        className={classes.marginInput}/><br/>
                <Button variant="contained" className={classes.marginBtn} color="secondary" disabled={bid < (minBid + 1)} onClick={placeBid} >Place Bid</Button><br/>
            </div>}
            <div className={classes.bidHistory}>
            
                <Typography variant="h6">All bids</Typography><br/>
                <div style={{overflow: 'auto'}}>
                    
                <div className={styles.bidContainer}>
                    <div  className={styles.bidContainerItem}>
                        <Typography variant="subtitle1" color="primary">Bid Amount</Typography>
                    </div>
                    <div className={styles.bidContainerItemBidTime}>
                        <Typography variant="subtitle1" color="primary">Bid Time</Typography>
                    </div>
                    <div  className={styles.bidContainerItemBidder}>
                        <Typography variant="subtitle1" color="primary">Bidder</Typography>
                    </div>
                </div>    
                    {props.auction.bids.map((item, index) => {
                        return <div className={styles.bidContainer2} key={index}>
                            <div className={styles.bidContainerItem2}><Typography variant="body2">₦{item.bid}</Typography></div>
                            <div className={styles.bidContainerItem2}><Typography variant="body2">{new Date(item.time).toLocaleString()}</Typography></div>
                            <div className={styles.bidContainerItem2}><Typography variant="body2">{item.bidder.name}</Typography></div>
                        </div>
                    })}
                    
                </div>
            </div>
        </div>
        </NoSSR>
    )
}
