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

    return (
      <>
  
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{fontSize:'13px'}}>Exchange # {props.transid}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{fontWeight:'bold'}}>Transaction ID: </p>
            <p>{props.trans.txid}</p>
            <p style={{fontWeight:'bold'}}>Sender: </p>
            <p>{props.trans.senderName}</p>
            <p style={{fontWeight:'bold'}}>Sender ID: </p>
            <p>{props.trans.senderId}</p>
            <p style={{fontWeight:'bold'}}>Receiver: </p>
            <p>{props.trans.receiverName}</p>
            <p style={{fontWeight:'bold'}}>Receiver ID: </p>
            <p>{props.trans.receiverId}</p>
            <p style={{fontWeight:'bold'}}>Date: </p> 
            <p>{props.trans.date}</p>
            <p>Item Transferred: </p>
            <a href='#' onClick={handleItemProfile}>{props.trans.item}</a> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default ExchangeModal
