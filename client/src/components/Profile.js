import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apis from '../api'
import ProfileCard from './PrivateProfile/ProfileCard'
import PrivateTabs from './PrivateProfile/PrivateTabs'

export const Profile = (props) => {
    
    if(props.user){
        return(
            <div>
                <div>
                    Hello, {props.user.name}! You have successfully logged in
                    <div style={{}} class="row align-items-center">
                        <br></br>
                    </div>
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
    return null
    // else{
    //     return(
    //     <div>
    //         <div style={{}} class="row align-items-center">
    //             <br></br>
    //         </div>
    //         <div class="row align-items-center">
    //         <div  align="center" class="col">
    //             <ProfileCard name="testuser"/>
    //         </div>
    //         </div>
    //         <div class="row align-items-center">
    //         <div   align="center" class="col">
    //             <PrivateTabs></PrivateTabs>
    //         </div>
    //         </div>
    //     </div>
    //     )
    // }
    
}