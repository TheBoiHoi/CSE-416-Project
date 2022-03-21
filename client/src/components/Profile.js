import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apis from '../api'
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
                Hello, {user.name}! You have successfully logged in
            </div>
        )
    }
    else{
        return(
            <div>
                Nothing
            </div>
        )
    }
    
}