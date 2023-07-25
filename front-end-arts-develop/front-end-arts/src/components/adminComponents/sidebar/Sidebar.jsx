import "./sidebar.scss"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from "react-router-dom";
import {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from '../../../context/darkModeContext';

const Sidebar = () => {

  const { dispatch } = useContext(DarkModeContext)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{textDecoration:"none"}}>
          
            <img src={require("../../../assets/images/logo.png")} alt="logo" className="logo"/>
          
        </Link>
      </div>
      <hr/>
      <div className="center">
        <ul>
          <p className="title"><StoreOutlinedIcon className="titleicon"/>PRODUCT</p>
          <Link to="/admin/products" style={{textDecoration:"none"}}>
            <li><ArrowRightIcon className="icon"/><span>View all products</span></li>
          </Link>
          <Link to="/admin/products/create" style={{textDecoration:"none"}}>
            <li><ArrowRightIcon className="icon"/><span>Create product</span></li>
          </Link>
          
          <p className="title"><PersonOutlineOutlinedIcon className="titleicon"/>USERS</p>
          <Link to="/admin/users" style={{textDecoration:"none"}}>
            <li><ArrowRightIcon className="icon"/><span>View all users</span></li>
          </Link>
          {/* <Link to="/admin/users/create" style={{textDecoration:"none"}}>
            <li><ArrowRightIcon className="icon"/><span>Create assistant</span></li>
          </Link> */}
            
          
          <p className="title"><GridViewOutlinedIcon className="titleicon"/>CATEGORY</p>
          <Link to="/admin/categories" style={{textDecoration:"none"}} >
            <li><ArrowRightIcon className="icon"/><span>View all categories</span></li>
          </Link>
          <Link to="/admin/categories/create" style={{textDecoration:"none"}}>
            <li><ArrowRightIcon className="icon"/><span>Create category</span></li>
          </Link>
            
          <p className="title"><ListAltOutlinedIcon className="titleicon"/>ORDER</p>
          <Link to="/admin/orders" style={{textDecoration:"none"}}>
            <li><ArrowRightIcon className="icon"/><span>View all orders</span></li>
          </Link>
          
        </ul>
      </div>
      <div className="bottom">
      {/* <p className="title"><SettingsOutlinedIcon className="titleicon"/>SETTING COLOR</p>
      <div className="setting">
              <div className="colorOption" onClick={() => dispatch({type: "LIGHT"})}></div>
              <div className="colorOption" onClick={() => dispatch({type: "DARK"})}></div>
      </div> */}
      <div className="logout">
    
      <button onClick={handleLogout}>  <p className="title"><LogoutOutlinedIcon className="titleicon" /></p>   LOGOUT</button>
      </div>
      
      </div>
    </div>
  )
}

export default Sidebar