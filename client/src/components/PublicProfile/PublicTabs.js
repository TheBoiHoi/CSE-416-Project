import { TryRounded } from '@mui/icons-material';
import * as React from 'react';
import {Tab,Tabs} from 'react-bootstrap';
import ExchangesTab from '../PrivateProfile/TabContent/ExchangesTab/ExchangesTab';
import InventoryTab  from '../PrivateProfile/TabContent/InventoryTab/InventoryTab';
const PublicTabs=(props)=>{
    return(
    <Tabs style={{width:"50%"}} defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Exchanges" title="Exchanges">
            <ExchangesTab></ExchangesTab>
        </Tab>
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Inventory" title="Inventory">
            <InventoryTab public={true}></InventoryTab>
        </Tab>
    </Tabs>
    )
};
export default PublicTabs