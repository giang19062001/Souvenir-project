import React from "react";
import api from "../../../api/client";
import "./productDetailUser.css";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import baseURL from "../../../baseurl";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addItemCart } from "../../../redux/cart/cart.action";
import { createStructuredSelector } from "reselect";

const ProductDetailUser = ({ cartMiddleware }) => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await api.get(
          `/api/Products/Product?id=${params.id}`
        );
        console.log(response);
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const handleChange = (event) => {
    console.log(event.target.value);
    setQuantity(event.target.value);
  };
  const handleAdd = async () => {
    const { data: response } = await api.get(
      `/api/Products/Product?id=${params.id}`
    );
    console.log("item", response);
    cartMiddleware({ ...response, quantity });
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img
            className="img"
            src={baseURL + data.productImage}
            srcSet={baseURL + data.productImage}
            alt=""
            width={500}
            height={400}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ marginBottom: 2 }}>
            {data.productName}
          </Typography>
          <Typography align="justify" sx={{ marginBottom: 1 }}>
            {data.productShortDescription}
          </Typography>
          <Divider />
          <Typography align="justify" sx={{ marginY: 1 }}>
            {data.productLongDescription}
          </Typography>
          <Typography
            style={{ color: "red" }}
            variant="h5"
            sx={{ marginBottom: 2 }}
          >
            $ {data.productPrice}
          </Typography>
          <Grid container>
            <Grid item xs={12} md={6}>
              <TextField
                className="inputQuantity"
                type="number"
                name="quantity"
                onClick={handleChange}
                defaultValue={1}
                size="small"
                onKeyUp={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                className="btn"
                onClick={handleAdd}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
const mapStateToProp = createStructuredSelector({});

const mapDispatchToProp = (dispatch) => ({
  cartMiddleware: (cartInfo) => dispatch(addItemCart(cartInfo)),
});

export default connect(mapStateToProp, mapDispatchToProp)(ProductDetailUser);
