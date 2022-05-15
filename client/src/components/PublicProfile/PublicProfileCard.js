import * as React from 'react';
import {Card, Button} from 'react-bootstrap'; 
import Duckpfp from '../../Icons/duckpfp.png'
import api from '../../api'
import {useState} from 'react'
import {Buffer} from 'buffer'
const PublicProfileCard = (props) =>{
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img style={{width:"50%",margin:"auto"}} variant="top" src={`${process.env.REACT_APP_BACKEND_URL}/user/profile-pic/get/${props.user.userId}`} />
        <Card.Body>
            {props.user&&<Card.Title style={{textAlign:"center"}}>{props.user.name}</Card.Title>}
            <Card.Text style={{textAlign:"center"}}>
            {props.user.userId}
            </Card.Text>
            {/* <Card.Text style={{textAlign:"center"}}>
            Joined 02/22/2022
            </Card.Text> */}
        </Card.Body>
        </Card>
        
    );
};
export default PublicProfileCard