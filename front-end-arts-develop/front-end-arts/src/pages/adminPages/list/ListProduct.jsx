import Sidebar from "../../../components/adminComponents/sidebar/Sidebar";
import "./listproduct.scss";
import Navbar from "./../../../components/adminComponents/navbar/Navbar";
import DatatableProduct from "./../../../components/adminComponents/datatable/DatatableProduct";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { getAllProduct } from "../../../redux/createproduct/product.action";
import { useDispatch } from "react-redux";
import { getAllCategories } from "./../../../redux/category/category.action";
import baseURL from "../../../baseurl";

const ListProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const api = axios.create({
      baseURL: baseURL + "api/Products/Products",
    });

    const apiCate = axios.create({
      baseURL: baseURL + "api/Categories/Categories",
    });

    async function getCategories() {
      const response = await apiCate.get("/");
      dispatch(getAllCategories(response.data));
    }

    async function getProducts() {
      const response = await api.get("/");
      dispatch(getAllProduct(response.data));
    }

    getProducts();
    getCategories();
  }, []);

  return (
    <div className="listadmin">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Box
          sx={{
            boxShadow: 3,
            width: "100%",
            height: "5rem",
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "bold",
            color: "brown",
          }}
        >
          Products List
        </Box>
        <DatatableProduct />
      </div>
    </div>
  );
};

export default ListProduct;
