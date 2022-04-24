import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const PendingModal = (props) => {
    const confirmTrade = () => {
        console.log("confirm trade");
    }
  

    return (
        <Modal show={props.show} centered size='lg' onHide={props.hide}>
            {`${props.trade.buyer_id} ${props.trade.buyer_status}-> ${props.trade.itemName} -> ${props.trade.seller_id} ${props.trade.seller_status}`}
            <Button disabled={props.disabled} onClick={confirmTrade}>Complete Trade</Button>
        </Modal>        
    )
}

export default PendingModal;