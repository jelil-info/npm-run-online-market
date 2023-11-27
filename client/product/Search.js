import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import {list} from './api-product.js'
import Products from './Products'
//import NoSSR from 'react-no-ssr';
import NoSSR from 'react-no-ssr';


const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
   
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: '#80808024',

    "@media (max-width: 898px)": {

      marginTop: theme.spacing(8),

    },

    "@media (max-width: 558px)": {

      width: '450px',

    },

    "@media (max-width: 532px)": {

      width: '400px',

    },

    "@media (max-width: 532px)": {

      width: '350px',

    },

   "@media (max-width: 424px)": {

      width: '300px',

    },


    "@media (max-width: 370px)": {

      width: '250px',

    },

    "@media (max-width: 306px)": {

      width: '230px',

    },



    

    /*"@media (max-width: 380px)": {
      
      'display': 'flex',
      'flex-direction': 'column',
      paddingTop: '0',
      
      },*/
      

  },

  menu: {
    width: 200,
  },

  textField: {


    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 130,
    verticalAlign: 'bottom',
    marginBottom: '20px',
    margin:"normal",
    "@media (max-width: 584px)": {
      marginTop: '10px',
      //marginLeft: theme.spacing(1),
    //marginRight: theme.spacing(15),
      
      },
      "@media (max-width: 580px)": {
      
        marginLeft: theme.spacing(1),
      marginRight: theme.spacing(30),
        
        },

        "@media (max-width: 524px)": {
      
          marginLeft: theme.spacing(5),
        marginRight: theme.spacing(30),
          
          },
      /*"@media (max-width: 554px)": {
        marginLeft: theme.spacing(-43),
        
        },*/

    

      
  },

  
  MobileCategorysearchButton: {



    "@media (max-width: 584px)": {

      'display': 'flex',
      'flex-direction': 'row',
      'justify-content':'flex-end',
      'align-items':'flex-end',
      backgroundColor:'red',
      //padding: '0px'

      
      },

      "@media (max-width: 558px)": {

        width: '150px',
        marginLeft: theme.spacing(20),
    marginRight: theme.spacing(115),
  
      },

      "@media (max-width: 418px)": {

        width: '150px',
        marginLeft: theme.spacing(20),
    marginRight: theme.spacing(115),
  
      },

  },

 /* MobileCategorysearchButton: {


    
  },*/

  searchField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    marginBottom: '20px',
    "@media (max-width:584px)": {

      marginLeft: theme.spacing(-15),
      marginRight: theme.spacing(10),
      //width: '250px',
      marginBottom: '20px'
      },

     /* "@media (max-width:560px)": {

        //marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(1),
        width: 150,
        //marginBottom: '20px'
        }*/
  },
  searchButton: {
    //minWidth: '20px',
    //'width': '20px',
    height: '30px',
    padding: '0 8px',
    marginBottom: '6.5px',
    "@media (max-width: 584px)": {
      
      marginLeft: theme.spacing(-10),
      marginRight: theme.spacing(10),
     //'width': '80px',
      marginBottom: '20px',
    

      
      }

  },
  


  



}))

export default function Search(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
      category: '',
      search: '',
      results: [],
      searched: false
  })
  const handleChange = name => event => {
    setValues({
      ...values, [name]: event.target.value,
    })
  }
  const search = () => {
    if(values.search){
      list({
        search: values.search || undefined, category: values.category
      }).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setValues({...values, results: data, searched:true})
        }
      })
    }
  }
  const enterKey = (event) => {
    if(event.keyCode == 13){
      event.preventDefault()
      search()
    }
  }
    return (
    <NoSSR>
      <div>
            
        <Card className={classes.card}>
          <TextField
            id="select-category"
            select
            label="Select category"
            className={classes.textField}
            value={values.category}
            onChange={handleChange('category')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}>
            <MenuItem value="All">
              All
            </MenuItem>
            { props.categories.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <span  className={classes.MobileCategorysearchButton}  >
            
          <TextField 
            id="search"
            label="Search products"
            type="search"
            onKeyDown={enterKey}
            onChange={handleChange('search')}
            className={classes.searchField}
            margin="normal"
          />

          <Button variant="contained" color={'primary'} className={classes.searchButton}  onClick={search}>
            <SearchIcon/>
          </Button>
          </span>
          
          
          <Divider/>

          <Products products={values.results} searched={values.searched}/>
          
        </Card>
        
      </div>
      </NoSSR>
    )
}
Search.propTypes = {
  categories: PropTypes.array.isRequired
}
