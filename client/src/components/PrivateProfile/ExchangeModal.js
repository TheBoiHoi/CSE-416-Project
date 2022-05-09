import {useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
const ExchangeModal=(props)=> {
    //make request to get transaction info 
    const handleClose=()=>{
      props.setShow(false)
    }
    const [item,setItem]=useState({
      id:props.id,
      sender:'',
      receiver:'',
      date:'',
      item:'',
      itemUrl:''
    })
    return (
      <>
  
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{fontSize:'13px'}}>Exchange # {props.transid}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Transaction ID: </p>
            <p>Sender: </p>
            <p>Receiver: </p>
            <p>Date: </p> 
            <p>Item Transferred: </p>
            <a href=''>Yeezy Slides</a>
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
