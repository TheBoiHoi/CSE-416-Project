
import * as React from 'react';
import {Card, Button} from 'react-bootstrap'; 
import Duckpfp from '../../Icons/duckpfp.png'
const ProfileCard = (props) =>{
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img style={{width:"50%",margin:"auto"}} variant="top" src={Duckpfp} />
        <Card.Body>
            <Card.Title style={{textAlign:"center"}}>user5748</Card.Title>
            <Card.Text style={{textAlign:"center"}}>
            1dxads091r11rk
            </Card.Text>
            <Card.Text style={{textAlign:"center"}}>
            Joined 02/22/2022
            </Card.Text>
            <div class="col-md-12 text-center">
                <Button style={{margin:"auto"}} variant="primary">Generate QR Code</Button>
            </div>
        </Card.Body>
        </Card>
    );
};
export default ProfileCard