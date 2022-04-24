import {Modal,Button,Form} from 'react-bootstrap';

export const TransferOwnerShipModal =(props)=>{
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
        <Form>
          <Form.Group className="mb-3" controlId="formSerialNumber">
            <Form.Label>User ID</Form.Label>
            <Form.Control type="text" placeholder="Enter the user id of the person you want to transfer ownership to" />
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