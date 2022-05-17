import axios from 'axios';
import * as React from 'react';
import {Form,Button} from 'react-bootstrap'
import {useState} from 'react'
import { WindowSharp } from '@mui/icons-material';
const AccountSettings=(props)=>{
    const [original, setOriginal]=useState('')
    const [confirm, setConfirm]=useState('')
    const [newP, setNewP]=useState('')

    const changePassword=()=>{
        if(!newP){
            alert("The new password cannot be empty")
        }
        else if(confirm!=newP){
            alert("The new password and confirmed password don't match")
        }
        else{
            axios.post('/user/password/change', {
                originalPassword: original,
                newPassword: newP
            }).then(response=>{
                alert(`${response.data.message}`)
                window.location.reload()
            }).catch(e=>{
                alert(`${e.response.data.message}`)
            })
        }
    }
    const uploadImage=()=>{
        let file=document.getElementById('qrcode-upload').files[0]
        let formData=new FormData()
        formData.append('file', file, file.name)
        axios.post('/user/profile-pic/upload', formData)
    }
    return(
        <div >
        <br></br><br></br><br></br><br></br>
            <h3>Change Password</h3>
            <Form.Control style={{width:'50%'}} type="password" placeholder="Enter Original Password" onChange={e=>setOriginal(e.target.value)}/>
            <Form.Control style={{width:'50%'}} type="password" placeholder="Enter New Password" onChange={e=>setNewP(e.target.value)}/>
            <Form.Control style={{width:'50%'}} type="password" placeholder="Confirm New Password" onChange={e=>setConfirm(e.target.value)}/>
            <Button variant="primary" type="submit" onClick={changePassword}>Change Password</Button>
            <h3>Update Profile Picture</h3>
            <input  type="file" id="qrcode-upload" name="file" accept="image/*"/>
            <Button onClick={uploadImage} variant="primary" type="submit">Set Profile Picture</Button>

        </div>
    )
}
export default AccountSettings