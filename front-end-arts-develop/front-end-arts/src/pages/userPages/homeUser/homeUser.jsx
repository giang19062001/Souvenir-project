import React from "react";
import  Menu from "../../../components/userComponents/menu/Menu"
import  Carousel from '../../../components/userComponents/carousel/Carousel'

import  Data from '../../../components/userComponents/main/Data'
import  Footer from '../../../components/userComponents/footer/Footer'
import  FooterVideo from '../../../components/userComponents/footer/FooterVideo'

export default function HomeUser() {
  return (
    <>
  
        <Menu></Menu>
        
          <Carousel />
        
          <Data></Data>
        <FooterVideo></FooterVideo>
    
     
      <Footer></Footer>
      
    </>
  );
}
