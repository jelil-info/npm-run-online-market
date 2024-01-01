import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Suggestions from './../product/Suggestions'
import Suggestions2 from './../product/Suggestions2'
import {listLatest, listCategories} from './../product/api-product.js'
import Search from './../product/Search'
import Categories from './../product/Categories'
import { useRef } from 'react';


import NoSSR from 'react-no-ssr';


const useStyles = makeStyles(theme => ({
  root: {
    //flexGrow: 1,
    margin: 30,
    'box-sizing': 'border-box',
    
      /*height: '100vh',
      backgroundColor: 'blue',
      [theme.breakpoints.up('sm')]: {
        backgroundColor: 'red',
      },
      [theme.breakpoints.up('md')]: {
        backgroundColor: 'green',
      },
      [theme.breakpoints.up('lg')]: {
        backgroundColor: 'orange',
      },
      [theme.breakpoints.up('xl')]: {
        backgroundColor: 'cyan',
      },*/
    },
  }
))




export default function Home(){

  const windowSize = useRef([0, 0]);

  useEffect(() => {
    windowSize.current = [window.innerWidth, window.innerHeight];
  }, []);




  const classes = useStyles()
  const [suggestionTitle, setSuggestionTitle] = useState("Latest Products")
  const [categories, setCategories] = useState([])
  const [suggestions, setSuggestions] = useState([])
  
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listLatest(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setSuggestions(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listCategories(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategories(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function (event) {
      var scrollpos = sessionStorage.getItem('scrollpos');
      if (scrollpos) {
          window.scrollTo(0, scrollpos);
          sessionStorage.removeItem('scrollpos');
      }
  });

  window.addEventListener("beforeunload", function (e) {
      sessionStorage.setItem('scrollpos', window.scrollY);
  });  
  }, []);

  /*useEffect(() => {
    const setScroll = () => {
        window.onscroll = (e) => {
            console.log("scrole r", window.scrollY);
            window.scrollY > 12 ? localStorage.setItem("scroll_posistion", window.scrollY) : false;
        };
    }
    let pos = localStorage.getItem("scroll_posistion");
    window.scrollTo(0, pos);
    window.addEventListener('scroll', setScroll);
    // Don't forget to clean up the event listener when the component unmounts
    return () => {
        window.removeEventListener('scroll', setScroll);
    };
}, [0]);*/

    return (
      <div className={classes.root}>
        
        <NoSSR>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Search categories={categories}/>
            <Categories categories={categories}/>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Suggestions products={suggestions} title={suggestionTitle}/>
            {/*<Suggestions2 products={suggestions} title={suggestionTitle}/>*/}
          </Grid>
        </Grid>
        
        
        </NoSSR>
        <div>
      {/*<h2>Width: {windowSize.current[0]}</h2>*/}

    {/*<h2>Height: {windowSize.current[1]}</h2>*/}
    </div>
      </div>
    )
}


