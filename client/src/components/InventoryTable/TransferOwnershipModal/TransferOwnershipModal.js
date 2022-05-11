import {Modal,Button,Form} from 'react-bootstrap';
import axios from 'axios';
let userId
let companyId
let itemId
const handleSubmit = async (event)=>{
  console.log("transfer ownership")
  console.log("company :"+companyId)
  console.log("user : "+userId)
  console.log("item : "+itemId)
  event.preventDefault()
  try {
    await axios.post(`/company/sellItem`, {
    Itemid:itemId,
    companyId:companyId,
    buyerId:userId,
  }).then(()=>{
    alert("done")
  }).catch(e=>{
    alert("Something went wrong, please make sure you enter the right user id and the user have enough algo")
  })
  window.location.reload();
  
  } catch (error) {
    console.log(error)
  }
    
  
}
export const TransferOwnerShipModal =(props)=>{
  itemId = props.itemId
  companyId = props.company.companyId
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
          <Modal.Title id="contained-modal-title-vcenter">Transfer Ownership Of Item</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Form onSubmit={handleSubmit}> 
          <Form.Group className="mb-3" controlId="formUserId" >
            <Form.Label>User ID</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter the user id of the person you want to transfer ownership to" 
                          onChange={e => userId= e.target.value}
                          required/>
          </Form.Group>
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