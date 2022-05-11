import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const PendingModal = (props) => {
    const confirmTrade = () => {
        if(window.confirm("Are you sure you want to complete the trade?") == true){
            props.handleConfirm();
        }
    }

    return (
        <Modal show={props.show} centered size='sm' onHide={props.hide}>
            <Button disabled={props.disabled}  variant={"success"} onClick={confirmTrade}>Complete Trade</Button>
        </Modal>        
    )
}

export default PendingModal;