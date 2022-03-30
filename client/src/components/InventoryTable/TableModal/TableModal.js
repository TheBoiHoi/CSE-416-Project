import {Modal,Button} from 'react-bootstrap';

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
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
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