import './CompanyNavbarFunctions.css';
import Box from '@mui/material/Box';
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import {Add,Search,NotificationAddRounded} from '@mui/icons-material';
import { TextField } from '@mui/material';
import {TableModal} from '../InventoryTable/TableModal/TableModal';
import {CompanyAddModal} from '../CompanyAddModal/CompanyAddModal';
import {useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react';
import axios  from 'axios';
export const CompanyNavbarFunctions = (props) =>{
  const navigate=useNavigate()
  const handleAddItem = () =>{
    navigate(`/inventory-table`)
    setShowModal(true)
  }

  const [showModal,setShowModal] = useState(false);

  const handleInventoryTable = async () =>{
    navigate(`/inventory-table`)
  }

  const handleSignOut = async () =>{
    axios.post('user/logout').then(response=>{
      props.setUser(null)
      navigate('/')
    })
  }

  return(
    <>
    <Box   sx={{  flexDirection: 'row-reverse', flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className ="company_nav_container">

        {/* <div className='company_nav_search_bar'>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
              <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="With sx" variant="standard" onBlur={e => handleSerch(e.target.value)}/>
          </Box>
        </div> */}
          <Button  variant="text" onClick={handleSignOut}>Sign out</Button>
          <Button variant="text" onClick={handleInventoryTable}>Inventory Table</Button>
          <div className ="company_add">
            <IconButton onClick={handleAddItem}>
            <Add/>
            </IconButton>
          </div>
        </Box>
        <CompanyAddModal user = {props.user} showModal={showModal} toggleModal={setShowModal}/>
        </>
  )
}