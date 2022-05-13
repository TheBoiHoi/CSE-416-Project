import * as React from 'react'
import {Card,Button} from 'react-bootstrap'
import ShoeImg from '../../../img/airmags.jpg'
import axios from 'axios'
import OperateModal from './InventoryTab/OperateModal'

import {useNavigate} from 'react-router-dom'
import StartTradeModal from './InventoryTab/StartTradeModal'
export const InventoryCard =(props)=>{
    console.log(props.public)
    const navigate=useNavigate()
    const [front,setFront]= React.useState(false)
    const [operation, setOperation]=React.useState(null)
    const [showTradeModal,setShowTradeModal] = React.useState(false)
    React.useEffect(()=>{
        setFront(props.front)
    },[])

    const handleItemProfile=(e)=>{
        e.stopPropagation()
        navigate(`/item/profile/${props.item.itemId}`)
    }
    const openModal=(transaction)=>{
        setShowTradeModal(true)
      }
      console.log(props.item)
    if(front){
        return (
            <Card style={{ height:'13rem',width: '13rem' }}>
                {props.item&&<Card.Img style={{height:'100%',width:'100%'}} alt="Profile Image" src={`${process.env.REACT_APP_BACKEND_URL}/profile-pic/get/${props.item.itemId}`}/>}
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
                    {!props.public?
                        <Card.Link href='#' onClick={()=>{
                            openModal()
                        }} >Start Trade</Card.Link>
                        :
                        <></>
                    }
                    {/* {!props.public&&<Button onClick={handleUploadImage}>Upload Image</Button>} */}
                    <br></br><br></br>
                    <Card.Link style={{cursor:'pointer'}} onClick={handleItemProfile} >Item Profile</Card.Link>
                    </Card.Body>
                    
                </Card>
                {showTradeModal && <StartTradeModal item={props.item} setShow={setShowTradeModal} show={showTradeModal} ></StartTradeModal>}
                {operation&&<OperateModal itemId={props.item.itemId} setOperation={setOperation} operation={operation}></OperateModal>}
            </div>
        )
    }
}