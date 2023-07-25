import React from "react";

import Button from "@material-ui/core/Button";
import "./footer.css";
const Footer = () => {
    return (
        <>
<div className="Footer_2">
<div >
  <div
    style={{
      fontSize: "2rem",
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: "100",
      letterSpacing: "-.025em"
    }}
  >
    Are you like?
  </div>
  <div
    style={{
      fontSize: "1.8rem",
      color: "#8d8f9a",
      fontWeight: "100",
      opacity: "0.6",
      fontFamily: "'Open Sans', sans-serif"
    }}
  >
    Let's talk
  </div>

  <div
  style={{
    display: "flex",
    justifyContent: "space-evenly",
   
    left: "-10vw",
    top: "7vh",

  }}
>
  <li className="liFooter">
    <svg viewBox="0 0 18 18" width="18" height="18">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M5.2 0h7.6C15.7 0 18 2.3 18 5.2v7.6c0 2.9-2.3 5.2-5.2 5.2H5.2A5.2 5.2 0 010 12.8V5.2C0 2.3 2.3 0 5.2 0zM5 1.8A3.2 3.2 0 001.8 5v8c0 1.8 1.4 3.2 3.2 3.2h8c1.7 0 3.2-1.5 3.2-3.2V5c0-1.8-1.4-3.2-3.2-3.2H5zm8.7 1.3a1.1 1.1 0 110 2.3 1.1 1.1 0 010-2.3zM9 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1.8a2.7 2.7 0 100 5.4 2.7 2.7 0 000-5.4z"
      ></path>
    </svg>
  </li>
  <li className="liFooter">
    <svg width="18" height="17" viewBox="0 0 18 17">
      <path
        fill="currentColor"
        d="M8.7 0A8.7 8.7 0 006 17c.4 0 .5-.2.5-.4V15c-2.4.5-2.9-1.2-2.9-1.2-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9 0 1.3 1 1.3 1 .8 1.2 2 .8 2.6.6 0-.5.3-1 .5-1.1-2-.3-4-1-4-4.3 0-1 .4-1.8 1-2.4-.1-.2-.4-1.1 0-2.3 0 0 .8-.2 2.4.9a8.2 8.2 0 014.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1 0 2.3.6.6 1 1.4 1 2.4 0 3.3-2 4-4 4.3.3.2.6.8.6 1.6v2.4c0 .2.1.5.6.4A8.7 8.7 0 008.7 0z"
      ></path>
    </svg>
  </li>
  <li className="liFooter">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16"> 
  <a href="https://www.youtube.com/channel/UCmN5BE8Cb4z2Zo-8c5qqpAA">
    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
    </a> 
   </svg>
  </li>
  <li className="liFooter">
    <svg width="9" height="18" viewBox="0 0 9 18">
    <a href="https://www.facebook.com/artsstore123/">
    <path
        fill="currentColor"
        d="M9 0v3.6H7.2c-.6 0-.9.7-.9 1.4v2.2H9v3.6H6.3V18H2.7v-7.2H0V7.2h2.7V3.6c0-2 1.6-3.6 3.6-3.6H9z"
      ></path>
    </a> 
    </svg>
  </li>

</div>
  <br />
</div>
<div style={{ display: "flex", justifyContent: "space-between" }}   className="sub">
  <div
  >
    <ul className="ulFooter">
      <li className="liFooter">
        <Button variant="text" color="default">
          Clients
        </Button>{" "}
      </li>
      <li className="liFooter">
        <Button variant="text" color="default">
          About
        </Button>{" "}
      </li>
      <li className="liFooter">
        <Button variant="text" color="default">
          News
        </Button>{" "}
      </li>
      <li className="liFooter">
        <Button variant="text" color="default">
          Contact
        </Button>{" "}
      </li>
      <li className="liFooter">
        <Button variant="text" color="default">
          Careers
        </Button>{" "}
      </li>

    </ul>
  </div>
  <ul className="ulFooter">
    <li className="liFooter">
      <Button variant="text" color="default">
        San Fransicso
      </Button>{" "}
    </li>
    <li className="liFooter">
      <Button variant="text" color="default">
        New York
      </Button>{" "}
    </li>
    <li className="liFooter">
      <Button variant="text" color="default">
        Tokyo
      </Button>{" "}
    </li>
    <li className="liFooter">
      <Button variant="text" color="default">
        Los Angeles
      </Button>{" "}
    </li>
    <li className="liFooter">
      <Button variant="text" color="default">
        Osaka
      </Button>{" "}
    </li>
  </ul>

  <ul className="ulFooter">
    <li className="liFooter">
      <Button variant="text" color="default">
        Newsletter
      </Button>{" "}
    </li>
    <li className="liFooter">
      <Button variant="text" color="default">
        Blog
      </Button>{" "}
    </li>
    <li className="liFooter">
      <Button variant="text" color="default">
        Bueno.co
      </Button>{" "}
    </li>
    <li className="liFooter">
      <Button variant="text" color="default">
        Ueno.store
      </Button>{" "}
    </li>
    <li className="liFooter">
      <Button variant="text" color="default">
        Ueno.design
      </Button>{" "}
    </li>
  

   
  </ul>

</div>
</div>
</>
  );
};

export default Footer;