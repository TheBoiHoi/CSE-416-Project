import './CompanyNavbarFunctions.css';
import Box from '@mui/material/Box';
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import {PhotoCamera,Add,Search,NotificationAddRounded} from '@mui/icons-material';
import { TextField } from '@mui/material';

export const CompanyNavbarFunctions = () =>{
  return(
    <Box   sx={{  flexDirection: 'row-reverse', flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className ="company_nav_container">

        <div className='company_nav_search_bar'>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
              <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="With sx" variant="standard" />
          </Box>
        </div>
          

          <div className ="company_notification">
          <Link class="link-remove-outline" style={{padding:'5px'}}  to="/user_register">
            <IconButton>
            <NotificationAddRounded/>
            </IconButton>
            </Link>
          </div>
          

          <div className ="company_add">
          <Link class="link-remove-outline" style={{padding:'5px'}}  to="/user_register">
            <IconButton>
            <Add/>
            </IconButton>
            </Link>
          </div>
           

        </Box>
  )
}