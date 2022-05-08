import './UserNavbarFunctions.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"

export const UserNavbarFunctions = (props) =>{
  const navigate=useNavigate()
  const handleProfile= (e)=>{
    navigate('/Profile')
  }
  const handleSignOut=(e)=>{
    axios.post('http://localhost:3000/user/logout').then(response=>{
      props.setUser(null)
      navigate('/')
    })
  }
  return (
    <>
    <Box   sx={{  flexDirection: 'row-reverse', flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className ="company_nav_container">

        {/* <div className='company_nav_search_bar'>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
              <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="With sx" variant="standard" onBlur={e => handleSerch(e.target.value)}/>
          </Box>
        </div> */}

        
        <Button onClick={handleSignOut} variant="text">Sign out</Button>
        <Button variant="text">Account Settings</Button>
        <Button variant="text" onClick={handleProfile}>Profile</Button>
        </Box>
        </>
  )
}