import Navbar from "../../../components/adminComponents/navbar/Navbar";
import Sidebar from "../../../components/adminComponents/sidebar/Sidebar";
import "./editorder.scss";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import UpdateSuccessDialog from "./../../../components/adminComponents/dialog/updateSuccess";
import baseURL from "../../../baseurl";

const EditOrder = ({ title }) => {
  let navigate = useNavigate();

  const { orderId } = useParams();

  const date = new Date();

  const api = axios.create({
    baseURL: baseURL + "api/Orders/UpdateOrder",
  });

  const dataOrder = useSelector((state) => state.orders.orders);

  const detailOrder = dataOrder.find((id) => id.orderId === orderId);

  const [order, setOrder] = useState({
    orderId: detailOrder.orderId,
    orderUserId: detailOrder.orderUserId,
    orderAddress: detailOrder.orderAddress,
    orderDescription: detailOrder.orderDescription,
    orderCreateDate: detailOrder.orderCreateDate,
    orderStatus: detailOrder.orderStatus,
    orderPaymentMethods: detailOrder.orderPaymentMethods,
    orderDeliveryType: detailOrder.orderDeliveryType,
    updatedAt: date,
  });

  const [success, setSuccess] = useState(false);

  const handleEdit = async () => {
    await api.post("/", order);
    setSuccess(true);
  };

  const handleChange = (event) => {
    setOrder((preState) => ({
      ...preState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };

  return (
    <div className="editorder">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1>
            {title}
            {order.orderId}
          </h1>
        </div>
        <div className="bottom">
          <Container>
            {success === true ? (
              <UpdateSuccessDialog page="orders" success={true} />
            ) : (
              <Paper>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Order ID"
                      type="text"
                      fullWidth
                      size="small"
                      name="orderId"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                      value={order.orderId}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="User"
                      type="text"
                      fullWidth
                      size="small"
                      name="orderUserId"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                      value={order.orderUserId}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Address"
                      type="text"
                      fullWidth
                      size="small"
                      name="orderAddress"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                      value={order.orderAddress}
                    ></TextField>
                  </Grid>

                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Order date"
                      type="datetime-local"
                      fullWidth
                      size="small"
                      name="orderCreateDate"
                      InputLabelProps={{ shrink: true }}
                      value={order.orderCreateDate}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Description"
                      type="text"
                      fullWidth
                      size="small"
                      name="orderDescription"
                      multiline
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                      value={order.orderDescription}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Order Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={order.orderStatus}
                          label="Status"
                          name="orderStatus"
                          onChange={handleChange}
                        >
                          <MenuItem value={1}>CONFIRMING</MenuItem>
                          <MenuItem value={2}>ON PROCESS</MenuItem>
                          <MenuItem value={3}>ON DELIVERY</MenuItem>
                          <MenuItem value={4}>DELIVERED</MenuItem>
                          <MenuItem value={5}>CANCELED</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Payment Method
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={order.orderPaymentMethods}
                          label="Payment"
                          name="orderPaymentMethods"
                          disabled
                        >
                          <MenuItem value={1}>CREDIT CARD</MenuItem>
                          <MenuItem value={2}>DEBIT CARD</MenuItem>
                          <MenuItem value={2}>PAYPAL</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Delivery Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={order.orderDeliveryType}
                          label="Delivery"
                          name="orderDeliveryType"
                          disabled
                        >
                          <MenuItem value={1}>EXPRESS</MenuItem>
                          <MenuItem value={2}>POST</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Button
                      sx={{ marginLeft: 40, marginBottom: 1 }}
                      variant="contained"
                      color="warning"
                      onClick={handleEdit}
                    >
                      Update Status
                    </Button>
                    <Button
                      sx={{ marginLeft: 1, marginBottom: 1 }}
                      variant="contained"
                      color="error"
                      onClick={() => {
                        navigate("/admin/orders");
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
  );
};

export default EditOrder;
