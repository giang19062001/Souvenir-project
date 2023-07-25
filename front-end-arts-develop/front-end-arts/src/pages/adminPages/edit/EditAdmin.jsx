import "./editadmin.scss"
import Sidebar from './../../../components/adminComponents/sidebar/Sidebar';
import Navbar from "../../../components/adminComponents/navbar/Navbar";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router';

const EditAdmin = ({title}) => {

  const {idUser} = useParams();
  console.log(idUser)

  const [role, setRole] = useState("2");
  const [file,setFile] = useState("");
  const [value, setValue] = useState(true);
  let navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };



  return (
    <div className="editadmin">
      <Sidebar/>
      <div className="editContainer">
        <Navbar/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : require('../../../assets/images/no-image-icon-0.jpg')} alt=""/>
          </div>
          <div className="right">
            <Container>
              <Paper>
                <Grid container spacing={2}> 
                            <Grid item xs={12} md={12} sx={{margin:0.5}}>
                                <TextField label="Full Name" type="text" fullWidth size="small" placeholder="LY KIEN HONG" name="userFullName" InputLabelProps={{shrink: true}} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{margin:0.5}}>
                                <TextField label="Email" type="email" fullWidth size="small" placeholder="LYKIENHONG@GMAIL.COM" name="userEmail" InputLabelProps={{shrink: true}} ></TextField>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{margin:0.5}}>
                                <TextField label="Telephone" type="text" fullWidth size="small" placeholder="0938887777" name="userPhone" InputLabelProps={{shrink: true}}></TextField>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{margin:0.5}}>
                                <TextField label="Address" type="text" fullWidth size="small" name="userAddress" placeholder="590 CMT8" multiline InputLabelProps={{shrink: true}}
                            ></TextField>
                            </Grid>
                  <Grid item xs={12} md={12} sx={{margin:0.5}}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Role"
                            onChange={handleChangeRole}
                            name="userRole"
                            >
                            <MenuItem value={1}>Assistant</MenuItem>
                            <MenuItem value={2}>User</MenuItem>
                            </Select>
                        </FormControl>
                      </Box>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{margin:0.5}}>
                    <Stack direction="row"spacing={2}>
                      <Button variant="contained" component="label">
                        Upload Images
                        <input hidden accept="image/*" id="file" type="file" onChange={e=>setFile(e.target.files[0])} name="userAvatar"/>
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{margin:0.5}}>
                    <FormControl>
                      <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                        <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="userGender"
                        value={value}
                        onChange={handleChange}>
                          <FormControlLabel value= {true} control={<Radio />} label="MALE" />
                          <FormControlLabel value= {false} control={<Radio />} label="FEMALE" />
                        </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button sx={{marginLeft:40,marginBottom:1}} variant="contained" color="warning">Edit</Button>
                    <Button sx={{marginLeft:1,marginBottom:1}} variant="contained" color="error"
                                onClick={() => { navigate("/admin/users")}} >Back</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditAdmin