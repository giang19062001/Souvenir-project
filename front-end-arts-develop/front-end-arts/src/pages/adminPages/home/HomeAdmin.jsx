import Sidebar from "../../../components/adminComponents/sidebar/Sidebar"
import "./homeadmin.scss"
import Navbar from './../../../components/adminComponents/navbar/Navbar';
// import Widget from "../../../components/widget/Widget";
// import Featured from "../../../components/featured/Featured";
// import Chart from "../../../components/chart/Chart";
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import api from "../../../api/client.js";


const HomeAdmin = () => {

  const [userDetail, setUserDetail] = useState();
  useEffect(() => {
    const fetchData = async () => {
    const { data: allUser } = await api.get("/api/Users/Users");
    console.log(allUser)
 
  const CurrentUser = localStorage.getItem("userName");
  console.log(CurrentUser)

  const listIdUser = allUser.map((user) =>
    user.userName === CurrentUser ? user.userFullName : null
  );
  const id = allUser.map((user) =>
    user.userName === CurrentUser ? user.userId : null
  );
  console.log(id)
  console.log(listIdUser)
  const idUser = id.find((item) => item !== null);
  console.log(idUser)
  const NameUser = listIdUser.find((item) => item !== null);
  setUserDetail(NameUser)

    }
  fetchData();
  },[]);

  
  
  return (
    <div className="homeadmin">
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          {/* <div className="widgets">
            <Widget type="user"/>
            <Widget type="order"/>
            <Widget type="earning"/>
            <Widget type="balance"/>
          </div>
          <div className="charts">
            <Featured/>
            <Chart/>
          </div> */}
          <h1 >Welcome {userDetail}</h1>
        </div>
    </div>
  )
}

export default HomeAdmin

