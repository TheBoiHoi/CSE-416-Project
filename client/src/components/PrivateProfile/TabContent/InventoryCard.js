import * as React from 'react'
import {Card,Button} from 'react-bootstrap'
import ShoeImg from '../../../img/airmags.jpg'
export const InventoryCard =(props)=>{
    const [front,setFront]= React.useState(false)
    React.useEffect(()=>{
        setFront(props.front)
    })
    if(front){
        return (
            <Card style={{ height:'13rem',width: '13rem' }}>
                <Card.Img style={{height:'100%',width:'100%'}}  src={ShoeImg} />
                <Card.Title>Air Mags</Card.Title>
            </Card>
        )
    }
    else{
        return(
            <Card style={{ height:'13rem',width: '13rem' }}>
                <Card.Body>
                <Card.Title>Air Mags</Card.Title>
                <Card.Text>
                Color:Blue
                </Card.Text>
                <Card.Text>Serial Number:1234567</Card.Text>
                <Card.Link href='#'>Start Trade</Card.Link>
                <br></br>
                <Card.Link href='#'>Item Profile</Card.Link>
                </Card.Body>
            </Card>
        )
    }
}