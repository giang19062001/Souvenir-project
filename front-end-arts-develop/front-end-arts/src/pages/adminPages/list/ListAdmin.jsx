import Sidebar from "../../../components/adminComponents/sidebar/Sidebar";
import "./listadmin.scss";
import Navbar from "./../../../components/adminComponents/navbar/Navbar";
import Datatable from "./../../../components/adminComponents/datatable/Datatable";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { getAllUser } from "../../../redux/admin/admin.action";
import { useDispatch } from "react-redux";
import baseURL from "../../../baseurl";

const ListAdmin = () => {
  const api = axios.create({
    baseURL: baseURL + "api/Users/Users",
  });

  const dispatch = useDispatch();

  async function getUsers() {
    const response = await api.get("/");
    dispatch(getAllUser(response.data));
  }

  useEffect(() => {
    getUsers();
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
          Users List
        </Box>
        <Datatable />
      </div>
    </div>
  );
};

export default ListAdmin;
