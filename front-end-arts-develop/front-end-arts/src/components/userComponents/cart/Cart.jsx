import React, { useState, useEffect } from "react";
import "./cart.css";
import {
  Typography,
  TextField,
  Container,
  Link,
  Box,
  Button,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Divider from "@mui/material/Divider";

import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import AlertDialog from "./dialogOrderSuccess";
import AlertDialogFail from "./dialiogCheckoutFail";
import baseURL from "../../../baseurl";

import api from "../../../api/client.js";
import Payment from "../../../api/payment";
import { connect } from "react-redux";
import orderActionType from "../../../redux/order/order.type";
import { addOrder } from "../../../redux/order/order.action";
import { deleteItemCart } from "../../../redux/cart/cart.action";
import { selectShopCart } from "../../../redux/cart/cart.selector";
import { selectOrderStatus } from "../../../redux/order/order.selector";
import { createStructuredSelector } from "reselect";
import validate from "validate.js";

const Cart = ({
  statusOrder,
  cartList,
  deleteCartMiddleware,
  addOrderMiddleware,
}) => {
  const handleDelete = (e) => {
    deleteCartMiddleware(e);
  };

  const [order, setOrder] = useState({
    orderTypeId: "",
    orderUserId: 0,
    orderAddress: "",
    orderDescription: "",
    orderStatus: 1,
    orderPaymentMethods: 1,
    orderDeliveryType: 1,
    orderTotal: 0,
  });
  const [cardPayment, setCardPayment] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });
  const [checkPayment, setCheckPayment] = useState(false);

  const [addressCheck, setAddressCheck] = useState({
    status: true,
    message: "address is require",
  });
  const [openDialog, setOpenDialog] = React.useState(false);

  const [subTotal, setSubTotal] = useState();

  const [productIdFrist, setProductIdFrist] = useState(
    cartList.length > 0 ? cartList[0].productId : 0
  );

  const handleDialog = () => {
    setOpenDialog(true);
  };
  const handleClose = (para) => {
    console.log("para", para);
    setOpenDialog(para);
  };

  useEffect(() => {
    console.log(statusOrder);
    const fetchData = async () => {
      setOrder((preState) => ({
        ...preState,
        orderDescription: "string",
      }));
      const { data: allUser } = await api.get("/api/Users/Users");
      const CurrentUser = localStorage.getItem("userName");

      const listIdUser = allUser.map((user) =>
        user.userName === CurrentUser ? user.userId : null
      );
      const idUser = listIdUser.find((item) => item !== null);
      setOrder((preState) => ({
        ...preState,
        orderUserId: idUser,
      }));

      let subTotal = 0;
      let total = 0;

      let orderIdDeliveryType = "1";
      for (let i = 0; i < cartList.length; i++) {
        subTotal += (await cartList[i].quantity) * cartList[i].productPrice;
      }
      setSubTotal(subTotal);
      if (order.orderDeliveryType === 1) {
        total = subTotal + 60;
        orderIdDeliveryType = "1";
      } else {
        total = subTotal + 150;
        orderIdDeliveryType = "2";
      }
      setOrder((preState) => ({
        ...preState,
        orderTotal: total,
        orderTypeId: orderIdDeliveryType + productIdFrist,
      }));
      console.log(order);
    };
    fetchData();
  }, [cartList.length, order.orderDeliveryType]);

  //handleChange

  const handleChange = (event) => {
    if (event.target.name === "orderPaymentMethods") {
      let orderPaymentMethods = 1;
      if (event.target.value === "1") {
        orderPaymentMethods = 1;
      }
      if (event.target.value === "2") {
        orderPaymentMethods = 2;
      }
      if (event.target.value === "3") {
        orderPaymentMethods = 3;
      }
      setOrder((preState) => ({
        ...preState,
        orderPaymentMethods: orderPaymentMethods,
      }));
    } else {
      setOrder((preState) => ({
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

    console.log(order);
    console.log("addressCheck", addressCheck.status);
  };
  useEffect(() => {
    if (order.orderAddress === "") {
      setAddressCheck({
        status: true,
        message: "address is require",
      });
    } else {
      setAddressCheck({
        status: false,
        message: "",
      });
    }
  }, [order.orderAddress]);

  const handelCheckOut = () => {
    addOrderMiddleware(order);
  };

  // Validation
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  useEffect(() => {
    const schema = {
      nameOnCard: {
        presence: {
          allowEmpty: false,
          message: "^Name on card is required",
        },
        format: {
          pattern: "[a-z A-Z]+",
          flags: "i",
          message: "^Name on card only contain a-z and A-Z",
        },
      },
      expiration: {
        presence: {
          allowEmpty: false,
          message: "^Epiration is required",
        },
        format: {
          pattern: "[0-9/]+",
          flags: "i",
          message: "^Epiration only contain MM/YY",
        },
        length: {
          minimum: 5,
          maximum: 5,
          message: "^Epiration only contain MM/YY",
        },
      },
      cardNumber: {
        presence: { allowEmpty: false, message: "^cardNumber is required" },
        numericality: {
          notInteger: true,
          message: "^CardNumber must be integer",
        },
        length: {
          minimum: 12,
          maximum: 12,
          message: "^CardNumber must be  size 12",
        },
      },
      cvv: {
        presence: { allowEmpty: false, message: "^Cvv is required" },
        numericality: {
          notInteger: true,
          message: "^Cvv must be integer",
        },
        length: {
          minimum: 3,
          maximum: 3,
          message: "^Cvv must be  size 3",
        },
      },
    };

    const errors = validate.validate(cardPayment, schema);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [cardPayment]);

  const handelPaymentCard = (event) => {
    setCardPayment((preState) => ({
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
    console.log(order);
    console.log("validation.isvalid", validation.isvalid);
  };

  useEffect(() => {
    if (
      cardPayment.nameOnCard !== "" &&
      cardPayment.cardNumber !== "" &&
      cardPayment.expiration !== "" &&
      cardPayment.cvv !== ""
    ) {
      for (let i = 0; i < Payment.length; i++) {
        if (
          cardPayment.nameOnCard === Payment[i].nameOnCard &&
          cardPayment.cardNumber === Payment[i].cardNumber &&
          cardPayment.expiration === Payment[i].expiration &&
          cardPayment.cvv === Payment[i].cvv
        ) {
          setCheckPayment(true);
          break;
        } else {
          setCheckPayment(false);
        }
      }
    }
    console.log("checkpayment", checkPayment);
  }, [cardPayment, checkPayment]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  return (
    <Container>
      <Paper
        component="form"
        sx={{
          padding: "2vh",
          marginBottom: "5vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          name="orderAddress"
          onChange={handleChange}
          onKeyUp={handleChange}
          placeholder="Search Google Maps"
          fullWidth
          required
          error={addressCheck.status}
          helperText={addressCheck.message}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="center">Price&nbsp;($)</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography
                    textAlign={"center"}
                    variant="h4"
                    sx={{ marginY: 5 }}
                  >
                    You don't have item in cart
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}
            {cartList.map((cart, index) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={index}
              >
                <TableCell>
                  <img
                    src={baseURL + cart.productImage}
                    srcSet={baseURL + cart.productImage}
                    style={{ width: "120px" }}
                    alt="Book"
                  />
                </TableCell>
                <TableCell>
                  <Typography>{cart.productName}</Typography>
                </TableCell>

                <TableCell>
                  <Typography>{cart.quantity}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" style={{ fontWeight: 500 }}>
                    ${cart.productPrice}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Link align="center">
                    <Button
                      style={{ color: "red" }}
                      onClick={(e) => handleDelete(cart.productId, e)}
                    >
                      Delete
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid
        container
        sx={{
          marginTop: 5,
          padding: 5,
          border: 1,
          borderRadius: 5,
          borderStyle: "dotted",
        }}
      >
        <Grid item md={4}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Card</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="orderPaymentMethods"
              value={order.orderPaymentMethods}
              onChange={handleChange}
            >
              <Grid container>
                <Grid item md={4}>
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Credit"
                  />
                  <i className="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>
                </Grid>
                <Grid item md={4}>
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Debit"
                  />
                  <i className="fab fa-cc-visa fa-2x fa-lg text-dark pe-2"></i>
                </Grid>
                <Grid item md={4}>
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Paypal"
                  />
                  <i className="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2"></i>
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
          <Box sx={{ minWidth: 120, marginBottom: 2, marginTop: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ship</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Ship"
                value={order.orderDeliveryType}
                name="orderDeliveryType"
                onChange={handleChange}
              >
                <MenuItem value={1}>Express delivery- €60.00</MenuItem>
                <MenuItem value={2}>Delivery by post- €150.00</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={8} align="center">
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item md={6}>
              <TextField
                type="text"
                name="nameOnCard"
                label="Name on card"
                placeholder="John Smith"
                onChange={handelPaymentCard}
                onKeyUp={handelPaymentCard}
                error={hasError("nameOnCard")}
                helperText={
                  hasError("nameOnCard")
                    ? validation.errors.nameOnCard[0]
                    : null
                }
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                type="texts"
                name="expiration"
                placeholder="MM/YY"
                label="Expiration"
                onChange={handelPaymentCard}
                onKeyUp={handelPaymentCard}
                error={hasError("expiration")}
                helperText={
                  hasError("expiration")
                    ? validation.errors.expiration[0]
                    : null
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                type="text"
                name="cardNumber"
                label="Card Number"
                placeholder="1111 2222 3333"
                onChange={handelPaymentCard}
                onKeyUp={handelPaymentCard}
                error={hasError("cardNumber")}
                helperText={
                  hasError("cardNumber")
                    ? validation.errors.cardNumber[0]
                    : null
                }
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                type="text"
                name="cvv"
                label="Cvv"
                placeholder="&#9679;&#9679;&#9679;"
                onChange={handelPaymentCard}
                onKeyUp={handelPaymentCard}
                error={hasError("cvv")}
                helperText={hasError("cvv") ? validation.errors.cvv[0] : null}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item md={3}>
              <Typography>Subtotal</Typography>
              <Typography>${subTotal}</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography>Shipping</Typography>
              <Typography>
                $ {order.orderDeliveryType === 1 ? 60 : 150}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography>Total</Typography>
              <Typography>${order.orderTotal}</Typography>
            </Grid>
            <Grid item md={3}>
              {checkPayment === false ? (
                <Button type="button" variant="outlined" onClick={handleDialog}>
                  Check out
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handelCheckOut}
                  disabled={addressCheck.status === true}
                >
                  Check out
                </Button>
              )}
              {openDialog === true ? (
                <AlertDialogFail
                  status={openDialog}
                  onClick={handleClose}
                ></AlertDialogFail>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {statusOrder === orderActionType.ADD_ORDER_SUCCESS ? (
        <AlertDialog></AlertDialog>
      ) : null}
    </Container>
  );
};
const mapStateToProp = createStructuredSelector({
  cartList: selectShopCart,
  statusOrder: selectOrderStatus,
});

const mapDispatchToProp = (dispatch) => ({
  deleteCartMiddleware: (idItem) => dispatch(deleteItemCart(idItem)),
  addOrderMiddleware: (orderInfo) => dispatch(addOrder(orderInfo)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Cart);
