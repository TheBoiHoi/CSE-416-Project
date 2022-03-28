import {Link} from "react-router-dom"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../Icons/Logo-removebg-preview.png'
import ecommerce from '../img/E-commerce.png'
import choosePNG from '../img/LandingPageSteps/choose_item.png'
import startPNG from '../img/LandingPageSteps/start_trade.png'
import confirmPNG from '../img/LandingPageSteps/confirm_trade.png'
const Welcome = (props) => {
  
  return (
    <div>
      <div style={{padding:'30px'}}class="section first-section">
        <div class="container-fluid">
          <div style={{}} class="row align-items-center">
            <div class="col-1"></div>
            <div class="col-5">
            <h1  style={{fontWeight:'bold'}}>We Verify Your Valuables So That You Don’t Have To.</h1>
            <p  style={{}}>With the use of blockchain technology, make sure the item you are buying is the real deal!</p>
            <Link to="/register" class="link-remove-outline">
              <Button size= "large" type="button"  style= {{backgroundColor:'rgb(56,213,160)'}} variant="contained">Get Started!</Button>
            </Link>
            </div>
            <div class="col-1"></div>
            <div class="col-5">
              <img src={ecommerce}></img>
            </div>
          </div>
          <div style={{}} class="row">
            <div class="text-center">
              <h1 style={{fontSize:'50px',color:'rgb(56,213,160)',fontWeight:'bold'}}>Exchange With Integrity</h1>
            </div>
          </div>
          <div class="row"  style={{backgroundColor:'rgb(100,252,217)'}} >
            <div style={{color:'white'}} align="center"  class="col ">
              <h1>Choose Item</h1>
              <img src={choosePNG}></img>
            </div>
            <div style={{color:'white'}} align="center" class="col">
              <h1>Start Trade</h1>
              <img src={startPNG}></img>
            </div>
            <div style={{color:'white'}} align="center" class="col">
              <h1>Confirm</h1>
              <img src={confirmPNG}></img>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};
export default Welcome;
