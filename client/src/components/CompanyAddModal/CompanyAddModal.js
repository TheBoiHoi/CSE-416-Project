import {Modal,Button,Row,Col,Carousel,Form} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import air_mags2 from '../../img/airmags2.jpg';
import './CompanyAddModal.css';

export const CompanyAddModal =(props)=>{
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
          <Modal.Title id="contained-modal-title-vcenter">Add a New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Form>
        <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Images of Product</Form.Label>
            <Form.Control type="file" multiple placeholder="Select a minimum of 3 images for the product" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formItemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" placeholder="Enter the item name" />
            <Form.Text className="text-muted">
              Please enter the exact product name.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDateManufactured">
            <Form.Label>Date Manufactured</Form.Label>
            <Form.Control type="date" placeholder="select the date manufactured" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location Of Manufacturer</Form.Label>
            <Form.Control type="text" placeholder="Specify the location of manufacturer" />
          </Form.Group>

          <fieldset disabled>
          <Form.Group className="mb-3" controlId="formSerialNumber">
            <Form.Label>Autogenerated Serial Number</Form.Label>
            <Form.Control type="text" placeholder="KJBHBGCVJLSNdkb9" />
          </Form.Group>
          </fieldset>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.toggleModal(!props.showModal)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}