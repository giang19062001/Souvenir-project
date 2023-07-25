import Sidebar from "../../../components/adminComponents/sidebar/Sidebar";
import "./listorder.scss";
import Navbar from "./../../../components/adminComponents/navbar/Navbar";
import DatatableOrder from "./../../../components/adminComponents/datatable/datatableOrder";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { getAllOrder } from "../../../redux/orderManager/orderdata.action";
import { useDispatch } from "react-redux";
import { getAllUser } from "./../../../redux/admin/admin.action";
import { getAllOrderDetail } from "./../../../redux/orderDetail/orderDetail.action";
import baseURL from "../../../baseurl";

const ListOrder = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const api = axios.create({
      baseURL: baseURL + "api/Orders/Orders",
    });

    const apiUser = axios.create({
      baseURL: baseURL + "api/Users/Users",
    });

    const apiDetail = axios.create({
      baseURL: baseURL + "api/OrderDetails/OrderDetails",
    });

    async function getOrders() {
      const response = await api.get("/");
      dispatch(getAllOrder(response.data));
    }

    async function getUsers() {
      const response = await apiUser.get("/");
      dispatch(getAllUser(response.data));
    }

    async function getOrderDetails() {
      const response = await apiDetail.get("/");
      dispatch(getAllOrderDetail(response.data));
    }

    getOrders();
    getUsers();
    getOrderDetails();
  }, []);

  return (
    <div className="listorder">
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
          Orders List
        </Box>
        <DatatableOrder />
      </div>
    </div>
  );
};

export default ListOrder;
