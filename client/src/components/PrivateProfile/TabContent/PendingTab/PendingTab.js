import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import './pendingTab.css'

const PendingTab = (props) => {
    const fetchPendingTrades =  async () => {
        const data = await axios.get("https://google.com");
        if(data) console.log(data)
    }

    useEffect(() => {
        fetchPendingTrades();
    });

    const [trades, useTrades] = useState([
        {
            tradeInitiated: "02/22/2022",
            itemName: "Item 1"
        },
        {
            tradeInitiated: "02/26/2022",
            itemName: "Item 2"
        },
        {
            tradeInitiated: "02/28/2022",
            itemName: "Item 3"
        }
    ])
    return(
        <ListGroup>
            {trades.map((trade) => {
                return (
                    <ListGroup.Item>
                        <div className='pendingTrade'>
                            <div className='itemImage box'>Image</div>
                            <div className='itemName box'>{trade.itemName}</div>
                            <div className='tradeInitiated box'>{trade.tradeInitiated}</div>
                            <div className='pendingIcon box'>Pending</div>
                        </div>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
};
export default PendingTab;