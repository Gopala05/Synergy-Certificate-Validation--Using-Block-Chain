"use client";
import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "antd";
import DashNav from "../../Components/Nav/DashNav";
import HomeButton from "../../Components/Button/HomeButton";
import { useRouter } from "next/router";
import Logo from "../../Components/Logo/Logo";
import toast from "react-hot-toast";
import { upgradeHook } from "../../hooks/upgrade-model";
import Footer from "../../Components/Footer/Footer";

const backgroundImages = {
  verify: "/Verify.png",
  upload: "/Upload.png",
  blog: "/Blog.jpeg",
  support: "/Support.png",
};

const UserHome = () => {
  const [user, setUser] = useState(null);
  const toastShownRef = useRef(false);
  const router = useRouter();
  const plansHook = upgradeHook();

  useEffect(() => {
    const userData = localStorage.getItem("user-info");
    if (!userData) {
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
      router.replace("/user-login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  return (
    <div className="flex h-full xl:h-screen">
      <DashNav />
      <Row className="flex w-full items-center mt-10 pt-20 xl:pb-20">
        <Col
          lg={11}
          className="flex w-full justify-center flex-col items-center gap-y-10 lg:pl-16 px-2 lg:p-0"
        >
          <Row className="flex w-full justify-center">
            <img
              src="./User_Name.jpg"
              alt="User Icon"
              className="w-36 bg-white rounded-full"
            />
          </Row>
          {/* Name */}
          <Row className="flex w-full bg-white items-center rounded-2xl h-16 px-2">
            <Col lg={2} className="flex justify-center">
              <img
                src="./User_Name.jpg"
                alt="User Name"
                className="w-10 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white text-black text-xl md:text-2xl flex items-center font-bold cursor-pointer">
                {user.name}
              </div>
            </Col>
          </Row>

          {/* ID */}
          <Row className="flex w-full bg-white items-center rounded-2xl h-16 px-2">
            <Col lg={2} className="flex justify-center">
              <img
                src="./User_ID.jpg"
                alt="User ID"
                className="w-10 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white text-black text-xl md:text-2xl flex items-center font-bold cursor-pointer">
                {user.userName}
              </div>
            </Col>
          </Row>

          {/* Email */}
          <Row className="flex w-full bg-white items-center rounded-2xl h-16 px-2">
            <Col lg={2} className="flex justify-center">
              <img
                src="./Mail.jpg"
                alt="User Mail"
                className="w-10 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white text-black text-lg md:text-2xl flex items-center font-bold cursor-pointer">
                {user.userEmails?.[0]}
              </div>
            </Col>
          </Row>

          <Row className="flex w-full justify-center">
            <button
              onClick={() => router.push("/profile")}
              className="btn bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600"
            >
              Edit Profile <LucideEdit3 />
            </button>
          </Row>
        </Col>

        <Col lg={1} className="hidden lg:flex justify-center ml-12 h-full">
          <div className="right-0 top-0 bottom-0 border-r-2 border-gray-300"></div>
        </Col>

        <Row className="flex lg:hidden mt-7 w-full px-5">
          <hr className="flex w-full border-2" />
        </Row>

        <Col
          lg={11}
          sm={24}
          className="flex w-full justify-center flex-col gap-y-10 p-5 mt-3 lg:mt-0"
        >
          <div className="flex-1 flex flex-col items-center rounded-2xl gap-y-10">
            <HomeButton
              navigate="/validation"
              backgroundImage={backgroundImages.verify}
            >
              VERIFY
            </HomeButton>
            <HomeButton
              navigate="/support"
              backgroundImage={backgroundImages.support}
            >
              SUPPORT
            </HomeButton>
            <HomeButton
              navigate="/guide"
              backgroundImage={backgroundImages.blog}
            >
              GUIDE
            </HomeButton>
            <HomeButton
              navigate="/portfolio"
              backgroundImage={backgroundImages.upload}
            >
              PORTFOLIO
            </HomeButton>
            {/* <button
              className="relative btn border-none text-white font-bold py-4 px-8 rounded-md shadow-lg overflow-hidden w-full lg:w-[40vw] h-[12vh]"
              style={{
                backgroundImage: `url(/Upload.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={plansHook.onOpen}
            >
              <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
              <div className="relative z-10 rounded-md bg-white/20 flex w-full h-full justify-center">
                <span className="flex justify-center text-3xl items-center">
                  PRICING
                </span>
              </div>
            </button> */}
          </div>
        </Col>
        <Row className="flex w-full bottom-0 lg:absolute">
          <Col lg={24} className="flex flex-col w-full">
            <Footer />
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default UserHome;
