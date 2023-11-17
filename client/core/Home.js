import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Suggestions from './../product/Suggestions'
import {listLatest, listCategories} from './../product/api-product.js'
import Search from './../product/Search'
import Categories from './../product/Categories'
import { useRef } from 'react';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
    
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

    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Search categories={categories}/>
            <Categories categories={categories}/>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Suggestions products={suggestions} title={suggestionTitle}/>
          </Grid>
        </Grid>
        <div>
      <h2>Width: {windowSize.current[0]}</h2>

      <h2>Height: {windowSize.current[1]}</h2>
    </div>
      </div>
    )
}


