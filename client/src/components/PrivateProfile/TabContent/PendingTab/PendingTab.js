import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import './pendingTab.css'

const PendingTab = (props) => {
    const fetchPendingTrades =  async () => {
        const data = await axios.get("https://google.com");
        if(data) console.log(data)
    }

    const showModal = (trade) => {
        props.handleShowModal(trade);
    }

    useEffect(() => {
        fetchPendingTrades();
    });

    const [trades, useTrades] = useState([
        {
            tradeInitiated: "02/22/2022",
            buyer_id: "buyer1",
            seller_id: "seller1",
            buyer_status: false,
            seller_status: true,
            itemName: "Item 1"
        },
        {
            tradeInitiated: "02/26/2022",
            buyer_id: "buyer2",
            seller_id: "seller3",
            buyer_status: false,
            seller_status: false,
            itemName: "Item 2"
        },
        {
            tradeInitiated: "02/28/2022",
            buyer_id: "buyer4",
            seller_id: "seller1",
            buyer_status: true,
            seller_status: false,
            itemName: "Item 3"
        }
    ])
    return(
        <ListGroup>
            {trades.map((trade) => {
                return (
                    <>
                        <ListGroup.Item>
                            <div className='pendingTrade' onClick={() => showModal(trade)}>
                                <div className='itemImage box'>Image</div>
                                <div className='itemName box'>{trade.itemName}</div>
                                <div className='tradeInitiated box'>{trade.tradeInitiated}</div>
                                <div className='pendingIcon box'>Pending</div>
                            </div>
                        </ListGroup.Item>
                    </>
                )
            })}
        </ListGroup>
    )
};
export default PendingTab;