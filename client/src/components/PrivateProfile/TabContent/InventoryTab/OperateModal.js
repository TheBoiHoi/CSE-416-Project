import {Modal,Button} from 'react-bootstrap'
import {useState} from 'react'
import axios from 'axios'
const OperateModal=(props)=>{
    const [image, setImage]=useState(null)
    const handleClose=(e)=>{
        e.stopPropagation(); 
        props.setOperation(null)
    }
    const handleOnChange=()=>{
        let file=document.getElementById(`upload-${props.itemId}`).files[0]
        setImage(URL.createObjectURL(file))
        
    }

    const handleUpload=(e)=>{
        let file=document.getElementById(`upload-${props.itemId}`).files[0]
        let formData=new FormData()
        formData.append('file', file, file.name)
        axios.post(`http://194.113.72.18:3000/profile-pic/upload/${props.itemId}`, formData)
        props.setOperation(null)
    }
    if(props.operation=='upload-image'){
        return(
            <Modal onClick={(e)=>{e.stopPropagation();console.log("event:", e)}} centered show={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input id={`upload-${props.itemId}`} type='file' onChange={handleOnChange} accept="image/gif, image/jpeg, image/png"></input>
                    {image&&<img src={`${image}`}/>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e)=>{handleClose(e)}}>
                    Close
                    </Button>
                    <Button onClick={handleUpload} variant="primary">
                       Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    else{
        return(
            <div>
                hello
            </div>
        )
    }
    
    
}

export default OperateModal