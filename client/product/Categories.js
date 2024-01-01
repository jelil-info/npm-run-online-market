import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Icon from '@material-ui/core/Icon'
import {list} from './api-product.js'
import Products from './Products'
import NoSSR from 'react-no-ssr'

const useStyles = makeStyles(theme => ({

'*': {'box-sizing': 'border-box'},
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    //justifyContent: 'space-around',
    overflow: 'hidden',
    
    background: theme.palette.background.paper,
  },
  gridList: {
    display: 'flex',
    //flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //border: '1px solid black',
    width: '700px',
    height: '64px',
   'overflow-y': 'hidden',
   'overflow-x': 'scroll',
   marginLeft: '20px'
    
  },
  tileTitle: {
    float:'left',
    verticalAlign: 'middle',
    lineHeight: 2.5,
    textAlign: 'left',
    fontSize: '1.35em',
    margin: '0 4px 0 0',
  },
  card: {
    margin: 'auto',
    marginTop: 20
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    backgroundColor: '#80808024',
    fontSize: '1.1em'
  },
  icon: {
    verticalAlign: 'sub',
    color: '#738272',
    fontSize: '0.9em',
    display: 'block',
    padding: '8px'
    
  },
  link: {
    color: '#4d6538',
    textShadow: '0px 2px 12px #ffffff',
    cursor:'pointer',
    
  }
}))

export default function Categories(props){
  const classes = useStyles()
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(props.categories[0])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list({
      category: props.categories[0]
    }).then((data) => {
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

  const listbyCategory = category => event => {
    setSelected(category)
    list({
      category: category
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }

    return (
    <NoSSR>
      <div>
        <Card className={classes.card}>
          <p type="title" className={classes.title}>
            Explore by category
          </p>
          <div className={classes.root}>
            
            <p className={classes.gridList} >
              {props.categories.map((tile, i) => (
                <span key={i} className={classes.tileTitle} style={{ backgroundColor: selected == tile? 'rgba(95, 139, 137, 0.56)':'rgba(95, 124, 139, 0.32)'}}>
                  <a className={classes.link} onClick={listbyCategory(tile)}>{tile}  <Icon className={classes.icon}>{selected == tile && 'arrow_drop_down'}</Icon></a>
                </span>
              ))}
            </p>
            
          </div>
          <Divider/>
          <Products products={products} searched={false}/>
        </Card>
      </div>
      </NoSSR>
    )
}
Categories.propTypes = {
  categories: PropTypes.array.isRequired
}
