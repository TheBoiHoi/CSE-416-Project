import {Link} from "react-router-dom"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../Icons/Logo-removebg-preview.png'
import {CompanyNavbarFunctions} from './CompanyNavbarFunctions/CompanyNavbarFunctions';
import {UserNavbarFunctions} from './UserNavbarFunctions/UserNavbarFunctions';
import {useNavigate} from 'react-router-dom'
let settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export const Navbar = (props) => {
  // console.log("User ID: "+props.user.companyId)
  const navigate=useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCompanyMenu = (event) => {
    settings = ['Inventory Table', 'Logout']
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick =  (event) =>{

  }
  //const isCompany = props.isCompany;
  //const isUser = props.isUser;

  return (
    <AppBar style={{backgroundColor:'white'}}  position="static">
      <Container  maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            component="div"
            align="left"
          >
            <img style={{width:'15%', cursor:"pointer"}} src= {Logo} onClick={()=>{
              if(props.user.isCompany){
                navigate('/inventory-table')
              }else{
                navigate('/')
              }
              
              }}/>
          </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              style={{color:'black'}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             
              
                <Link class="link-remove-outline" to="/login">
                    <MenuItem >
                        <Typography style={{color:'black'}} textAlign="center">Login</Typography>
                    </MenuItem>
                </Link>
                
                
                <Link class="link-remove-outline" to="/register">
                    <MenuItem >
                        <Typography style={{color:'black'}} textAlign="center">Register</Typography>
                    </MenuItem>
                </Link>
            </Menu>
        </Box>
        
        
        {
        !props.user? (<Box sx={{  flexDirection: 'row-reverse', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link class="link-remove-outline" style={{padding:'5px'}} to="/login">
              <Button
                  sx={{ my: 2, color: 'black', display: 'block' ,backgroundColor:'black', color:'white'}}
              >
                  Login
              </Button>
          </Link>
          <Link class="link-remove-outline" style={{padding:'5px'}}  to="/register">
              <Button
                  sx={{ my: 2, color: 'black', display: 'block' }}
              >
                  Register
              </Button>
          </Link>
          </Box>):
          props.user.isCompany?<CompanyNavbarFunctions setFilter={props.setFilter} user={props.user} setUser={props.setUser}/>:
                              <UserNavbarFunctions setUser={props.setUser}/>
        }
        </Toolbar>
      </Container>
    </AppBar>
  );
};