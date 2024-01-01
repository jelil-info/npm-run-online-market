import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Icon from '@material-ui/core/Icon'
//import {list} from './api-product.js'
//import Products from './Products'
import styles from './FooterCss.module.css'
import NoSSR from 'react-no-ssr'


const useStyles = makeStyles(theme => ({


}))

export default function Footer(){
  const classes = useStyles()
  
  

    return (
    <NoSSR>
      <footer className={styles.footerCenter} >
  <a href="#home" className={styles.footerButton}><i class="fa fa-arrow-up footerRight"></i>To the top</a>
  <p>    

    <span>Developed and designed by</span>  <a className={styles.footerLast}  href="https://jelil-info.infotechcrush.com/" title="jelil-info" target="_blank" > Oyekanmi Oyetunji (jelil-info)</a><br/>
     

  </p>
  <div className={styles.footerSection}>
    <div> jelil-info's profiles in socia media:</div>
    <a href="https://github.com/jelil-info" target="_self" className={styles.footerOpacity}><i  className="fa fa-github footerOpacity"></i></a>
    <a href="https://www.linkedin.com/in/OyekanmiOyetunji/" target="_self" className={styles.footerOpacity}><i class="fa fa-linkedin footerOpacity"></i></a>
    <a href="https://www.facebook.com/oyekanmi.jalil" target="_self" className={styles.footerOpacity}><i class="fa fa-facebook-official footerOpacity"></i></a>
    <a href="https://www.instagram.com/jelil_info/" target="_self" className={styles.footerOpacity}><i class="fa fa-instagram footerOpacity"></i></a>
    <a href="https://www.twitter.com" target="_self" className={styles.footerOpacity}><i class="fa fa-twitter footerOpacity" target="_self"></i></a>
  </div>
  
  &copy; Copyright 2024
  </footer>
  </NoSSR>
    )
}


