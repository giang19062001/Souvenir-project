import React from "react";
import "./carousel.css";




const Carousel = () => {
  return (
    <>
      <div className="">
       
        <div
          style={{
            display: "flex",
            padding: "5%",
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "white"
          }}
          className="Top_Area_Responsive"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "4vh"
            }}
            className="Top_Area_Text_Left_Responsive"
          >
          
            <div
              style={{
                marginTop: "5vh",
                fontSize: "50px",
                width: "35vw",
                cursor: "pointer"
              }}
            >
              <span
                className="underLine"
                style={{
                  fontFamily: " 'Ubuntu', sans-serif",
                  fontWeight: "bolder"
                }}
              >
                Art Design
              </span>{" "}
              <br />{" "}
              <span
                className="underLine1 Responsive_Head"
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontWeight: "100"
                }}
              >
                ARTS is more than just an ordinary store or gift shop
              </span>
            </div>
            <div style={{ marginTop: "10vh" }} className="Responsive_Head">

            </div>
          </div>
          <div style={{ padding: "2%" }} data-aos="zoom-in-up">
            <img
              className="Vid"
              src="https://truongquochoc.com/wp-content/uploads/2020/10/30-hinh-anh-gau-bong-cuc-cute-1.jpg"
              alt=""
              // poster="https://truongquochoc.com/wp-content/uploads/2020/10/30-hinh-anh-gau-bong-cuc-cute-1.jpg"
            ></img>
          </div>
        </div>  
      </div>

    </>
  );
};

export default Carousel;
