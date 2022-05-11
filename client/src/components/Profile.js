import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apis from '../api'
import ProfileCard from './PrivateProfile/ProfileCard'
import PrivateTabs from './PrivateProfile/PrivateTabs'

export const Profile = (props) => {
    if(props.user && !props.user.isCompany){
        return(
            <div>
                <div>
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
    
}