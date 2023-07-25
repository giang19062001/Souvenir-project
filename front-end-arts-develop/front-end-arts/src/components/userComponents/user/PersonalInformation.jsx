import { Box, Button, Grid, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import baseURL from "../../../baseurl";

import React, { useState } from "react";
import "./personalInfomation.scss";
import api from "../../../api/client.js";
import { selectUserInfo } from "../../../redux/user/user.selector";
import { saveUserStart, signOutSuccess } from "../../../redux/user/user.action";
import { deleteAllCart } from "../../../redux/cart/cart.action";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import validate from "validate.js";

const PersonalInformation = ({
  user,
  logOut,
  saveUser,
  deldeteCartAfterLogout,
}) => {
  const [userDetail, setUserDetail] = React.useState({
    userId: "",
    userFullName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",
    userGender: true,
    userAvatar: "",
    Image: [],
  });
  const [userRole, setuserRole] = React.useState(3);

  const [openButton, setOpenButton] = useState(true); // set cho nút savechange

  React.useEffect(() => {
    const fetchData = async () => {
      const { data: allUser } = await api.get("/api/Users/Users");
      const CurrentUser = localStorage.getItem("userName");

      const listIdUser = allUser.map((user) =>
        user.userName === CurrentUser ? user.userId : null
      );
      const idUser = listIdUser.find((item) => item !== null);
      setUserDetail((preState) => ({
        ...preState,
        userId: idUser,
      }));
      try {
        const { data: response } = await api.get(
          `/api/Users/User?id=${idUser}`
        );

        setUserDetail(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleImage = (event) => {
    setOpenButton(false);
    const files = event.target.files;
    console.log(files);
    const images = [];
    const file = files[0];
    images.push(file);

    setUserDetail((preState) => ({
      ...preState,
      Image: images,
    }));
  };
  const handleClick = (event) => {
    event.target.value = "";
  };

  const handleSave = async () => {
    saveUser(userDetail);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    deldeteCartAfterLogout();
    logOut();
  };

  //validation
  // Validation
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  React.useEffect(() => {
    const schema = {
      userFullName: {
        presence: {
          allowEmpty: false,
          message: "^Fullname is required",
        },
        format: {
          pattern: "[a-z A-Z]+",
          flags: "i",
          message: "^Fullname only contain a-z and A-Z",
        },
        length: {
          maximum: 30,
          minimum: 5,
          message: "^Fullname   must be > 5 < 30",
        },
      },
      userAddress: {
        presence: {
          allowEmpty: false,
          message: "^Address is required",
        },
        format: {
          pattern: "[a-z A-Z0-9]+",
          flags: "i",
          message: "^Address  only contain a-z and A-Z and 0-9",
        },
        length: {
          maximum: 50,
          minimum: 5,
          message: "^Address   must be > 5 < 50",
        },
      },
      userEmail: {
        presence: {
          allowEmpty: false,
          message: "^Fullname is required",
        },
        email: {
          message: "^Fullname doesn't look like a valid email",
        },
        length: {
          maximum: 50,
          minimum: 5,
          message: "^Fullname   must be > 5 < 50",
        },
      },
      userPhone: {
        presence: { allowEmpty: false, message: "^userPhone is required" },
        numericality: {
          notInteger: true,
          message: "^Phone must be integer",
        },
        length: {
          minimum: 8,
          maximum: 12,
          message: "^Phone must be > 8 < 12",
        },
      },
    };
    const errors = validate.validate(userDetail, schema);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [userDetail]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  //handleChange
  const handleChangeField = (event) => {
    if (event.target.name === "userGender") {
      let gender = true;
      if (event.target.value === "false") {
        gender = false;
      } else {
        gender = true;
      }
      setUserDetail((preState) => ({
        ...preState,
        userGender: gender,
      }));
    } else {
      setUserDetail((preState) => ({
        ...preState,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      }));
    }
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [event.target.name]: true,
      },
    }));

    setOpenButton(false);
    console.log("openButton", openButton);
    console.log("validation.isvalid", validation.isvalid);
  };

  return (
    <Grid container={true} spacing={2}>
      <Grid item xs={12} md={5}>
        {userDetail.userAvatar === null ? (
          <img
            src={require("../../../assets/images/avatar-1577909_1280.webp")}
            alt=""
            className="imgAvatar"
          />
        ) : (
          <img
            src={baseURL + userDetail.userAvatar}
            srcSet={baseURL + userDetail.userAvatar}
            alt=""
            className="imgAvatar"
          />
        )}

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: 3 }}
        >
          <TextField
            type="file"
            name="userAvartar"
            onChange={handleImage}
            onClick={handleClick}
          ></TextField>
        </Box>
      </Grid>
      <Grid item xs={12} md={7} sx={{ lineHeight: 5 }}>
        <TextField
          label="Fullname"
          variant="standard"
          fullWidth
          value={userDetail.userFullName}
          name="userFullName"
          onChange={handleChangeField}
          onKeyUp={handleChangeField}
          error={hasError("userFullName")}
          helperText={
            hasError("userFullName") ? validation.errors.userFullName[0] : null
          }
        ></TextField>
        <TextField
          label="Phone"
          type="number"
          variant="standard"
          value={userDetail.userPhone}
          name="userPhone"
          onChange={handleChangeField}
          onKeyUp={handleChangeField}
          error={hasError("userPhone")}
          helperText={
            hasError("userPhone") ? validation.errors.userPhone[0] : null
          }
        ></TextField>

        {/* //radio */}
        <FormControl sx={{ marginLeft: 5 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="userGender"
            value={userDetail.userGender}
            onChange={handleChangeField}
          >
            <FormControlLabel value="true" control={<Radio />} label="Female" />
            <FormControlLabel value={false} control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        {/* //radio */}

        <TextField
          label="Email"
          type="email"
          variant="standard"
          fullWidth
          name="userEmail"
          value={userDetail.userEmail}
          onKeyUp={handleChangeField}
          onChange={handleChangeField}
          error={hasError("userEmail")}
          helperText={
            hasError("userEmail") ? validation.errors.userEmail[0] : null
          }
        ></TextField>
        <TextField
          label="Address"
          type="outlined"
          multiline
          rows={4}
          variant="standard"
          name="userAddress"
          value={userDetail.userAddress}
          onKeyUp={handleChangeField}
          fullWidth
          onChange={handleChangeField}
          error={hasError("userAddress")}
          helperText={
            hasError("userAddress") ? validation.errors.userAddress[0] : null
          }
        ></TextField>
        <Button
          disabled={openButton === true || validation.isvalid === false}
          onClick={handleSave}
          className="btnSave"
        >
          Save Change
        </Button>
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="error"
          sx={{ marginLeft: 5 }}
        >
          Log out
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProp = createStructuredSelector({
  user: selectUserInfo,
});

const mapDispatchToProp = (dispatch) => ({
  saveUser: (userInfo) => dispatch(saveUserStart(userInfo)),
  logOut: () => dispatch(signOutSuccess()),
  deldeteCartAfterLogout: () => dispatch(deleteAllCart()),
});

export default connect(mapStateToProp, mapDispatchToProp)(PersonalInformation);
