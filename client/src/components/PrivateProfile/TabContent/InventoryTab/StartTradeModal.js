import {useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { TramRounded } from '@mui/icons-material'
const StartTradeModal=(props)=> {
    //make request to get transaction info 
    //props.curr_user= current user id
    //props.user=user id of the profile
    //props.item.itemId= item id
    const requestTrade=async ()=>{
        let trade=await axios.post('/user/trade/create',{
            sellerId:props.user,
            buyerId:props.curr_user,
            itemId:props.item.itemId
        })
        console.log(trade)
        props.setShow(false)
    }
    const handleClose=()=>{
      props.setShow(false)
    }
    
    console.log(props)
    return (
      <>
  
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <p >Are you sure you want to trade for </p>
            <p style={{fontWeight:'bold'}}>{props.item.name}</p>
            <p>with </p>
            <p style={{fontWeight:'bold'}}>{props.item.owner}</p>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={requestTrade}>Request Trade</Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default StartTradeModal
