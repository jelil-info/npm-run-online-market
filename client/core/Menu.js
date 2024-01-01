import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import HomeIcon from '@material-ui/icons/Home'
import auth from './../auth/auth-helper'
import { withRouter } from 'react-router-dom'
import CartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import cart from './../cart/cart-helper'
import { useHistory } from "react-router"
import MenuIcon from "@material-ui/icons/Menu"
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import NoSSR from 'react-no-ssr';










/*const headersData = [
  {
    label: "Listings",
    href: "/",
  },
  {
    label: "Mentors",
    href: "/mentors",
  },
  {
    label: "My Account",
    href: "/account",
  },
  {
    label: "Log Out",
    href: "/logout",
  },
];*/


const useStylesCustom = makeStyles(theme => ({
  header: {
    //backgroundColor: "#400CCC",
    //paddingRight: "79px",
    //addingLeft: "118px",
    /*"@media (max-width: 900px)": {
      paddingLeft: 0,
    },*/
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
    textAlign: "left",
    backgroundColor: theme.palette.primary.main,
    width: '200px',
    height: '600px'
  },
  personalFeatures: {

    'right': "30px",
    "@media (min-width: 906px)": {
      right: "-0px",
    },

  },



  mobileSpace: {


    //backgroundColor: theme.palette.secondary.main,
    //width: '200px'

  },

  personalFeaturesMobile1: {
    'width': '400px',
    'marginLeft': '-17px',

    'float': 'left',
    "@media (max-width: 403px)": {

      backgroundColor: 'brown',





    },
  },





  personalFeaturesMobile2: {
    //'width':'500px',
    //"padding":"10px",
    'right': "30px",
    'float': 'left',
    marginTop: "7px",
    position: 'absolute',
    marginRight: '-30px',

    "@media (max-width: 452px)": {
      backgroundColor: '#333',
      'marginRight': '-80px',


      // whiteSpace: 'nowrap'
    },

    /*"@media (max-width: 362px)": {
      backgroundColor: '#333',
      'marginRight': '-270px',


      // whiteSpace: 'nowrap'
    },*/

    "@media (max-width: 350px)": {
      backgroundColor: '#333',
      'marginRight': '-130px',


      // whiteSpace: 'nowrap'
    },


    /*"@media (max-width: 276px)": {
      backgroundColor: '#333',
      'marginRight': '-220px',


      // whiteSpace: 'nowrap'
    },*/

    //backgroundcolor: "yellow",
    //marginTop: "138px",
    //color:"green"
  },


  personalFeaturesMobile2Signup: {
    //marginRight:'480px',
    //'width':'790px',


    "@media (max-width: 298px)": {


      'width': '190px',
      //'display': 'inline-block',
      'border': '1px solid red',

      backgroundColor: 'blue',
    },






  },

  hello: {
    display: "block",
    color: "pink",
    fontWeight: "bold",
    fontSize: "10px",
    whiteSpace: "nowrap",
    width: '200px',
    overflow: 'hidden',
    textOverflow: "ellipsis",
    //verticalAlign: "super"
 },




  closeButton: {

    position: "absolute",
    top: "-30px",
    right: "-22px",
    width: "100px",
    marginRight: "-27px",
    /*border: 3px solid #73AD21;*/

    /*margin-left: 15px;*/
    color: 'white',
    /*font-weight: bold;*/
    /*float: right;*/
    fontSize: '50px',
    lineHeight: '20px',
    cursor: 'pointer',
    transition: '0.3s',


  },



  panelDetails: {
    //flexDirection: 'column',
    //height: 60,
    'overflow-x': 'scroll',
    alignSelf: 'center',
    toolbarMargin: theme.mixins.toolbar
  },

  
  toolbarMargin: theme.mixins.toolbar


}));



function Header() {


  



  const { header, logo, menuButton, toolbar, drawerContainer, personalFeatures, personalFeaturesMobile2, mobileSpace,
    closeButton, panelDetails, personalFeaturesMobile1, personalFeaturesMobile2Signup, toolbarMargin, hello } = useStylesCustom();



  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });


  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {

    const history = useHistory();



    return (
   <NoSSR>
      <Toolbar className={toolbarMargin}>

        {DesktopMenu()}
        
      </Toolbar>
      
  </NoSSR>

    );
  };

  const displayMobile = () => {

    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));

    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
  <NoSSR>
      <AppBar position="fixed" className={panelDetails}>
        <Toolbar >

          <IconButton

            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",

              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>


          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div className={drawerContainer}>




              <p className={closeButton} {...{ onClick: handleDrawerClose, }}> &times;</p>






              {MobileMenu()}



            </div>




          </Drawer>


          <div>{DesktopMobileMenu()}</div>





        </Toolbar>
      </AppBar>
      </NoSSR>
    );
  };


  const isActive = (history, path) => {
    if (history.location.pathname == path)
      return { color: '#bef67a' }
    else
      return { color: '#ffffff' }
  }
  const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path))
      return { color: '#bef67a' }
    else
      return { color: '#ffffff' }
  }
  const DesktopMenu = () => {
    const history = useHistory();

    return (
    <NoSSR>
      <AppBar position="fixed">

        <Toolbar>


          <Typography variant="h6" color="inherit">
            suoku
          </Typography>

          <div>

            <Link {...{ component: RouterLink, to: "/", }}>

              <IconButton aria-label="Home" style={isActive(history, "/")}>
                <HomeIcon />
              </IconButton>

            </Link>

            <Link  {...{ component: RouterLink, to: "/shops/all" }}>
              <Button style={isActive(history, "/shops/all")}>All Shops</Button>
            </Link>

            <Link  {...{ component: RouterLink, to: "/auctions/all" }}>
              <Button style={isActive(history, "/auctions/all")}>All Auctions</Button>
            </Link>

            <Link {...{ component: RouterLink, to: "/cart" }}>
              <Button style={isActive(history, "/cart")}>
                Cart
                <Badge invisible={false} color="secondary" badgeContent={cart.itemTotal()} style={{ 'marginLeft': '7px' }}>
                  <CartIcon />
                </Badge>
              </Button>
            </Link>
          </div>

          <div className={personalFeatures} style={{ 'position': 'absolute', }}>
            <span style={{ 'float': 'right' }}>
              {
                !auth.isAuthenticated() && (<span>
                  <Link {...{ component: RouterLink, to: "/signup" }}>
                    <Button style={isActive(history, "/signup")}>Sign up
                    </Button>
                  </Link>

                  <Link {...{ component: RouterLink, to: "/signin" }}>
                    <Button style={isActive(history, "/signin")}>Sign In
                    </Button>
                  </Link>
                </span>)
              }

              {
                auth.isAuthenticated() && (<span>

                  <span className={hello} style={{ color: "red", fontWeight: "bold", fontSize: "13px", }}>
                      Hello, {auth.isAuthenticated().user.name}
                  </span>
                  
                  {auth.isAuthenticated().user.seller && (<>
                    
                    <Link {...{ component: RouterLink, to: "/seller/shops" }}>

                      <Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>

                    <Link {...{ component: RouterLink, to: "/myauctions" }}>

                      <Button style={isPartActive(history, "/myauctions")}>My Auctions</Button>

                    </Link>
                  </>
                  )}

                  <Link {...{ component: RouterLink, to: "/user/" + auth.isAuthenticated().user._id }}>

                    <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                      MY PROFILE
                    </Button>


                  </Link>



                  <Button color="inherit" onClick={() => {
                    auth.clearJWT(() => history.push('/'))
                  }}>
                    Sign out
                  </Button>

                </span>
                )
              }

            </span>
          </div>
        </Toolbar>
      </AppBar>
      </NoSSR>
    )
  }


  const isActive2 = (history, path) => {
    if (history.location.pathname == path)
      return { color: '#bef67a' }
    else
      return { color: '#ffffff' }
  }
  const isPartActive2 = (history, path) => {
    if (history.location.pathname.includes(path))
      return { color: '#bef67a' }
    else
      return { color: '#ffffff' }
  }

  const MobileMenu = () => {
    const history = useHistory();

    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (


      
<NoSSR>
      <div position="fixed" className={mobileSpace}>



        <div>

          <Link target="_self" style={{ 'display': 'block', 'marginTop': '50px', 'marginLeft': '-2px' }} {...{
            component: RouterLink, to: "/",
            onClick: handleDrawerClose,
          }}>

            <IconButton aria-label="Home" style={isActive2(history, "/")}>
              <HomeIcon />
              <Typography variant="h6" style={{ 'marginLeft': '25px', }}>
                suok
              </Typography>
            </IconButton>

          </Link>

          <Link style={{ 'display': 'block' }} {...{
            component: RouterLink, to: "/shops/all",
            onClick: handleDrawerClose,
          }}>
            <Button style={isActive2(history, "/shops/all")}>All Shops</Button>
          </Link>

          <Link style={{ 'display': 'block' }} {...{
            component: RouterLink, to: "/auctions/all",
            onClick: handleDrawerClose,
          }}>
            <Button style={isActive2(history, "/auctions/all")}>All Auctions</Button>
          </Link>

          <Link style={{ 'display': 'block' }} {...{
            component: RouterLink, to: "/cart",
            onClick: handleDrawerClose,
          }}>
            <Button style={isActive2(history, "/cart")}>
              Cart
              <Badge invisible={false} color="secondary" badgeContent={cart.itemTotal()} style={{ 'marginLeft': '7px' }}>
                <CartIcon />
              </Badge>
            </Button>
          </Link>
        </div>

        <div style={{ 'marginTop': '30px' }}>
          <span>
            {
              !auth.isAuthenticated() && (<span>
                <Link style={{ 'display': 'block' }} {...{
                  component: RouterLink, to: "/signup",
                  onClick: handleDrawerClose,
                }}>
                  <Button style={isActive2(history, "/signup")}>Sign up
                  </Button>
                </Link>

                <Link style={{ 'display': 'block' }} {...{
                  component: RouterLink, to: "/signin",
                  onClick: handleDrawerClose,
                }}>
                  <Button style={isActive2(history, "/signin")}>Sign In
                  </Button>
                </Link>
              </span>)
            }

            {
              auth.isAuthenticated() && (<span>
                <Typography variant="h6" className={hello}
                  style={{
                    color: "red", fontWeight: "bold", fontSize: "16px", 'display': 'block',
                    'marginLeft': '9px'
                  }}>
                  Hello, {auth.isAuthenticated().user.name}
                </Typography>
                {auth.isAuthenticated().user.seller && (<>
                  <Link style={{ 'display': 'block' }} {...{
                    component: RouterLink, to: "/seller/shops",
                    onClick: handleDrawerClose,
                  }}>

                    <Button style={isPartActive2(history, "/seller/")}>My Shops</Button></Link>

                  <Link style={{ 'display': 'block' }} {...{
                    component: RouterLink, to: "/myauctions",
                    onClick: handleDrawerClose,
                  }}>

                    <Button style={isPartActive2(history, "/myauctions")}>My Auctions</Button>

                  </Link>
                </>
                )}

                <Link style={{ 'display': 'block' }} {...{
                  component: RouterLink,
                  to: "/user/" + auth.isAuthenticated().user._id, onClick: handleDrawerClose,
                }}>

                  <Button style={isActive2(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>

                </Link>

                <Link  {...{ component: RouterLink, onClick: handleDrawerClose, }}>

                  <Button style={{ 'display': 'block', 'color': 'white' }} onClick={() => {
                    auth.clearJWT(() => history.push('/'))
                  }} >
                    Sign out
                  </Button>

                </Link>

              </span>
              )
            }

          </span>

            
        </div>
      </div>
      </NoSSR>
    )
  }


  const isActive3 = (history, path) => {
    if (history.location.pathname == path)
      return { color: '#bef67a' }
    else
      return { color: '#ffffff' }
  }
  const isPartActive3 = (history, path) => {
    if (history.location.pathname.includes(path))
      return { color: '#bef67a' }
    else
      return { color: '#ffffff' }
  }
  const DesktopMobileMenu = () => {
    const history = useHistory();

    return (


<NoSSR>

      <div>

        <div className={personalFeaturesMobile1}>
          <Link {...{ component: RouterLink, to: "/", }}>

            <IconButton aria-label="Home" style={isActive(history, "/")}>
              <HomeIcon />
              suok

            </IconButton>

          </Link>
          <Link {...{ component: RouterLink, to: "/cart" }} style={{ 'marginLeft': '-12px' }}>
            <Button style={isActive(history, "/cart")}>
              Cart
              <Badge invisible={false} color="secondary" badgeContent={cart.itemTotal()} style={{ 'marginLeft': '2px' }}>
                <CartIcon />
              </Badge>
            </Button>
          </Link>

          {
            !auth.isAuthenticated() && (<span className={personalFeaturesMobile2Signup}>
              <Link  {...{ component: RouterLink, to: "/signup" }}>
                <Button style={isActive3(history, "/signup")}>Sign up
                </Button>
              </Link>

              <Link {...{ component: RouterLink, to: "/signin" }}>
                <Button style={isActive3(history, "/signin")}>
                  Sign In
                </Button>
              </Link>
            </span>)
          }


        </div>



        <div className={personalFeaturesMobile2}>





          <span>

            {
              auth.isAuthenticated() && (<span>

                <span className={hello}>
                  Hello, {auth.isAuthenticated().user.name} 
                </span>



                <Link  {...{ component: RouterLink, to: "/user/" + auth.isAuthenticated().user._id }}>

                  <Button style={isActive3(history, "/user/" + auth.isAuthenticated().user._id)}>
                    MY PROFILE
                  </Button>

                </Link>



                <Button color="inherit" onClick={() => {
                  auth.clearJWT(() => history.push('/'))
                }}>
                  Sign out
                </Button>




              </span>

              )
            }

          </span>
        </div>







      </div>

</NoSSR>






    )
  }





  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Femmecubator
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
<NoSSR>
<div>

      {mobileView ? displayMobile() : displayDesktop()}

    </div>
    </NoSSR>
  );
}

export default withRouter(Header);
