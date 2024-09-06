"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input, Row, Col, Radio, Card, Form, Button } from "antd";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Logo from "../../Components/Logo/Logo";
import Footer from "../../Components/Footer/Footer";
import DashNav from "../../Components/Nav/DashNav";
import { useStateContext } from "../../Context/NFTs";
import { ArrowRight } from "lucide-react";

const ValidationPage = () => {
  const { isLoading } = useStateContext();

  const router = useRouter();
  const toastShownRef = useRef(false);

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);

  // Remove the localStorage
  useEffect(() => {
    if (localStorage.getItem("cert-user")) localStorage.removeItem("cert-user");
    if (localStorage.getItem("NFT")) localStorage.removeItem("NFT");
    if (localStorage.getItem("NFTs")) localStorage.removeItem("NFTs");
  }, []);

  // If User is Not Logged IN
  useEffect(() => {
    const userData = localStorage.getItem("user-info");
    const authData = localStorage.getItem("auth-info");
    if (!userData && !authData) {
      router.replace("/user-login");
      if (!toastShownRef.current) {
        toast("Please Login First", {
          icon: "🚫",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        toastShownRef.current = true;
      }
    } else if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setAuth(JSON.parse(authData));
    }
  }, [router]);

  if (!auth && !user) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  return (
    <div className="h-screen xl:h-full">
      <DashNav />
      <Row className="flex w-full h-full items-center">
        <Col
          lg={12}
          className="hidden lg:flex items-center h-full lg:h-[93vh] justify-center flex-col gap-y-10 lg:pl-16 xl:pl-40"
        >
          <img
            src="/Verify_Metamask.png"
            alt="Verification Image"
            className=" lg:w-[40vw] mt-[13vh]"
          />
        </Col>
        <Col
          lg={11}
          sm={24}
          className="flex flex-col w-full gap-y-20 justify-center items-center lg:pr-20 pt-0 lg:pt-20 xl:pr-32 lg:mt-0"
        >
          <Row className="text-white lg:block flex lg:w-auto w-full text-4xl justify-center lg:justify-start md:text-5xl xl:text-6xl font-semibold">
            What are you&nbsp;<span className="text-[#f6851b]">Looking</span>
            &nbsp;For?
          </Row>
          <div className="flex w-full justify-start flex-col gap-y-28 items-center">
            <button
              onClick={() => router.push("/academic-certificates")}
              className="btn flex justify-center text-2xl xl:text-5xl h-20 hover:scale-110 transition-all px-14 lg:w-full border-none bg-gradient-to-r from-[#FF9C1A] to-[#E80505] rounded-full text-white"
            >
              Academic Certificates
              <ArrowRight className="size-7 lg:size-10 mt-2" />
            </button>
            <button
              onClick={() => router.push("/non-academic-certificates")}
              className="btn flex justify-center text-2xl xl:text-5xl h-20 hover:scale-110 transition-all px-8 lg:w-full border-none bg-gradient-to-r from-[#FF9C1A] to-[#E80505] rounded-full text-white"
            >
              Non-Academic Certificates
              <ArrowRight className="size-7 lg:size-10 mt-2" />
            </button>
          </div>
        </Col>
      </Row>
      <Row className="flex w-full bottom-0 absolute">
        <Col lg={24} className="flex flex-col w-full">
          <Footer />
        </Col>
      </Row>
      {isLoading && (
        <div className="loader">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default ValidationPage;
