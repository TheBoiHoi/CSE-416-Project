import './QrCodeDisplayModal.css'
import {Modal,Button,Form} from 'react-bootstrap';
import SampleQR from '../../img/qrcode.jpg'
import Image from 'react-bootstrap/Image'
export const QrCodeDisplayModal = (props) =>{
  return (
    <>
      <Modal
        show={props.showModal}
        onHide={()=>props.toggleModal(!props.showModal)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Image src={`${process.env.REACT_APP_BACKEND_URL}/item/qrcode/${props.itemId}`} fluid/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.toggleModal(!props.showModal)}>
            Close
          </Button>
          <a href={`${process.env.REACT_APP_BACKEND_URL}/item/qrcode/${props.itemId}`} download="item_qrcode.png">
            <Button variant="primary">
              Download
            </Button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  )
}