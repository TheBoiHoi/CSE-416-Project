
import * as React from 'react';
import {Card, Button} from 'react-bootstrap'; 
import ShoeImg from '../../img/airmags2.jpg'
const ItemCard = (props) =>{
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img style={{width:"50%",margin:"auto"}} variant="top" src={ShoeImg} />
        <Card.Body>
            <Card.Title style={{textAlign:"center"}}>{props.name}</Card.Title>
            <Card.Text style={{textAlign:"center"}}>
            1dxads091r11rk
            </Card.Text>
            <Card.Text style={{textAlign:"center"}}>
            Made In China
            </Card.Text>
            <Card.Text style={{textAlign:"center"}}>
            Owned By u579
            </Card.Text>
        </Card.Body>
        </Card>
    );
};
export default ItemCard