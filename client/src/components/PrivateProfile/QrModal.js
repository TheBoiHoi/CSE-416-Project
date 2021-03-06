import {useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
import axios from 'axios'
const QrModal=(props)=> {
    const [scanningImage, setScanningImage]=useState(null)//the qrcode that is ready to be scanned
    const[url, setUrl]=useState("")//url for the scanned qrcode

    const handleClose = () => props.setOperation("");

    const scanQRCode=()=>{
      let file=document.getElementById("qrcode-upload").files[0]
      var formData=new FormData()
      formData.append('file', file, file.name)
      console.log("form data:", formData)
      axios.post("/user/qrcode/scan", formData).then(response=>{
        setUrl(response.data.data)
      })
    }

    const uploadQRCode=()=>{
      let file=document.getElementById('qrcode-upload').files[0]
      setScanningImage(URL.createObjectURL(file))
    }
    if(props.operation=='generating-qrcode'){
      return (
        <>
          <Modal centered show={true}>
            <Modal.Header style={{backgroundColor:"white"}}>
              <Modal.Title style={{color:"black"}}>Generating QRCode</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"white"}}>{props.code&&<img src={`data:image/png;base64, ${props.code}`}/>}</Modal.Body>
            <Modal.Footer style={{backgroundColor:"white"}}>
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
            <Modal.Header style={{backgroundColor:"white"}}>
              <Modal.Title style={{color:"black"}}>Scanning QRCode</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"white"}}>
            <p>Please Upload A Profile QRCode To View Profile</p>
              <input onChange={uploadQRCode} type="file" id="qrcode-upload" name="file" accept="image/*"/>
              {scanningImage&&<img src={`${scanningImage}`}/>}
              <br></br>
              <a href={url}>{url}</a>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor:"white"}}>
            <Button variant="primary" onClick={scanQRCode}>
                Scan
              </Button>
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
