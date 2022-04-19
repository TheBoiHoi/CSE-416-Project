import {Modal,Button,Row,Col,Carousel} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import air_mags2 from '../../../img/airmags2.jpg';
import './TableModal.css';

export const TableModal =(props)=>{
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
          <Modal.Title id="contained-modal-title-vcenter">Nike Air Mags</Modal.Title>
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
            <p>Nike Air Mags</p>
          <h6>Date Created:</h6>
          <p>05/25/2022</p>
          <h6>Serial Number:</h6>
          <p>5yd75E4WW7zEZndm</p>
          <h6>Location:</h6>
          <p>Putian, China</p>
          <h6>Transaction ID: </h6>
          <p>819334e3268badjkfh</p>
          <h6>Blockchain ID:</h6>
          <p>lkanfakjb7qrbabf9nqw</p>
            </Col>
          </Row>
          <Row>
            <h6>Description</h6>
            <p>The Nike MAG is a limited-edition shoe created by Nike Inc.[1] It is a replica of a shoe featured in the film Back to the Future Part II. The Nike Mag was originally released for sale in 2011 and again in 2016. Both launches were in limited quantities. The 2011 release was limited to 1,510 pairs, while the 2016 release was limited to 89 pairs.</p>
          </Row>
          
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.toggleModal(!props.showModal)}>
            Close
          </Button>
          <Button variant="primary"  onClick={()=>props.toggleModal(!props.showModal)}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}