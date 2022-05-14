import {Modal,Button,Form} from 'react-bootstrap';
import axios from 'axios';
import {useState} from 'react'
import './TransferOwnershipModal.css';

export const TransferOwnerShipModal =(props)=>{
  const[userId, setUserId]=useState("");
  const [showLoading,setShowLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmit = async (event)=>{
    event.preventDefault()
    console.log("userId:", userId)
    console.log("companyId:", props.company.companyId)
    console.log("itemId:", props.itemId)
    let itemId=props.itemId
    let companyId=props.company.companyId
    axios.post('/company/sellItem', {
      itemId:itemId,
      companyId:companyId,
      buyerId:userId,
    }).then(()=>{
      // alert("done");
      setShowLoading(false);
      setDisableButton(false);
      window.location.reload();
    }).catch(e=>{
      console.log("error:", e)
      alert("Something went wrong, please make sure you enter the right user id and the user have enough algo")
    })
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
                          onChange={e=>setUserId(e.target.value)}
                          required/>
          </Form.Group>
         
          <Button variant="primary" type="submit" onClick={()=>{setShowLoading(true);}}>
            Submit
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.toggleModal(!props.showModal)}>
            Close
          </Button>
        </Modal.Footer>
        {showLoading && (<div class="loader"></div>)}
      </Modal>
      
    </>
  );
}