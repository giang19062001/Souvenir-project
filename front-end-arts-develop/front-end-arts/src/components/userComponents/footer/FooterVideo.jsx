import React from "react";
import "./footerVideo.css";
const FooterVideo = () =>{
    return (
        <>
        <div
        className="AboveFooter_Vid"
        data-aos="zoom-in-up"
        style={{ marginLeft: "10vw" }}
      >
        <video
        className="VidFooter"
          autoPlay
          muted
          src="https://ueno.co/static/interview-white-17edfff518080c24e6248ae5e6b232dc.mp4"
        ></video>
      </div>

     
      <hr style={{ opacity: ".5", height: ".1px" }} />
        </>
    )
}
export default FooterVideo;