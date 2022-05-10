import {Modal,Button,Row,Col,Carousel} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import air_mags2 from '../../../img/airmags2.jpg';
import './TableModal.css';
import {TransferOwnerShipModal} from '../TransferOwnershipModal/TransferOwnershipModal';
import {useState} from 'react';

import {QrCodeDisplayModal} from '../../QrCodeDisplayModal/QrCodeDisplayModal';
export const TableModal =(props)=>{

  const [showModal,setShowModal] = useState(false);
  const [showQRModal,setShowQRModal] = useState(false);
  return (
    <>
      <Modal
        show={props.showModal}
        onHide={()=>props.toggleModal(!props.showModal)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{props.item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Row className='modal-row-one-content-stuff'>
            <Col>
            <Carousel>
            <Carousel.Item>
              <Image src={air_mags2} fluid={true}/>
             </Carousel.Item>
             <Carousel.Item>
              <Image src={air_mags2} fluid={true}/>
             </Carousel.Item>
             <Carousel.Item>
              <Image src={air_mags2} fluid={true}/>
             </Carousel.Item>
            </Carousel>
           
            </Col>
            <Col>
            <h6>Item Name:</h6>
            <p>{props.item.name}</p>
          <h6>Date Created:</h6>
          <p>{props.item.manu_date}</p>
          <h6>Serial Number:</h6>
          <p>{props.item.serialNumber}</p>
          <h6>Location:</h6>
          <p>{props.item.manu_location}</p>
          <h6>Asset ID:</h6>
          <p>{props.item.asset_id}</p>
            </Col>
          </Row>
          {/* <Row>
            <h6>Description</h6>
            <p>The Nike MAG is a limited-edition shoe created by Nike Inc.[1] It is a replica of a shoe featured in the film Back to the Future Part II. The Nike Mag was originally released for sale in 2011 and again in 2016. Both launches were in limited quantities. The 2011 release was limited to 1,510 pairs, while the 2016 release was limited to 89 pairs.</p>
          </Row> */}
          
         
        </Modal.Body>
        <Modal.Footer>
        <Button variant="info" onClick={()=>{setShowQRModal(true)}}>
            QR Code    
        </Button>
        <Button variant="warning" onClick={()=>{setShowModal(true)}}>
            Transfer Ownership
          </Button>
          {/* <Button variant="secondary" onClick={()=>props.toggleModal(!props.showModal)}>
            Close
          </Button> */}
          <Button variant="primary"  onClick={()=>props.toggleModal(!props.showModal)}>Understood</Button>
          <QrCodeDisplayModal showModal={showQRModal} toggleModal ={setShowQRModal}/>
          <TransferOwnerShipModal company={props.company} itemId = {props.itemId} showModal={showModal} toggleModal ={setShowModal}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}