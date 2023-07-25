import React from "react";

import  Menu from "../../../components/userComponents/menu/Menu"

import  Footer from '../../../components/userComponents/footer/Footer'
import FooterVideo from '../../../components/userComponents/footer/FooterVideo'
import ProductDetailUser from "../../../components/userComponents/productDetailUser/ProductDetailUser"
export default function PageProductDetail() {
  return (
    <>
  
        <Menu></Menu>
     
    <ProductDetailUser></ProductDetailUser>
     <FooterVideo></FooterVideo>
      <Footer></Footer>
      
    </>
  );
}
