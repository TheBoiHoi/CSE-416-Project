import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import './pendingTab.css'
const PendingModal = (props) => {
    const confirmTrade = () => {
        if(window.confirm("Are you sure you want to complete the trade?") == true){
            props.handleConfirm();
        }
    }
    const cancelTrade = () => {
        if (window.confirm("Are you sure you want to cancel the trade?") == true) {
            props.handleCancel();
        }
    }

    return (
        <Modal className='modal' show={props.show} centered size='sm' onHide={props.hide}>
            {props.buttonShow && <Button disabled={props.disabled}  variant={"danger"} onClick={cancelTrade}>Cancel Trade</Button>}
            {props.buttonShow && <Button disabled={props.completeDisabled} variant={"success"} onClick={confirmTrade}>Complete Trade</Button>}
        </Modal>        
    )
}

export default PendingModal;