import React, { useRef, useEffect } from "react";
import Nav from "../Components/Nav/Nav";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import UploadandVerify from "../Components/Upload-and-Verify/UploadandVerify";
import Blog from "../Components/Blog/Blog";
import Contactus from "../Components/ContactUs/Contactus";
import Footer from "../Components/Footer/Footer";

const Landing = () => {
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    uploadandverify: useRef(null),
    blog: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("user-info")) {
      localStorage.removeItem("user-info");
      localStorage.removeItem("User-Token");
    }
    if (localStorage.getItem("auth-info")) {
      localStorage.removeItem("auth-info");
      localStorage.removeItem("Auth-Token");
    }
  }, []);

  return (
    <>
      <Nav sectionRefs={sectionRefs} />
      <div ref={sectionRefs.home} id="home">
        <Home />
      </div>
      <div ref={sectionRefs.about} id="about">
        <About />
      </div>
      <div ref={sectionRefs.uploadandverify} id="uploadandverify">
        <UploadandVerify />
      </div>
      <div ref={sectionRefs.blog} id="blog">
        <Blog />
      </div>
      <div ref={sectionRefs.contact} id="contact">
        <Contactus />
      </div>
      <Footer />
    </>
  );
};

export default Landing;
