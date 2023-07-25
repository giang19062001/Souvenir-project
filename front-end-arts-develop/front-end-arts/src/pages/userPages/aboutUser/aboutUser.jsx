import React from "react";
import  Menu from "../../../components/userComponents/menu/Menu"
import About from "../../../components/userComponents/about/About";


import  Footer from '../../../components/userComponents/footer/Footer'
import  FooterVideo from '../../../components/userComponents/footer/FooterVideo'

export default function AboutUser() {
  return (
    <>
  
        <Menu></Menu>
        
          <About />
        
        
        <FooterVideo></FooterVideo>
    
     
      <Footer></Footer>
      
    </>
  );
}
