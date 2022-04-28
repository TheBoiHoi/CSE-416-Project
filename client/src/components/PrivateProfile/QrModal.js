import {useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
const QrModal=(props)=> {
  
    const handleClose = () => props.setShow(false);
    return (
      <>
        <Modal centered show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>QR Code</Modal.Title>  
          </Modal.Header>
          <Modal.Body>{props.code&&<img src={`data:image/png;base64, ${props.code}`}/>}</Modal.Body>
          <Modal.Body>This Code Will Expire After Today</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <a href={`data:image/png;base64, ${props.code}`} download>
              <Button variant="primary">
                Save Changes
              </Button>
            </a>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default QrModal
