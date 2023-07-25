import Sidebar from "../../../components/adminComponents/sidebar/Sidebar";
import "./editproduct.scss";
import Navbar from "./../../../components/adminComponents/navbar/Navbar";
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
} from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import validate from "validate.js";
import ErrorIcon from "@mui/icons-material/Error";
import { FormHelperText } from "@mui/material";
import UpdateSuccessDialog from "./../../../components/adminComponents/dialog/updateSuccess";
import baseURL from "../../../baseurl";

const EditProduct = ({ title }) => {
  let navigate = useNavigate();

  const { productId } = useParams();

  const date = new Date();

  const api = axios.create({
    baseURL: baseURL + "api/Products/UpdateProduct",
  });

  const dataProduct = useSelector((state) => state.products.products);

  const category = useSelector((state) => state.category);

  const detailProduct = dataProduct.find((id) => id.productId === productId);

  const [product, setProduct] = useState({
    productId: detailProduct.productId,
    productName: detailProduct.productName,
    productPrice: detailProduct.productPrice,
    productQuantity: detailProduct.productQuantity,
    productImage: detailProduct.productImage,
    productShortDescription: detailProduct.productShortDescription,
    productLongDescription: detailProduct.productLongDescription,
    productStatus: detailProduct.productStatus,
    categoryId: detailProduct.categoryId,
    updatedAt: date,
    newImage: "",
  });

  console.log(detailProduct.newImage);
  console.log("dataproduct", dataProduct);

  const [success, setSuccess] = useState(false);

  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isValid: false,
  });

  const handleImg = (event) => {
    setProduct((prePro) => ({
      ...prePro,
      newImage: event.target.files[0],
    }));
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  let formData = new FormData();

  const obj = {
    productId: product.productId,
    productName: product.productName,
    productPrice: product.productPrice,
    productQuantity: product.productQuantity,
    productImage: product.productImage,
    productShortDescription: product.productShortDescription,
    productLongDescription: product.productLongDescription,
    categoryId: product.categoryId,
    productStatus: product.productStatus,
    updatedAt: product.updatedAt,
  };
  formData.append("productJson", JSON.stringify(obj));
  formData.append("files", product.newImage);

  const handleEdit = async () => {
    await api.post("/", formData, config);
    setSuccess(true);
  };

  const handleChange = (event) => {
    setProduct((preState) => ({
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

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  useEffect(() => {
    const schema = {
      productName: {
        presence: {
          allowEmpty: false,
          message: "^Product name is required",
        },
        length: {
          maximum: 50,
          minimum: 5,
          message: "^Product name must be from 5 to 50 character",
        },
        format: {
          pattern: "[a-z 0-9]+",
          flags: "i",
          message: "can only contain a-z , 0-9 and white space",
        },
      },
      productPrice: {
        presence: {
          allowEmpty: false,
          message: "^Product price is required",
        },
        numericality: {
          onlyInteger: true,
          greaterThan: 0,
          lessThanOrEqualTo: 100000,
          message: "^Product price must be integer and between 1-10000",
        },
      },
      productQuantity: {
        presence: {
          allowEmpty: false,
          message: "^Product quantity is required",
        },
        numericality: {
          onlyInteger: true,
          greaterThan: 0,
          lessThanOrEqualTo: 1000,
          message: "^Product price must be integer and between 1-1000",
        },
      },
    };
    const errors = validate.validate(product, schema);
    setValidation((pre) => ({
      ...pre,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [product]);

  return (
    <div className="editproduct">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                product.newImage
                  ? URL.createObjectURL(product.newImage)
                  : baseURL + product.productImage
              }
              alt=""
            />
          </div>
          <div className="right">
            <Container>
              {success === true ? (
                <UpdateSuccessDialog page="products" success={true} />
              ) : (
                <Paper>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="Product ID"
                        type="text"
                        fullWidth
                        size="small"
                        name="productId"
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                        value={product.productId}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="Product Name"
                        type="text"
                        fullWidth
                        size="small"
                        placeholder="Glass"
                        name="productName"
                        InputLabelProps={{ shrink: true }}
                        value={product.productName}
                        onChange={handleChange}
                      ></TextField>
                      {hasError("productName") ? (
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          className="text"
                        >
                          <ErrorIcon fontSize="small" />
                          {validation.errors.productName[0]}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        size="small"
                        placeholder="0"
                        name="productPrice"
                        InputLabelProps={{ shrink: true }}
                        value={product.productPrice}
                        onChange={handleChange}
                      ></TextField>
                      {hasError("productPrice") ? (
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          className="text"
                        >
                          <ErrorIcon fontSize="small" />
                          {validation.errors.productPrice[0]}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        size="small"
                        placeholder="0"
                        name="productQuantity"
                        InputLabelProps={{ shrink: true }}
                        value={product.productQuantity}
                        onChange={handleChange}
                      ></TextField>
                      {hasError("productQuantity") ? (
                        <FormHelperText
                          id="outlined-weight-helper-text"
                          className="text"
                        >
                          <ErrorIcon fontSize="small" />
                          {validation.errors.productQuantity[0]}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="Short description"
                        type="text"
                        fullWidth
                        size="small"
                        placeholder="....."
                        name="productShortDescription"
                        InputLabelProps={{ shrink: true }}
                        value={product.productShortDescription}
                        onChange={handleChange}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="Long Description"
                        type="text"
                        fullWidth
                        size="small"
                        name="productLongDescription"
                        placeholder="......"
                        multiline
                        InputLabelProps={{ shrink: true }}
                        value={product.productLongDescription}
                        onChange={handleChange}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Category
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={product.categoryId}
                            label="Category"
                            name="categoryId"
                            onChange={handleChange}
                          >
                            {category.categories.map((cate) => (
                              <MenuItem value={cate.categoryId}>
                                {cate.categoryName}
                              </MenuItem>
                            ))}
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
                            id="file"
                            type="file"
                            onChange={handleImg}
                            name="productImage"
                          />
                        </Button>
                      </Stack>
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
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="IN STOCK"
                          />
                          <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label="OUT OF STOCK"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item>
                      <Button
                        sx={{ marginLeft: 40, marginBottom: 1 }}
                        variant="contained"
                        color="warning"
                        onClick={handleEdit}
                        disabled={validation.isValid === false}
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ marginLeft: 1, marginBottom: 1 }}
                        variant="contained"
                        color="error"
                        onClick={() => {
                          navigate("/admin/products");
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

export default EditProduct;
