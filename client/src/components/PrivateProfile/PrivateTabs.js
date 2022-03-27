import * as React from 'react';
import {Tab,Tabs} from 'react-bootstrap';
const PrivateTabs=(props)=>{
    return(
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Home">
            <h1>home</h1>
        </Tab>
        <Tab eventKey="profile" title="Profile">
            <h1>profile</h1>
        </Tab>
        <Tab eventKey="contact" title="Contact" >
            <h1>contact</h1>
        </Tab>
    </Tabs>
    )
};
export default PrivateTabs