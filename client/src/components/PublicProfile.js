import PublicTabs from './PublicProfile/PublicTabs'
import PublicProfileCard from './PublicProfile/PublicProfileCard'
import {useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
export const PublicProfile = (props) => {
    const {userId, key} = useParams()
    const[user, setUser]=useState(null)
    
    useEffect(()=>{
        axios.get(`user/get/${userId}/${key}`).then(response => {
            setUser(response.data.user)
        })
    }, [])

    console.log("key:", key)
    if(user){
        return(
            <div>
                <div style={{}} class="row align-items-center">
                    <br></br>
                </div>
                <div class="row align-items-center">
                <div  align="center" class="col">
                    <PublicProfileCard user={user} name="testuser"/>
                </div>
                </div>
                <div class="row align-items-center">
                <div   align="center" class="col">
                    <PublicTabs keyValue={key} user={user}></PublicTabs>
                </div>
                </div>
            </div>
        )
    }
    
    else{
        return null
    }
}