import * as React from 'react';
import {Form,Button} from 'react-bootstrap'
const AccountSettings=(props)=>{
    const changePassword=()=>{
        
    }
    const uploadImage=()=>{
        console.log("uploaded img")
    }
    return(
        <div>
        <br></br><br></br><br></br><br></br>
            <h3>Change Password</h3>
            <Form.Control style={{width:'50%'}} type="password" placeholder="Enter New Password" />
            <Form.Control style={{width:'50%'}} type="password" placeholder="Confirm New Password" />
            <Button variant="primary" type="submit">Change Password</Button>
            <h3>Update Profile Picture</h3>
            <input  type="file" id="qrcode-upload" name="file" accept="image/*"/>
            <Button onClick={uploadImage} variant="primary" type="submit">Set Profile Picture</Button>

        </div>
    )
}
export default AccountSettings