import {useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
const QrModal=(props)=> {
  
    const handleClose = () => props.setShow(false);
  
    return (
      <>
        <Modal centered show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.code&&<img src={`data:image/png;base64, ${props.code}`}/>}</Modal.Body>
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
export default QrModal
