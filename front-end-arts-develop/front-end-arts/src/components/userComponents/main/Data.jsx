import * as React from "react";
import { useState, useEffect } from "react";
import api from "../../../api/client";
import "./data.scss";

import baseURL from "../../../baseurl";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addItemCart } from "../../../redux/cart/cart.action";
import { createStructuredSelector } from "reselect";

const Data = ({ cartMiddleware }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await api.get("/api/Products/Products");
        console.log(response);
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    const { data: response } = await api.get(`/api/Products/Product?id=${e}`);
    const quantity = 1;
    cartMiddleware({ ...response, quantity });
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center" style={{ marginBottom: 20 }}>
        All <b style={{ color: "yellow" }}>Product</b>
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        {data.map((dataProduct) => (
          <Grid item xs={12} md={3} key={dataProduct.productId}>
            <Link to={`/product-detail/${dataProduct.productId}`}>
              <img
                src={baseURL + dataProduct.productImage}
                srcSet={baseURL + dataProduct.productImage}
                width={200}
                height={200}
                alt=""
                name="image"
                className="img"
              />
            </Link>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              className="btn"
              onClick={(e) => handleAdd(dataProduct.productId, e)}
            >
              Add to cart
            </Button>
            <Typography align="center">{dataProduct.productName}</Typography>

            <Typography align="center">$ {dataProduct.productPrice}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
const mapStateToProp = createStructuredSelector({});

const mapDispatchToProp = (dispatch) => ({
  cartMiddleware: (cartInfo) => dispatch(addItemCart(cartInfo)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Data);
