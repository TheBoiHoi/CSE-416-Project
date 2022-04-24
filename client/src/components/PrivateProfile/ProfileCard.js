import * as React from 'react';
import {Card, Button} from 'react-bootstrap'; 
import Duckpfp from '../../Icons/duckpfp.png'
import api from '../../api'
import {useState} from 'react'
import {Buffer} from 'buffer'
import QrModal from './QrModal'
const ProfileCard = (props) =>{
    const[code, setCode] = useState(null)
    const[show, setShow]=useState(false)
    const generateQRCode=()=>{
        api.generateProfileQRCode().then(response=>{
            setCode(Buffer.from(response.data).toString('base64'))
            setShow(true)
        })
        
    }
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img style={{width:"50%",margin:"auto"}} variant="top" src={Duckpfp} />
        <Card.Body>
            {props.user&&<Card.Title style={{textAlign:"center"}}>{props.user.name}</Card.Title>}
            <Card.Text style={{textAlign:"center"}}>
            1dxads091r11rk
            </Card.Text>
            <Card.Text style={{textAlign:"center"}}>
            Joined 02/22/2022
            </Card.Text>
            <div class="col-md-12 text-center">
                <Button style={{margin:"auto"}} variant="primary" onClick={generateQRCode}>Generate QR Code</Button>
            </div>
        </Card.Body>
        {show&&<QrModal code={code} setShow={setShow}/>}
        </Card>
        
    );
};
export default ProfileCard