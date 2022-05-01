import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
import Logo from './Icons/Logo.png'

import apis from './api'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        QRify LLC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = (props) =>  {
  const navigate=useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    if(document.getElementById('user_checkbox').checked){
      apis.Login({email:data.get('email'), password:data.get('password')}).then(response=>{
        props.setUser(response.data.user)
        navigate('/profile')
      }).catch(error => {
        console.log("error:", error.response)
      })
    }else if(document.getElementById('user_checkbox').checked){
      // console.log("company logging in")
      // const response = apis.CompanyLogin({email:data.get('email'), password:data.get('password')}).then(response=>{
      // console.log("response:", response.data.user)
      // const company_id = response.data.userId
      //   navigate(`/inventory_table`)
      // }).catch(error => {
      //   console.log("error:", error.response)
      // })
    }   
    // apis.Login({email:data.get('email'), password:data.get('password')}).then(response=>{
    //   //const userId = response.data.userId
    //   props.setUser(response.data.user)
    //   navigate(`/profile`)
    // }).catch(error => {
    //   console.log("error:", error.response)
    // })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <img style={{width:'20%'}}src= {Logo}/>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{mt:2}}>
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="user_checkbox" defaultChecked></input>
          User
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="company_checkbox"></input>
          Company
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor:"#38d5a0"
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login