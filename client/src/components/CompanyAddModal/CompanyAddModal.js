import {Modal,Button,Row,Col,Carousel,Form} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import air_mags2 from '../../img/airmags2.jpg';
import './CompanyAddModal.css';
import apis from '../../api'
import { Navigate } from 'react-router-dom';
let name = " "
let date = " "
let location = " "
let serial = " "
let id = " "
  const handleSubmit = async (event) => {
    event.preventDefault()
    await apis.CreateItem({
      id:id,
      name:name,
      manu_date:date,
      manu_location:location,
      manu_owner:name,
      serial_number:serial}).catch(e=>{
        alert("Something went wrong with the item creation, please make sure you have enought algo")
      })
      console.log("Done creating item")
      window.location.reload();
    
    };

export const CompanyAddModal =(props)=>{
  name = props.user.name
  id = props.user.companyId
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
        <Form onSubmit={handleSubmit}>
        {/* <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Images of Product</Form.Label>
            <Form.Control type="file" multiple placeholder="Select a minimum of 3 images for the product" />
          </Form.Group> */}


          <Form.Group className="mb-3" controlId="formItemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" placeholder="Enter the item name" onChange={e => name= e.target.value}  required/>
            <Form.Text className="text-muted">
              Please enter the exact product name.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDateManufactured">
            <Form.Label>Date Manufactured</Form.Label>
            <Form.Control type="date" placeholder="select the date manufactured" onChange={e => date= e.target.value} required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location Of Manufacturer</Form.Label>
            <Form.Control type="text" placeholder="Specify the location of manufacturer" onChange={e => location= e.target.value} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formSerialNumber">
            <Form.Label>Serial Number</Form.Label>
            <Form.Control type="number" placeholder="Item serial number" onChange={e => serial= e.target.value} required/>
          </Form.Group>
          
          <Button variant="primary" type="submit" id="itemSubmit" >
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