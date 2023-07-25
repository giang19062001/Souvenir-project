import "./detailsadmin.scss";
import Sidebar from "./../../../components/adminComponents/sidebar/Sidebar";
import Navbar from "./../../../components/adminComponents/navbar/Navbar";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import baseURL from "../../../baseurl";

const DetailsAdmin = ({ title }) => {
  let navigate = useNavigate();

  const { userId } = useParams();
  const intUserId = parseInt(userId);

  const dataUser = useSelector((state) => state.users.users);

  const detailUser = dataUser.find((id) => id.userId === intUserId);

  const [user, setUser] = useState({
    userId: detailUser.userId,
    userName: detailUser.userName,
    userFullName: detailUser.userFullName,
    userEmail: detailUser.userEmail,
    userPhone: detailUser.userPhone,
    userGender: detailUser.userGender,
    userAvatar: detailUser.userAvatar,
    userAddress: detailUser.userAddress,
    userRole: detailUser.userRole,
  });

  return (
    <div className="detailsadmin">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <h1>
            {title}
            {user.userFullName}
          </h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                user.userFullName
                  ? baseURL + user.userAvatar
                  : require("../../../assets/images/avatar-1577909_1280.webp")
              }
              alt=""
            />
          </div>
          <div className="right">
            <Container>
              <Paper>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="User ID"
                      type="text"
                      fullWidth
                      size="small"
                      name="userId"
                      value={user.userId}
                      InputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="User Name"
                      type="text"
                      fullWidth
                      size="small"
                      placeholder="HONG"
                      name="userName"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                      value={user.userName}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Full Name"
                      type="text"
                      fullWidth
                      size="small"
                      placeholder="LY KIEN HONG"
                      name="userFullName"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                      value={user.userFullName}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                      size="small"
                      placeholder="LYKIENHONG@GMAIL.COM"
                      name="userEmail"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                      value={user.userEmail}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Telephone"
                      type="text"
                      fullWidth
                      size="small"
                      placeholder="0938887777"
                      name="userPhone"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                      value={user.userPhone}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Address"
                      type="text"
                      fullWidth
                      size="small"
                      name="userAddress"
                      placeholder="590 CMT8"
                      multiline
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                      value={user.userAddress}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth size="small" disabled>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={user.userRole}
                          label="Role"
                          name="userRole"
                        >
                          <MenuItem value={1}>Admin</MenuItem>
                          <MenuItem value={2}>Assistant</MenuItem>
                          <MenuItem value={3}>User</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <FormControl>
                      <FormLabel id="demo-controlled-radio-buttons-group">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="userGender"
                        value={user.userGender}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="MALE"
                          disabled
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="FEMALE"
                          disabled
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button
                      sx={{ marginLeft: 40, marginBottom: 1 }}
                      variant="contained"
                      color="error"
                      onClick={() => {
                        navigate("/admin/users");
                      }}
                    >
                      Back
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsAdmin;
