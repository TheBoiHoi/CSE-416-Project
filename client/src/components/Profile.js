import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apis from '../api'
import ProfileCard from './PrivateProfile/ProfileCard'
import PrivateTabs from './PrivateProfile/PrivateTabs'

export const Profile = (props) => {
    // const {userId} = useParams()
    // const [user, setUser] = useState(null)
    // useEffect(() => {
    //     apis.GetUser(userId).then(response=>{
    //         setUser(response.data.user)
    //         props.toggleIsUser(true)
    //         props.setUserName(user.name)
    //     })
    // }, [])

    const ScanQRCode=()=>{
        let file=document.getElementById("myFile").files[0]
        var formData=new FormData()
        formData.append('file', file, file.name)
        console.log("form data:", formData)
        fetch("http://localhost:3000/qrcode/scan", {
            method:'POST',
            body:formData
        })
    }
    if(props.user){
        return(
            <div>
                <div>
                    Hello, {props.user.name}! You have successfully logged in
                    <div style={{}} class="row align-items-center">
                        <br></br>
                    </div>
                    <button>Scan QR Code</button>
                    <input type="file" id="myFile" name="file" accept="image/*"/>
                    <input type="submit" onClick={ScanQRCode}/>
                    <div class="row align-items-center">
                    <div  align="center" class="col">
                        <ProfileCard user={props.user}/>
                    </div>
                    </div>
                    <div class="row align-items-center">
                    <div   align="center" class="col">
                        <PrivateTabs user={props.user}></PrivateTabs>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
        <div>
            <div style={{}} class="row align-items-center">
                <br></br>
            </div>
            <div class="row align-items-center">
            <div  align="center" class="col">
                <ProfileCard name="testuser"/>
            </div>
            </div>
            <div class="row align-items-center">
            <div   align="center" class="col">
                <PrivateTabs></PrivateTabs>
            </div>
            </div>
        </div>
        )
    }
    
}