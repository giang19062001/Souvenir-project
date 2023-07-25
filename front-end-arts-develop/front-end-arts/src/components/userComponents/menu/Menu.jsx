import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import "./menu.css";
import { selectShopCart } from "../../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import api from "../../../api/client.js";
import baseURL from "../../../baseurl";

const Menu = ({ cartList }) => {
  const userCurrent = localStorage.getItem("token");

  const [userAvatar, setuserAvatar] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const { data: allUser } = await api.get("/api/Users/Users");
      const userName = localStorage.getItem("userName");

      const listImageUser = allUser.map((user) =>
        user.userName === userName ? user.userAvatar : null
      );
      const AvatarUser = listImageUser.find((item) => item !== null);
      setuserAvatar(AvatarUser);
    };

    fetchData();
  }, []);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  // console.log("cartlist",cartList);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "0vh",
        padding: "3%",
      }}
    >
      <div style={{ marginLeft: "2vw" }}>
        <Link to="/">
          <img
            src={require("../../../assets/images/logo.png")}
            alt="..."
            style={{ maxWidth: "5rem" }}
          />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <Link to="/" className="underLine2 hide_on_responsive">
          <Button variant="text" color="default">
            Home
          </Button>
        </Link>
        <Link to="/about" className="underLine2 hide_on_responsive">
          <Button variant="text" color="default">
            About
          </Button>
        </Link>
        <Link to="/cart" className="underLine2 ">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={cartList.length} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Link>
        {userCurrent !== null && userAvatar !== null && (
          <Link to="/user/0" className="underLine2 ">
            <Avatar
              alt=""
              src={baseURL + userAvatar}
              srcSet={baseURL + userAvatar}
            />
          </Link>
        )}
        {userCurrent !== null && userAvatar === null && (
          <Link to="/user" className="underLine2 ">
            <Avatar
              alt=""
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCcJ3fJYkYAD9Mu1_-HdQtpAJFdYDPvvZTw&usqp=CAU"
            />
          </Link>
        )}
        {userCurrent === null && (
          <Link to="/login" className="underLine2 ">
            <Button variant="outlined" color="secondary">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
const mapStateToProp = createStructuredSelector({
  cartList: selectShopCart,
});

const mapDispatchToProp = (dispatch) => ({});

export default connect(mapStateToProp, mapDispatchToProp)(Menu);
