import {
  Button,
  Grid,
  Typography,
  Paper,
  Link,
  Container,
  Box,
  Divider,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import baseURL from "../../../baseurl";

import "./hitoryorder.scss";
import api from "../../../api/client.js";
const HistoryOrder = () => {
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: allUser } = await api.get("/api/Users/Users");
      const CurrentUser = localStorage.getItem("userName");

      const listIdUser = allUser.map((user) =>
        user.userName === CurrentUser ? user.userId : null
      );
      const idUser = listIdUser.find((item) => item !== null);

      try {
        const { data: response } = await api.get("/api/Orders/Orders");
        const OrderOfUser = response.map((userOrder) =>
          userOrder.orderUserId === idUser ? userOrder : null
        );

        const OrderOfUserFinal = OrderOfUser.filter((item) => item !== null);

        setData(OrderOfUserFinal);
        console.log("OrderOfUserFinal", OrderOfUserFinal);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  //dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async (e) => {
    try {
      const { data: response } = await api.get(
        `/api/OrderDetails/OrderDetails`
      );

      const listOrder = response.map((list) =>
        list.detailOrderId === e ? list : null
      );
      const listOrderFinal = listOrder.filter((item) => item !== null);
      setDataDetail(listOrderFinal);
      console.log("detail", dataDetail);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    if (dataDetail.length !== 0) {
      setOpen(true);
    }

    console.log("detail", dataDetail);
  }, [dataDetail]);

  const handleClose = () => {
    setOpen(false);
  };
  //
  return (
    <Box class="box">
      <Paper sx={{ padding: 5 }}>
        <Typography variant="h2" align="center">
          List <b style={{ color: "yellow" }}>order</b>
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          {data.map((order, index) => (
            <Grid item xs={12} md={12} key={index}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} key={index}>
                  <Typography>ID : {order.orderId}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography>
                    Type delivery :{" "}
                    {order.orderDeliveryType === 1
                      ? "Delivery by post"
                      : "Express delivery"}
                  </Typography>
                  <Typography>
                    Payment method :
                    {order.orderPaymentMethods === 1
                      ? "Creadit"
                      : order.orderPaymentMethods === 2
                      ? "Debit"
                      : "Paypal"}
                  </Typography>
                  <Typography>
                    Status:
                    {order.orderStatus === 1
                      ? "Order confirmation"
                      : order.orderStatus === 2
                      ? "Delivering"
                      : "Successful delivery"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography>Total : {order.orderTotal}</Typography>
                </Grid>

                <Grid item xs={12} md={2}>
                  <Link align="center">
                    <Button onClick={(e) => handleClickOpen(order.orderId, e)}>
                      Detail
                    </Button>
                  </Link>
                </Grid>
                <Divider />
              </Grid>
              <Divider sx={{ marginY: 5 }} />
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          BackdropProps={{ style: { backgroundColor: "transparent" } }}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Order detail"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ padding: 5 }}>
              {dataDetail.map((detail, index) => (
                <Grid container columnSpacing={5}>
                  <Grid item xs={12} md={6} key={index}>
                    <img
                      src={baseURL + detail.detailProductImage}
                      srcSet={baseURL + detail.detailProductImage}
                      style={{ width: "150px" }}
                      alt="Book"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ marginBottom: 5 }}>
                    <Typography>
                      Product name : {detail.detailProductName}
                    </Typography>
                    <Typography>Quantity : {detail.detailQuantity}</Typography>

                    <Typography style={{ fontWeight: 500 }}>
                      Price : ${detail.detailPrice}{" "}
                    </Typography>
                    <Typography>
                      Total : ${detail.detailQuantity * detail.detailPrice}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default HistoryOrder;
