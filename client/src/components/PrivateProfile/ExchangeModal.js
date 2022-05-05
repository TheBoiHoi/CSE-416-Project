import {useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
const ExchangeModal=(props)=> {
    //make request to get transaction info 
    const handleClose=()=>{
      props.setShow(false)
    }
    return (
      <>
  
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{fontSize:'13px'}}>Exchange # {props.transid}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default ExchangeModal
