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

import {useState,useEffect} from 'react';

export const CompanyNavbarFunctions = () =>{
  const [showModal,setShowModal] = useState(false);

  return(
    <>
    <Box   sx={{  flexDirection: 'row-reverse', flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className ="company_nav_container">

        <div className='company_nav_search_bar'>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
              <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="With sx" variant="standard" />
          </Box>
        </div>
          

          <div className ="company_notification">
            <IconButton>
            <NotificationAddRounded/>
            </IconButton>
          </div>
          

          <div className ="company_add">
            <IconButton onClick={()=>setShowModal(true)}>
            <Add/>
            </IconButton>
          </div>
        </Box>
        <CompanyAddModal showModal={showModal} toggleModal={setShowModal}/>
        </>
  )
}