import {Modal,Button,Row,Col,Carousel,Form} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import air_mags2 from '../../img/airmags2.jpg';
import './CompanyAddModal.css';
import apis from '../../api'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import {useState} from 'react'



export const CompanyAddModal =(props)=>{

  const [name, setName]=useState("")
  const [date, setDate]=useState(null)
  const [location, setLocation]=useState("")
  const [serial, setSerial]=useState("")
  const[image, setImage]=useState(null)

  const handleOnChange=(e)=>{
    let file=e.target.files[0]
    let formData=new FormData()
    formData.append('file', file, file.name)
    setImage(formData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let response=await apis.CreateItem({
      id:props.user.companyId,
      name:name,
      manu_date:date,
      manu_location:location,
      manu_owner:props.user.name,
      serial_number:serial
    }).catch(e=>{
      alert("Something went wrong with the item creation, please make sure you have enought algo")
    })
    console.log("Done creating item")
    console.log("the response is", response)
    console.log("the image is ", image)
    if(image){
      await axios.post(`profile-pic/upload/${response.data.itemId}`, image)
    }
    window.location.reload();
  }

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
            <Form.Control onChange={handleOnChange} type="file" multiple placeholder="Select a minimum of 3 images for the product" />
          </Form.Group> 


          <Form.Group className="mb-3" controlId="formItemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" placeholder="Enter the item name" onChange={(e)=>{setName(e.target.value)}}  required/>
            <Form.Text className="text-muted">
              Please enter the exact product name.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDateManufactured">
            <Form.Label>Date Manufactured</Form.Label>
            <Form.Control type="date" placeholder="select the date manufactured" onChange={(e)=>{setDate(e.target.value)}} required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location Of Manufacturer</Form.Label>
            <Form.Control type="text" placeholder="Specify the location of manufacturer" onChange={(e)=>{setLocation(e.target.value)}} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formSerialNumber">
            <Form.Label>Serial Number</Form.Label>
            <Form.Control type="number" placeholder="Item serial number" onChange={(e)=>{setSerial(e.target.value)}} required/>
          </Form.Group>
          
          <Button onClick={handleSubmit} variant="primary" type="submit" id="itemSubmit" >
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