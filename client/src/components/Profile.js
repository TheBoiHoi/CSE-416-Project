import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apis from '../api'
import ProfileCard from './PrivateProfile/ProfileCard'
import PrivateTabs from './PrivateProfile/PrivateTabs'
export const Profile = (props) => {
    const {userId} = useParams()
    const [user, setUser] = useState(null)
    console.log("userId", userId)
    useEffect(() => {
        apis.GetUser(userId).then(response=>{
            setUser(response.data.user)
        })
    }, [])

    if(user){
        return(
            <div>

                <div>
                    Hello, {user.name}! You have successfully logged in
                    <div style={{}} class="row align-items-center">
                        <br></br>
                    </div>
                    <div class="row align-items-center">
                    <div  align="center" class="col">
                        <ProfileCard name={user.name}/>
                    </div>
                    </div>
                    <div class="row align-items-center">
                    <div   align="center" class="col">
                        <PrivateTabs></PrivateTabs>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
        <div>
            <Navbar></Navbar>
            
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