import Sidebar from "../../../components/adminComponents/sidebar/Sidebar";
import "./editcategory.scss";
import Navbar from "./../../../components/adminComponents/navbar/Navbar";
import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import validate from "validate.js";
import ErrorIcon from "@mui/icons-material/Error";
import { FormHelperText } from "@mui/material";
import UpdateSuccessDialog from "./../../../components/adminComponents/dialog/updateSuccess";
import baseURL from "../../../baseurl";

const EditCategory = ({ title }) => {
  let navigate = useNavigate();

  const { categoryId } = useParams();
  const intCategoryId = parseInt(categoryId);

  const date = new Date();

  const api = axios.create({
    baseURL: baseURL + "api/Categories/UpdateCategory",
  });

  const dataCategory = useSelector((state) => state.category.categories);

  const detailCategory = dataCategory.find(
    (id) => id.categoryId === intCategoryId
  );

  const [category, setCategory] = useState({
    categoryId: detailCategory.categoryId,
    categoryName: detailCategory.categoryName,
    categoryCode: detailCategory.categoryCode,
    updatedAt: date,
  });

  const [success, setSuccess] = useState(false);

  const handleEdit = async () => {
    await api.post("/", category);
    setSuccess(true);
  };

  const handleChange = (event) => {
    setCategory((preState) => ({
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

  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isValid: false,
  });

  useEffect(() => {
    const schema = {
      categoryName: {
        presence: {
          allowEmpty: false,
          message: "^Category name is required",
        },
        format: {
          pattern: "[a-z 0-9]+",
          flags: "i",
          message: "Category name can only contain a-z , 0-9 and white space",
        },
        length: {
          maximum: 30,
          minimum: 4,
          message: "^Category name must be from 5 to 30 character",
        },
      },
      categoryCode: {
        presence: {
          allowEmpty: false,
          message: "^Category code is required",
        },
        numericality: {
          onlyInteger: true,
          message: "^Category code must be number",
        },
        length: {
          is: 2,
          message: "^Category code only be 2 digit number",
        },
      },
    };
    const errors = validate.validate(category, schema);
    setValidation((pre) => ({
      ...pre,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [category]);

  return (
    <div className="editcategory">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <Container>
            {success === true ? (
              <UpdateSuccessDialog page="categories" success={true} />
            ) : (
              <Paper>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Category ID"
                      type="text"
                      fullWidth
                      size="small"
                      name="categoryId"
                      disabled
                      InputLabelProps={{ shrink: true }}
                      value={detailCategory.categoryId}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Category Name"
                      type="text"
                      fullWidth
                      size="small"
                      name="categoryName"
                      InputLabelProps={{ shrink: true }}
                      defaultValue={detailCategory.categoryName}
                      onChange={handleChange}
                    ></TextField>
                    {hasError("categoryName") ? (
                      <FormHelperText
                        id="outlined-weight-helper-text"
                        className="text"
                      >
                        <ErrorIcon fontSize="small" />
                        {validation.errors.categoryName[0]}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ margin: 0.5 }}>
                    <TextField
                      label="Category Code"
                      type="text"
                      fullWidth
                      size="small"
                      name="categoryCode"
                      InputLabelProps={{ shrink: true }}
                      defaultValue={detailCategory.categoryCode}
                      onChange={handleChange}
                    ></TextField>
                    {hasError("categoryCode") ? (
                      <FormHelperText
                        id="outlined-weight-helper-text"
                        className="text"
                      >
                        <ErrorIcon fontSize="small" />
                        {validation.errors.categoryCode[0]}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item>
                    <Button
                      sx={{ marginLeft: 60, marginBottom: 1 }}
                      variant="contained"
                      color="warning"
                      onClick={handleEdit}
                      disabled={validation.isValid === false}
                    >
                      EDIT
                    </Button>
                    <Button
                      sx={{ marginLeft: 1, marginBottom: 1 }}
                      variant="contained"
                      color="error"
                      onClick={() => {
                        navigate("/admin/categories");
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

export default EditCategory;
