import * as React from 'react'
import {Card,Button} from 'react-bootstrap'
import ShoeImg from '../../../img/airmags.jpg'
import axios from 'axios'
import OperateModal from './InventoryTab/OperateModal'
import {useNavigate} from 'react-router-dom'
export const InventoryCard =(props)=>{
    const navigate=useNavigate()
    const [front,setFront]= React.useState(false)
    const [operation, setOperation]=React.useState(null)
    React.useEffect(()=>{
        setFront(props.front)
    },[])

    const handleItemProfile=(e)=>{
        e.stopPropagation()
        navigate(`/item/profile/${props.item.itemId}`)
    }

    const handleUploadImage=(e)=>{
        e.stopPropagation()
        setOperation("upload-image")
    }
    if(front){
        return (
            <Card style={{ height:'13rem',width: '13rem' }}>
                <Card.Img style={{height:'100%',width:'100%'}} alt="Profile Image" src={`http://localhost:3000/profile-pic/get/${props.item.itemId}`}/>
                <Card.Title>{props.item.name}</Card.Title>
            </Card>
        )
    }
    else{
        return(
            <div>
                <Card style={{ height:'13rem',width: '13rem' }}>
                    <Card.Body>
                    <Card.Title>{props.item.name}</Card.Title>
                    <Card.Text>Serial Number: {props.item.serialNumber}</Card.Text>
                    {props.public?
                        <Card.Link href='#'>Start Trade</Card.Link>
                        :
                        <></>
                    }
                    {!props.public&&<button onClick={handleUploadImage}>Upload Image</button>}
                    <br></br>
                    <button onClick={handleItemProfile} >Item Profile</button>
                    </Card.Body>
                    
                </Card>
                {operation&&<OperateModal itemId={props.item.itemId} setOperation={setOperation} operation={operation}></OperateModal>}
            </div>
        )
    }
}