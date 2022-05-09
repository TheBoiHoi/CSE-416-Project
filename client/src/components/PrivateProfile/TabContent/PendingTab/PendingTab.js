import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './pendingTab.css';
import shoeImg from '../../../../img/airmags.jpg';

const PendingTab = (props) => {
    const showModal = (trade, item, buyer, seller) => {
        props.handleShowModal(trade, item, buyer, seller);
    }

    return(
        <ListGroup>
            {props.trades.map((trade, index) => {
                return (
                    <>
                        <ListGroup.Item>
                            <div className='pendingTrade' onClick={() => showModal(trade, props.items[index], props.buyers[index], props.sellers[index])}>
                                <div className='itemImage box'><img className='image' src={shoeImg} /></div>
                                <div className='itemName box'>{props.items[index].name}</div>
                                <div className='buyerSeller box'><span className='buyer'>Buyer: {props.buyers[index].name}</span><br/><span className='seller'>Seller: {props.sellers[index].name}</span></div>
                                <div className='pendingIcon box'>{trade.buyer_status ? <span className='completed'>Completed</span> : <span className='pending'>Pending</span>}
                                        <br/>{trade.seller_status ? <span className='completed'>Completed</span> : <span className='pending'>Pending</span>}</div>
                            </div>
                        </ListGroup.Item>
                    </>
                )
            })}
        </ListGroup>
    )
};
export default PendingTab;