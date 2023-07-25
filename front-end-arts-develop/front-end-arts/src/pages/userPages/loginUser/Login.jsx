import React from "react";

import  Menu from "../../../components/userComponents/menu/Menu"

import  Footer from '../../../components/userComponents/footer/Footer'

import FormLogin from "../../../components/userComponents/login/Login";

 function PageLogin() {
  return (
    <>
  
        <Menu></Menu>
     <FormLogin ></FormLogin >

     
      <Footer></Footer>
      
    </>
  );
}
export default PageLogin