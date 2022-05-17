import React from 'react';
import { ListGroup} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import './pendingTab.css';

const PendingTab = (props) => {

    const showModal = (trade, item, buyer, seller) => {
        props.handleShowModal(trade, item, buyer, seller);
    }
    const navigate=useNavigate()
    console.log(props)
    const handleItemProfile=(id)=>{
        navigate(`/item/profile/${id}`)
    }
    return(
       
        <ListGroup >
            {props.pendings.trades.map((trade, index) => {
                return (
                    <>
                        <ListGroup.Item key={index}>
                            <div style={{height:'100px'}} className='pendingTrade' onClick={() => showModal(trade, props.pendings.items[index], props.pendings.buyers[index], props.pendings.sellers[index])}>
                                <div  className='itemImage box'><img style={{height:'100px',width:'100px',borderRadius:'50%'}} className='image' src={`${process.env.REACT_APP_BACKEND_URL}/profile-pic/get/${props.pendings.items[index].itemId}`} /></div>
                                <div className='itemName box'><a href='' onClick={()=>handleItemProfile(trade.item_id)}>{props.pendings.items[index].name}</a></div>
                                <div className='buyerSeller box'><span className='buyer'>Buyer: {props.pendings.buyers[index].name}</span><br/><span className='seller'>Seller: {props.pendings.sellers[index].name}</span></div>
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