import Navbar from "../../../components/adminComponents/navbar/Navbar";
import Sidebar from "../../../components/adminComponents/sidebar/Sidebar";
import "./detailsproduct.scss";
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
//import axios from 'axios';

const DetailsProduct = ({ title }) => {
  let navigate = useNavigate();

  const { productId } = useParams();

  // const api = axios.create({
  //   baseURL : "baseURL + "api/Products/Product?id="+productId
  // })

  const dataProduct = useSelector((state) => state.products.products);

  const detailProduct = dataProduct.find((id) => id.productId === productId);

  const dataCategory = useSelector((state) => state.category.categories);
  console.log(dataCategory);

  const [product, setProduct] = useState({
    productId: detailProduct.productId,
    productName: detailProduct.productName,
    productPrice: detailProduct.productPrice,
    productQuantity: detailProduct.productQuantity,
    productShortDescription: detailProduct.productShortDescription,
    productLongDescription: detailProduct.productLongDescription,
    productImage: detailProduct.productImage,
    categoryId: detailProduct.categoryId,
    productStatus: detailProduct.productStatus,
  });

  const detailCate = dataCategory.find(
    (e) => e.categoryId === product.categoryId
  );

  return (
    <div className="detailsproduct">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <h1>
            {title}
            {product.productName}
          </h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={baseURL + product.productImage} alt="" />
          </div>
          <div className="right">
            <Container>
              <Paper>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Product ID"
                      type="text"
                      fullWidth
                      size="small"
                      name="productId"
                      value={product.productId}
                      InputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Product Name"
                      type="text"
                      fullWidth
                      size="small"
                      name="productName"
                      value={product.productName}
                      InputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Price"
                      type="number"
                      fullWidth
                      size="small"
                      name="productPrice"
                      value={product.productPrice}
                      InputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Quantity"
                      type="number"
                      fullWidth
                      size="small"
                      name="productQuantity"
                      value={product.productQuantity}
                      InputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Short description"
                      type="text"
                      fullWidth
                      size="small"
                      name="productShortDescription"
                      value={product.productShortDescription}
                      InputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Long Description"
                      type="text"
                      fullWidth
                      size="small"
                      name="productLongDescription"
                      value={product.productLongDescription}
                      InputProps={{ readOnly: true }}
                      InputLabelProps={{ shrink: true }}
                      multiline
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product.categoryId}
                        label="Category"
                        name="categoryId"
                        disabled
                      >
                        <MenuItem value={detailCate.categoryId}>
                          {detailCate.categoryName}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Product Status
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="productStatus"
                      value={product.productStatus}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="IN STOCK"
                        disabled
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="OUT OF STOCK"
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
                      navigate("/admin/products");
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              </Paper>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
