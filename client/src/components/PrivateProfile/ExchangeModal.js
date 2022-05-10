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
      senderId:'',
      receiver:'',
      receiverId:'',
      item:'',
      itemId:'',
      itemUrl:'',
      date:'',
      
    })
    return (
      <>
  
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{fontSize:'13px'}}>Exchange # {props.transid}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Transaction ID: {props.transid}</p>
            <p>Sender: {item.sender}</p>
            <p>Receiver: {item.receiver}</p>
            <p>Date: {item.date}</p> 
            <p>Item Transferred: </p>
            <a href=''>{item.item}</a>
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
