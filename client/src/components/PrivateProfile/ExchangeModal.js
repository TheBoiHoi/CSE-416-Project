import {useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const ExchangeModal=(props)=> {
    //make request to get transaction info 
    const handleClose=()=>{
      props.setShow(false)
    }
    const navigate=useNavigate()
    const handleItemProfile=(e)=>{
      e.stopPropagation()
      navigate(`/item/profile/${props.trans.itemId}`)
  }
  console.log(props.trans)
    return (
      <>
  
        <Modal  show={props.show} onHide={handleClose}>
          <Modal.Header style={{backgroundColor:"white"}} closeButton>
            <Modal.Title style={{fontSize:'13px',color:"black"}}>Exchange # {props.trans.txid}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:"white"}}>
            <p style={{fontWeight:'bold',color:"black"}}>Item: </p>
            <a href='#' onClick={handleItemProfile}>{props.trans.item}</a> 
            <p style={{fontWeight:'bold',color:"black"}}>Item ID: </p>
            <p style={{color:"black"}}>{props.trans.itemId}</p>
            <p style={{fontWeight:'bold',color:"black"}}>Sender: </p>
            <p style={{color:"black"}}>{props.trans.senderName}</p>
            <p style={{fontWeight:'bold',color:"black"}}>Sender ID: </p>
            <p style={{color:"black"}}>{props.trans.senderId}</p>
            <p style={{fontWeight:'bold',color:"black"}}>Receiver: </p>
            <p style={{color:"black"}}>{props.trans.receiverName}</p>
            <p style={{fontWeight:'bold',color:"black"}}>Receiver ID: </p>
            <p style={{color:"black"}}>{props.trans.receiverId}</p>
            <p style={{fontWeight:'bold',color:"black"}}>Date: </p> 
            <p style={{color:"black"}}>{props.trans.date}</p>
            
          </Modal.Body>
          <Modal.Footer style={{backgroundColor:"white"}}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default ExchangeModal
