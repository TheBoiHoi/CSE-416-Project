import {useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
const QrModal=(props)=> {
  
    const handleClose = () => props.setOperation("");

    const scanQRCode=()=>{
      let file=document.getElementById("myFile").files[0]
      var formData=new FormData()
      formData.append('file', file, file.name)
      console.log("form data:", formData)
      fetch("http://localhost:3000/qrcode/scan", {
          method:'POST',
          body:formData
      })
    }
    if(props.operation=='generating-qrcode'){
      return (
        <>
          <Modal centered show={true}>
            <Modal.Header>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.code&&<img src={`data:image/png;base64, ${props.code}`}/>}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <a href={`data:image/png;base64, ${props.code}`} download>
                <Button variant="primary">
                  Download
                </Button>
              </a>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    else{
      return(
        <>
          <Modal centered show={true}>
            <Modal.Header>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <button onClick={scanQRCode}>Scan QR Code</button>
              <input type="file" id="myFile" name="file" accept="image/*"/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        
      )
    }
    
  }
export default QrModal
