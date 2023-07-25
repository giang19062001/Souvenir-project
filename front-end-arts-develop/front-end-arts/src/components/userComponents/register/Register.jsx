import React, { useState,useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinearProgress from "@mui/material/LinearProgress";
import {Link} from 'react-router-dom'

import api from "../../../api/client.js";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {selectRegisterStatus} from "../../../redux/user/user.selector";
import { signUpStart } from "../../../redux/user/user.action"; 
import UserActionTypes from "../../../redux/user/user.type";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './register.scss'
import validate from "validate.js";
import { color } from '@mui/system';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SignUp = ({ register, status }) => {

  const [userRegister, setUserRegister] = useState({
      userName: "",
      password: "",
      userFullName:"",
      userEmail:"",
      userPhone:"",
      userAddress:"",
      userGender:true,
      userRole: 3

  });
  const [userRegisterCheck, setUserRegisterCheck] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
      const { data: allUser } = await api.get("/api/Users/Users");
  
      const listUser = allUser.map((user) =>
        user.userName === userRegister.userName ? false : true
      );
      console.log("listUser",listUser)
      const checkUser = listUser.find((item) => item !== true);
      console.log("checkUser",checkUser)
  
      if(checkUser === undefined){
        setUserRegisterCheck(true);
      }else if(checkUser === false){
        setUserRegisterCheck(false);
      }
      console.log("userRegisterName",userRegisterCheck)
      } catch (error) {
        console.error(error.message);
      }
    };
  
    fetchData();
    
  }, [userRegister.userName,userRegisterCheck]);
 // Validation
 const [validation, setValidation] = useState({
  touched: {},
  errors: {},
  isvalid: false,
});
useEffect(() => {
  const schema = {
    userName: {
      presence: {
        allowEmpty: false,
        message: "^user name is required",
      },
      length: {
        maximum: 20,
        minimum: 5,
        message: "^userName must be > 5 < 20",
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "^Password is required",
      },
      length: {
        maximum: 20,
        minimum: 5,
        message: "^Password must be > 5 < 20",
      },

    },
    confirmPassword : {
      equality:{
        attribute: "password",
        message: "^Password is not complex enough",
      }
    },
    userFullName:{
      presence: {
        allowEmpty: false,
        message: "^Fullname is required",
      },
      format: {
        pattern: "[a-z A-Z]+",
        flags: "i",
        message: "^Fullname only contain a-z and A-Z"
      },
      length: {
        maximum: 30,
        minimum: 5,
        message: "^Fullname   must be > 5 < 30",
      },
    },
    userAddress:{
      presence: {
        allowEmpty: false,
        message: "^Address is required",
      },
      length: {
        maximum: 50,
        minimum: 5,
        message: "^Address   must be > 5 < 50",
      },
    },
    userEmail:{
      presence: {
        allowEmpty: false,
        message: "^Fullname is required",
      }, 
        email:  {
          message: "^Fullname doesn't look like a valid email"
        },
      length: {
        maximum: 50,
        minimum: 5,
        message: "^Fullname   must be > 5 < 50",
      },
    },
    userPhone: {
      presence: { allowEmpty: false, message: "^userPhone is required" },
      numericality:{
        notInteger:true,
        message: "^userPhone must be integer",
     }, 
      length: {
        minimum: 8,
        maximum: 12,
        message: "^userPhone must be > 8 < 12",
      },
    },
  };

  const errors = validate.validate(userRegister, schema);
  setValidation((pre) => ({
    ...pre,
    isvalid: errors ? false : true,
    errors: errors || {},
  }));
}, [userRegister]);


//handleChange
const onChange = (e) => {
  setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  setValidation((pre) => ({
    ...pre,
    touched: {
      ...pre.touched,
      [e.target.name]: true,
    },
  }));
  console.log("validation.isvalid",validation.isvalid);

};

const hasError = (field) => {
  return validation.touched[field] && validation.errors[field] ? true : false;
};

  const handleSubmit = async (e) => {
      e.preventDefault();

      console.log(userRegister);
      register(userRegister);
  };

  return (

 <Paper sx={{
        backgroundImage:`url("https://img.freepik.com/premium-photo/brown-teddy-bear-with-patches-sits-white-table-pink-background-copy-space_116441-19043.jpg?w=2000")`,
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundSize:"100em",
        }}>
  <Box
    sx={{        
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
      }}
    >
     <Container component="main" maxWidth="xs"  
      sx={{ 
        border: 1,borderColor: 'primary.main',borderRadius: '16px'
        ,backgroundColor:"white",   marginY:10 ,}}>

      
          <Typography  variant="h5" textAlign={"center"} sx={{marginY:5,fontWeight:"bold"}}>
            Sign <b style={{color:"yellow"}}>Up</b> 
          </Typography>

       
      <Grid container spacing={2}>
   
            <Grid item xs={12} md={12}>
                <TextField
                fullWidth
                  type='text'
                  
                  name='userName'
                  value={userRegister.userName}
                  onChange={onChange}
                  label='User name'
                  required
                  error={hasError("userName") || userRegisterCheck === false}
               
                  helperText={
                    hasError("userName") 
                      ? validation.errors.userName[0]
                      : null
                    || userRegisterCheck === false 
                      ? "account is exist"
                      :null
                  }
  
                  
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                fullWidth
                 type='password'
                 name='password'
                 value={userRegister.password}
                 onChange={onChange}
                 label='Password'
                 required
                 error={hasError("password")}
                 helperText={
                   hasError("password")
                     ? validation.errors.password[0]
                     : null
                 }
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                fullWidth
                 type='password'
                 name='confirmPassword'
                 onChange={onChange}
                 label='Confirm password'
                 required
                 error={hasError("confirmPassword")}
                 helperText={
                   hasError("confirmPassword")
                     ? validation.errors.confirmPassword[0]
                     : null
                 }
                />
              </Grid>
            <Grid item xs={6} md={6}>
                <TextField
                fullWidth
                  type='text'
                  name='userFullName'   
                  value={userRegister.userFullName}          
                  onChange={onChange}
                  label='Full name'
                  required
                  error={hasError("userFullName")}
                  helperText={
                    hasError("userFullName")
                      ? validation.errors.userFullName[0]
                      : null
                  }
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                fullWidth
                  type='text'
                  name='userPhone'     
                  value={userRegister.userPhone}        
                  onChange={onChange}
                  label='Phone'
                  required
                  error={hasError("userPhone")}
                  helperText={hasError("userPhone") ? validation.errors.userPhone[0] : null}
                />
              </Grid>
          
              <Grid item xs={12} md={12}>
                <TextField
                fullWidth
                  type='text'
                  name='userEmail'     
                  value={userRegister.userEmail}        
                  onChange={onChange}
                  label='Email'
                  required
                  error={hasError("userEmail")}
                  helperText={hasError("userEmail") ? validation.errors.userEmail[0] : null}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                fullWidth
                 type='text'
                 name='userAddress'
                 multiline
                 rows={4}
                 value={userRegister.userAddress}
                 onChange={onChange}
                 label='Address'
                 required
                 error={hasError("userAddress")}
                 helperText={hasError("userAddress") ? validation.errors.userAddress[0] : null}
                />
             </Grid>
            {status ===UserActionTypes.SIGN_UP_PROCESSING ?(
             <Grid item md={12} xs={12}>
             <LinearProgress />
             </Grid>
          ):null}
              </Grid>
         
       
            <Grid container justifyContent="flex-end">
              <Grid item sx={{marginTop:"30px"}}>
              <Link  to="/login" style={{color:"blue"}}>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={status === UserActionTypes.SIGN_UP_PROCESSING || validation.isvalid === false || userRegisterCheck === false}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
        {status === UserActionTypes.SIGN_UP_SUCCESS ? (
            <Grid item md={12} xs={12} >
            <Snackbar open={true} autoHideDuration={5000}  >
            <Alert severity="success" sx={{ width: '100%' }}>
          Register success
            </Alert>
              </Snackbar>

            </Grid>
          ) : null}
      </Container>
  </Box>
</Paper>
 
  );
}
const mapStateToProp = createStructuredSelector({
  status: selectRegisterStatus,
});

const mapDispatchToProp = (dispatch) => ({
  register: (registerInfo) => dispatch(signUpStart(registerInfo)),
});

export default connect(mapStateToProp, mapDispatchToProp)(SignUp);
