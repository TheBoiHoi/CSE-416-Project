import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const PendingModal = (props) => {
    const confirmTrade = () => {
        props.handleConfirm();
    }

    return (
        <Modal show={props.show} centered size='lg' onHide={props.hide}>
            {`${props.buyer.name} ${props.trade.buyer_status}-> ${props.item.name} -> ${props.seller.name} ${props.trade.seller_status}`}
            <Button disabled={props.disabled} onClick={confirmTrade}>Complete Trade</Button>
        </Modal>        
    )
}

export default PendingModal;