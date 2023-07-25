import "./createassistant.scss";
import Sidebar from "./../../../components/adminComponents/sidebar/Sidebar";
import Navbar from "../../../components/adminComponents/navbar/Navbar";
import { useState, useEffect } from "react";
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
  Stack,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import validate from "validate.js";
import ErrorIcon from "@mui/icons-material/Error";
import SuccessDialog from "./../../../components/adminComponents/dialog/successDialog";
import baseURL from "../../../baseurl";

const CreateAssistant = ({ title }) => {
  let navigate = useNavigate();
  const date = new Date();
  const [checkImg, setCheckImg] = useState(false);

  const [assistant, setAssistant] = useState({
    userName: "",
    password: "",
    userFullName: "",
    userEmail: "",
    userPhone: "",
    userGender: true,
    userAvatar: "",
    userAddress: "",
    userRole: 2,
    updatedAt: date,
  });

  const [success, setSuccess] = useState(false);

  const api = axios.create({
    baseURL: baseURL + "api/Users/CreateUser",
  });

  const handleChange = (event) => {
    setAssistant((preState) => ({
      ...preState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleImage = (event) => {
    setAssistant((preAssist) => ({
      ...preAssist,
      userAvatar: event.target.files[0],
    }));
  };

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  let formData = new FormData();

  const obj = {
    userName: assistant.userName,
    password: assistant.password,
    userFullName: assistant.userFullName,
    userEmail: assistant.userEmail,
    userPhone: assistant.userPhone,
    userGender: assistant.userGender,
    userAddress: assistant.userAddress,
    userRole: assistant.userRole,
    updatedAt: assistant.updatedAt,
  };
  formData.append("userJson", JSON.stringify(obj));
  formData.append("files", assistant.userAvatar);

  const handleCreate = async () => {
    await api.post("/", formData, config);
    setSuccess(true);
  };

  //#region validation
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isValid: false,
  });

  useEffect(() => {
    const schema = {
      userName: {
        presence: {
          allowEmpty: false,
          message: "^User name is required",
        },
        format: {
          pattern: "[a-z0-9]+",
          flags: "i",
          message: "User name can only contain a-z and 0-9",
        },
        length: {
          maximum: 50,
          minimum: 6,
          message: "^User name must be from 6 to 50 character",
        },
      },
      password: {
        presence: {
          allowEmpty: false,
          message: "^Password price is required",
        },
        length: {
          maximum: 50,
          minimum: 6,
          message: "^Password must be from 6 to 50 character",
        },
      },
      userFullName: {
        presence: {
          allowEmpty: false,
          message: "^Full name is required",
        },
        format: {
          pattern: "[a-z 0-9]+",
          flags: "i",
          message: "User name can only contain a-z , 0-9 and whitespace",
        },
      },
      userPhone: {
        presence: {
          allowEmpty: false,
          message: "^Phone number is required",
        },
        numericality: {
          onlyInteger: true,
          message: "^Phone number must be number",
        },
        length: {
          is: 10,
          message: "^Phone number must be 10 digit number",
        },
      },
      userAddress: {
        presence: {
          allowEmpty: false,
          message: "^Address is required",
        },
      },
    };
    const errors = validate.validate(assistant, schema);
    setValidation((pre) => ({
      ...pre,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [assistant]);

  useEffect(() => {
    if (assistant.userAvatar !== "") {
      setCheckImg(false);
    } else {
      setCheckImg(true);
    }
  });

  const checkValid = () => {
    if (validation.isValid === false) {
      return true;
    } else if (assistant.userAvatar === "") {
      return true;
    }
    return false;
  };

  return (
    <div className="createassistant">
      <Sidebar />
      <div className="createContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                assistant.userAvatar
                  ? URL.createObjectURL(assistant.userAvatar)
                  : require("../../../assets/images/no-image-icon-0.jpg")
              }
              alt=""
            />
            {checkImg === true ? (
              <FormHelperText className="text">
                <ErrorIcon fontSize="small" />
                Image can not blank
              </FormHelperText>
            ) : null}
          </div>
          <div className="right">
            <Container>
              {success === true ? (
                <SuccessDialog page="users" success={true} />
              ) : (
                <Paper>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="User Name"
                        type="text"
                        fullWidth
                        size="small"
                        placeholder="LKHONG"
                        name="userName"
                        onChange={handleChange}
                      ></TextField>
                      {hasError("userName") ? (
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          className="text"
                        >
                          <ErrorIcon fontSize="small" />
                          {validation.errors.userName[0]}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        size="small"
                        name="password"
                        onChange={handleChange}
                      ></TextField>
                      {hasError("password") ? (
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          className="text"
                        >
                          <ErrorIcon fontSize="small" />
                          {validation.errors.password[0]}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="Full Name"
                        type="text"
                        fullWidth
                        size="small"
                        placeholder="LY KIEN HONG"
                        name="userFullName"
                        onChange={handleChange}
                      ></TextField>
                      {hasError("userFullName") ? (
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          className="text"
                        >
                          <ErrorIcon fontSize="small" />
                          {validation.errors.userFullName[0]}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        size="small"
                        placeholder="LYKIENHONG@GMAIL.COM"
                        name="userEmail"
                        onChange={handleChange}
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
                        onChange={handleChange}
                      ></TextField>
                      {hasError("userPhone") ? (
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          className="text"
                        >
                          <ErrorIcon fontSize="small" />
                          {validation.errors.userPhone[0]}
                        </FormHelperText>
                      ) : null}
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
                        onChange={handleChange}
                      ></TextField>
                      {hasError("userAddress") ? (
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          className="text"
                        >
                          <ErrorIcon fontSize="small" />
                          {validation.errors.userAddress[0]}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            Role
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="userRole"
                            value={assistant.userRole}
                            label="Role"
                            name="userRole"
                            onChange={handleChange}
                          >
                            <MenuItem value={2}>Assistant</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <Stack direction="row" spacing={2}>
                        <Button variant="contained" component="label">
                          Upload Images
                          <input
                            hidden
                            accept="image/*"
                            id="userAvatar"
                            type="file"
                            onChange={handleImage}
                            name="userAvatar"
                          />
                        </Button>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">
                          Gender
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="userGender"
                          value={assistant.userGender}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label="MALE"
                          />
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="FEMALE"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <Button
                        sx={{ marginLeft: 40, marginBottom: 1 }}
                        variant="contained"
                        onClick={handleCreate}
                        disabled={checkValid()}
                      >
                        Create
                      </Button>
                      <Button
                        sx={{ marginLeft: 1, marginBottom: 1 }}
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
              )}
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssistant;
