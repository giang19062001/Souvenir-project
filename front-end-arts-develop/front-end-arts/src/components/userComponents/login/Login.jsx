import * as React from 'react';
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';

import Alert from '@mui/material/Alert';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { connect } from "react-redux"; 
import './login.scss'
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { createStructuredSelector } from "reselect";
import {Link} from 'react-router-dom'
import { signInStart } from "../../../redux/user/user.action"; 
import {
  selectCurrentUser,
  selectLoginStatus,
} from "../../../redux/user/user.selector";
import UserActionTypes from "../../../redux/user/user.type";


const Login = ({ user, login, status }) => {
  console.log(status);

  const [userLogin, setUserLogin] = useState({
    userName: "",
    password: "",
  },[]);


  const handleChange = (event) => {
    setUserLogin((preState) => ({
      ...preState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };
  
  const handleLogin = () => {

    login(userLogin);
  };

  return (
    <Container  maxWidth="md" >
      <Paper sx={{ padding: "2em" }} elevation={3}>
      <Grid container spacing={2}>
         <Grid item md={6}>
              <img src="https://i.pinimg.com/originals/14/12/58/141258a3d8ac3129bc0e2abb7c3bd78e.gif" className="imgLogin" alt=""/>
         </Grid>
         <Grid item md={6}>
         <Grid container spacing={2}>
          <Grid item md={12} xs={12} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom:"15px"
          }}>
      <Avatar sx={{ m: 1,}}>
            <PersonIcon />
          </Avatar>
            <Typography align="center" variant="h5" sx={{
            marginBottom:"15px"
          }}>
              Sign in
            </Typography>
            <TextField
              label="User Name"
               fullWidth
              size="small"
              color="primary"
              name="userName"
              value={userLogin.userName}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              size="small"
              color="primary"
              variant="outlined"
              name="password"
              value={userLogin.password}
              onChange={handleChange}
            ></TextField>
          </Grid>
          {status ===UserActionTypes.EMAIL_SIGN_IN_PROCESSING ?(
             <Grid item md={12} xs={12}>
             <LinearProgress />
             </Grid>
          ):null}
          {status === UserActionTypes.SIGN_IN_SUCCESS ? (
            <Grid item md={12} xs={12}>
              <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={true}            
                >
                  <CircularProgress color="inherit" />
              </Backdrop>
            </Grid>
          ) : null}

    {status === UserActionTypes.SIGN_IN_FAILURE ? (
            <Grid item md={12} xs={12}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    Login fail - account or password invalid
                  </Alert>
                </Stack>
            </Grid>
          ) : null}
          <Grid item md={12} xs={12}>
            <Button
              variant="contained"
              sx={{ marginRight: "10px" }}
              disabled={status === UserActionTypes.EMAIL_SIGN_IN_PROCESSING}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Link to="/login/register">
            <Button variant="outlined">Register</Button>
            </Link>
          
          </Grid>
   
        </Grid>
         </Grid>
         </Grid>
      </Paper>
      
    </Container>
  );
};


const mapStateToProp = createStructuredSelector({

  user: selectCurrentUser,
  status: selectLoginStatus,
});


const mapDispatchToProp = (dispatch) => ({

  login: (loginInfo) => dispatch(signInStart(loginInfo)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Login);
