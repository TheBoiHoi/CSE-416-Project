import {Link,Navigate} from "react-router-dom"
import * as React from 'react';
import Button from '@mui/material/Button';
import {Table,Row,Col} from 'react-bootstrap'
import ecommerce from '../img/E-commerce.png'
import choosePNG from '../img/LandingPageSteps2/landing_pic1.PNG'
import startPNG from '../img/LandingPageSteps2/landing_pic2.PNG'
import startPNG2 from '../img/LandingPageSteps2/landing_pic3.PNG'
import confirmPNG from '../img/LandingPageSteps2/landing_pic4.PNG'
const Welcome = (props) => {
  if(props.user){
    return (
      props.user.isCompany?<Navigate to='/inventory-table'/> :<Navigate to='/profile'/>
    )
    
  }
  else{
    return (

      <div style={{overflow:'auto'}}>
        <div style={{padding:'30px',overflow:'auto'}} class="section first-section">
          <div class="container-fluid">
            <Row className="align-items-center">
              <Col lg="1"></Col>
              <Col lg="5">
              <h1  style={{fontWeight:'bold'}}>We Verify Your Valuables So That You Don’t Have To.</h1>
              <p  style={{}}>With the use of blockchain technology, make sure the item you are buying is the real deal!</p>
              <Link to="/register" class="link-remove-outline">
                <Button size= "large" type="button"  style= {{backgroundColor:'rgb(56,213,160)'}} variant="contained">Get Started!</Button>
              </Link>
              </Col>
              <div class="col-1"></div>
              <div class="col-5">
                <img src={ecommerce}></img>
              </div>
            </Row>
            <Row style={{}} >
              <div className="text-center">
                <h1 style={{fontSize:'50px',color:'rgb(56,213,160)',fontWeight:'bold'}}>Exchange With Integrity</h1>
              </div>
            </Row>
            <Row  style={{backgroundColor:'rgb(100,252,217)'}} >
              <Col style={{color:'white'}} align="center" >
                <h1>Choose Item</h1>
                <img style={{width:'55%'}} src={choosePNG}></img>
              </Col>
              <Col style={{color:'white'}} align="center">
                <h1>Start Trade</h1>
                <img src={startPNG2}></img>
              </Col>
              <Col style={{color:'white'}} align="center">
                <h1>Confirm</h1>
                <img style={{width:'100%'}} src={confirmPNG}></img>
              </Col>
            </Row>
          </div>
        </div> 
      </div>
    );
  };
}
export default Welcome;
