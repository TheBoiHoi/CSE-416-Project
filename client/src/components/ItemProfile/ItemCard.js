
import * as React from 'react';
import {Card, Button} from 'react-bootstrap'; 
import ShoeImg from '../../img/airmags2.jpg'
import {useParams} from 'react-router-dom'
import axios from 'axios'
const ItemCard = (props) =>{
    const {itemId}=useParams()
    const[item, setItem]=React.useState(null)
    React.useEffect(()=>{
        axios.get(`item/get/${itemId}`).then((response)=>{
            setItem(response.data.item)
        })
    },[])
    return (
        <Card style={{ width: '18rem' }}>
        {item&&<Card.Img style={{width:"50%", margin:"auto"}} variant="top" src={`${process.env.REACT_APP_BACKEND_URL}/profile-pic/get/${item.itemId}`} />}
        {item&&<Card.Body>
            <Card.Title style={{textAlign:"center"}}>{item.name}</Card.Title>
            <Card.Text style={{textAlign:"center"}}>
                {item.itemId}
            </Card.Text>
            <Card.Text style={{textAlign:"center"}}>
            {`Owned by ${item.owner}`}
            </Card.Text>
        </Card.Body>}
        </Card>
    );
};
export default ItemCard