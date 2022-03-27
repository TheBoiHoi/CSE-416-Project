import * as React from 'react';
import {Tab,Tabs} from 'react-bootstrap';
import ExchangesTab from '../TabContent/ExchangesTab/ExchangesTab';
const PrivateTabs=(props)=>{
    return(
    <Tabs style={{width:"50%"}} defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Exchanges" title="Exchanges">
            <ExchangesTab></ExchangesTab>
        </Tab>
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Inventory" title="Inventory">
            <h1>profile</h1>
        </Tab>
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Pending" title="Pending" >
            <h1>contact</h1>
        </Tab>
    </Tabs>
    )
};
export default PrivateTabs