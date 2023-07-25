import "./detailsorder.scss"
import Sidebar from './../../../components/adminComponents/sidebar/Sidebar';
import Navbar from "../../../components/adminComponents/navbar/Navbar";
import { Container, Grid, Paper, TextField, TableRow, TableBody, TableCell, TableContainer, TableHead, Table, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useState } from 'react';

const DetailsOrder = ({ title }) => {

  let navigate = useNavigate();

  const { orderId } = useParams();

  const dataOrder = useSelector((state) => state.orders.orders);
  console.log(dataOrder)

  const detailOrder = dataOrder.find(id => id.orderId === orderId);

  const dataOrderDetail = useSelector((state) => state.orderdetails.orderDetails)
  console.log("dataOrderDetail", dataOrderDetail)


  const singleOrderDetails = dataOrderDetail.filter(id => id.detailOrderId === orderId)



  const [order, setOrder] = useState({
    orderId: detailOrder.orderId,
    orderUserId: detailOrder.orderUserId,
    orderAddress: detailOrder.orderAddress,
    orderDescription: detailOrder.orderDescription,
    orderCreateDate: detailOrder.orderCreateDate,
    orderStatus: detailOrder.orderStatus,
    orderPaymentMethods: detailOrder.orderPaymentMethods,
    orderDeliveryType: detailOrder.orderDeliveryType,
  });

  const dataUser = useSelector((state) => state.users.users)

  const detailUser = dataUser.find(id => id.userId === order.orderUserId);
  // const [orderdetail, setOrderDetail] = useState([
  //   {
  //     detailId: singleOrderDetails.detailId,
  //     detailOrderId: singleOrderDetails.detailOrderId,
  //     detailProductId: singleOrderDetails.detailProductId,
  //     detailPrice: singleOrderDetails.detailPrice,
  //     detailQuantity: singleOrderDetails.detailQuantity,
  //     detailProductName: singleOrderDetails.detailProductName,
  //   }
  // ]);
  // console.log("orderdetail", orderdetail)




  function createData(detailId, detailProductId, detailProductName, detailQuantity, detailPrice) {
    const sum = sumRow(detailQuantity, detailPrice);
    return { detailId, detailProductId, detailProductName, detailQuantity, detailPrice, sum };
  }

  const rows = singleOrderDetails.map(item => createData(item.detailId, item.detailProductId, item.detailProductName, item.detailQuantity, item.detailPrice))



  function sumRow(detailQuantity, detailPrice) {
    return detailQuantity * detailPrice;
  }


  function subtotal(items) {
    return items.map(({ sum }) => sum).reduce((total, i) => total + i, 0)
  }



  const invoiceSubtotal = subtotal(rows);

  return (
    <div className="detailsorder">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <h1>{title}{order.orderId}</h1>
        </div>
        <div className="bottom">
          <Container>
            <Paper>
              <Grid container spacing={2}>

                <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                  <TextField label="Order Id" type="text" fullWidth size="small" name="detailOrderId" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} value={order.orderId}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                  <TextField label="Order User" type="text" fullWidth size="small" name="orderUserId" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} value={detailUser.userFullName}
                  ></TextField>
                </Grid>

              </Grid>
            </Paper>
            <TableContainer component={Paper} sx={{ margin: 0.5 }}>
              <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell align="left">Product ID</TableCell>
                    <TableCell align="left">Product Name</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="left">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.detailId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.detailId}
                      </TableCell>
                      <TableCell align="left">{row.detailProductId}</TableCell>
                      <TableCell align="left">{row.detailProductName}</TableCell>
                      <TableCell align="left">{row.detailPrice}</TableCell>
                      <TableCell align="left">{row.detailQuantity}</TableCell>
                      <TableCell align="left">{row.sum}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">{invoiceSubtotal}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Grid item>
              <Button sx={{ marginLeft: 60, marginBottom: 1 }} variant="contained" color="error"
                onClick={() => { navigate("/admin/orders") }} >Back</Button>
            </Grid>
          </Container>

        </div>
      </div>
    </div>
  )
}

export default DetailsOrder