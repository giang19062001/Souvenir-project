import Sidebar from "../../../components/adminComponents/sidebar/Sidebar";
import "./listcategory.scss";
import Navbar from "./../../../components/adminComponents/navbar/Navbar";
import DatatableCategory from "./../../../components/adminComponents/datatable/DatatableCategory";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { getAllCategories } from "./../../../redux/category/category.action";
import { useDispatch } from "react-redux";
import baseURL from "../../../baseurl";

const ListCategory = () => {
  const api = axios.create({
    baseURL: baseURL + "api/Categories/Categories",
  });

  const dispatch = useDispatch();

  async function getCategories() {
    const response = await api.get("/");
    dispatch(getAllCategories(response.data));
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="listcategory">
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
          Categories List
        </Box>
        <DatatableCategory />
      </div>
    </div>
  );
};

export default ListCategory;
