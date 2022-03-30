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
            <Card style={{ height:'10rem',width: '18rem' }}>
                <Card.Img style={{height:'5rem',width:'6rem'}} variant="top" src={ShoeImg} />
                <Card.Body>
                <Card.Title>Air Mags</Card.Title>
                </Card.Body>
            </Card>
        )
    }
    else{
        return(
            <Card style={{ height:'10rem',width: '18rem' }}>
                <Card.Body>
                <Card.Title>Air Mags</Card.Title>
                <Card.Text>
                Color:Blue
                </Card.Text>
                <Card.Text>Serial Number:1234567</Card.Text>
                <Button onClick={()=>{console.log('Start Trade')}}>Start Trade</Button>
                </Card.Body>
            </Card>
        )
    }
}