import "./createproduct.scss";
import Sidebar from "./../../../components/adminComponents/sidebar/Sidebar";
import Navbar from "./../../../components/adminComponents/navbar/Navbar";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import validate from "validate.js";
import ErrorIcon from "@mui/icons-material/Error";
import SuccessDialog from "./../../../components/adminComponents/dialog/successDialog";
import baseURL from "../../../baseurl";

const CreateProduct = ({ title }) => {
  let navigate = useNavigate();
  const date = new Date();
  const category = useSelector((state) => state.category);
  const [checkImg, setCheckImg] = useState(false);

  const [products, setProduct] = useState({
    productName: "",
    productPrice: 0,
    productQuantity: 0,
    productShortDescription: "",
    productLongDescription: "",
    categoryId: 1,
    productImage: "",
    productStatus: 1,
    updatedAt: date,
  });

  const [success, setSuccess] = useState(false);

  const api = axios.create({
    baseURL: baseURL + "api/Products/CreateProduct",
  });

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

  const handleImage = (event) => {
    setProduct((prePro) => ({
      ...prePro,
      productImage: event.target.files[0],
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
    productName: products.productName,
    productPrice: products.productPrice,
    productQuantity: products.productQuantity,
    productShortDescription: products.productShortDescription,
    productLongDescription: products.productLongDescription,
    categoryId: products.categoryId,
    productStatus: products.productStatus,
    updatedAt: products.updatedAt,
  };
  formData.append("productJson", JSON.stringify(obj));
  formData.append("files", products.productImage);

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
      productName: {
        presence: {
          allowEmpty: false,
          message: "^Product name is required",
        },
        format: {
          pattern: "[a-z 0-9]+",
          flags: "i",
          message: "Product name can only contain a-z , 0-9 and white space",
        },
        length: {
          maximum: 50,
          minimum: 5,
          message: "^Product name must be from 5 to 50 character",
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
    const errors = validate.validate(products, schema);
    setValidation((pre) => ({
      ...pre,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [products]);

  useEffect(() => {
    if (products.productImage !== "") {
      setCheckImg(false);
    } else {
      setCheckImg(true);
    }
  });

  const checkValid = () => {
    if (validation.isValid === false) {
      return true;
    } else if (products.productImage === "") {
      return true;
    }
    return false;
  };

  return (
    <div className="createproduct">
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
                products.productImage
                  ? URL.createObjectURL(products.productImage)
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
                <SuccessDialog page="products" success={true} />
              ) : (
                <Paper>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                      <TextField
                        label="Product Name"
                        type="text"
                        fullWidth
                        size="small"
                        placeholder="Kenny Barbie"
                        name="productName"
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
                        onChange={handleChange}
                      />
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
                        placeholder="0 Barbie"
                        name="productQuantity"
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
                            id="categoryId"
                            value={products.categoryId}
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
                            id="productImage"
                            type="file"
                            name="productImage"
                            onChange={handleImage}
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
                          value={products.productStatus}
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

export default CreateProduct;
