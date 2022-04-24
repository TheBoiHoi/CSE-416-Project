import React, {useState} from 'react';
import {Tab,Tabs} from 'react-bootstrap';
import ExchangesTab from './TabContent/ExchangesTab/ExchangesTab';
import InventoryTab  from './TabContent/InventoryTab/InventoryTab';
import PendingTab from './TabContent/PendingTab/PendingTab';
import PendingModal from './TabContent/PendingTab/PendingModal';

const PrivateTabs=(props)=>{
    const [show, setShow] = useState(false);
    const [trade, setTrade] = useState({});

    const showModal = (trade) => {
        setShow(true);
        setTrade(trade);
        console.log("showing modal", trade);
    }
    
    const hideModal = () => {
        setShow(false);
        console.log("hiding modal");
    }

    return(
    <Tabs style={{width:"50%"}} defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Exchanges" title="Exchanges">
            <ExchangesTab></ExchangesTab>
        </Tab>
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Inventory" title="Inventory">
            <InventoryTab items={props.user.items}></InventoryTab>
        </Tab>
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Pending" title="Pending" >
            <PendingTab handleShowModal={showModal}></PendingTab>
            <PendingModal show={show} trade={trade} hide={hideModal} disabled={trade.buyer_status}/>
        </Tab>
    </Tabs>
    )
};
export default PrivateTabs