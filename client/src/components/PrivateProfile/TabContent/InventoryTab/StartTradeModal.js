import {useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const StartTradeModal=(props)=> {
    //make request to get transaction info 
    const handleClose=()=>{
      props.setShow(false)
    }
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
          <Button variant="primary" onClick={handleClose}>Request Trade</Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default StartTradeModal
