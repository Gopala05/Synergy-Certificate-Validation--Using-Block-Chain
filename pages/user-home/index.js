"use client";
import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "antd";
import DashNav from "../../Components/Nav/DashNav";
import HomeButton from "../../components/button/HomeButton";
import { useRouter } from "next/router";
import { Logo } from "../../Components";
import toast, { clearAll } from "react-hot-toast";

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
    <div className="flex h-screen">
      <DashNav />
      <Row className="flex w-full items-center lg:mt-10 py-20">
        <Col lg={11} className="flex justify-center flex-col gap-y-10 lg:pl-16">
          <Row className="flex w-full justify-center">
            <img src="./User_Icon.png" alt="User Icon" className="w-36" />
          </Row>
          {/* Name */}
          <Row className="flex w-full bg-white items-center rounded-2xl lg:h-16">
            <Col lg={2} className="flex justify-center">
              <img
                src="./User_Name.jpg"
                alt="User Name"
                className="w-10 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white text-black tex text-2xl flex items-center font-bold cursor-pointer">
                {user.name}
              </div>
            </Col>
          </Row>

          {/* ID */}
          <Row className="flex w-full bg-white items-center rounded-2xl lg:h-16">
            <Col lg={2} className="flex justify-center">
              <img
                src="./User_ID.jpg"
                alt="User ID"
                className="w-10 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white text-black tex text-2xl flex items-center font-bold cursor-pointer">
                {user.userName}
              </div>
            </Col>
          </Row>

          {/* Email */}
          <Row className="flex w-full bg-white items-center rounded-2xl lg:h-16">
            <Col lg={2} className="flex justify-center">
              <img
                src="./Mail.jpg"
                alt="User Mail"
                className="w-10 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white text-black tex text-2xl flex items-center font-bold cursor-pointer">
                {user.userEmails?.[0]}
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={1} className="hidden lg:flex justify-center ml-12 h-full">
          <div className="right-0 top-0 bottom-0 border-r-2 border-gray-300"></div>
        </Col>

        <Col lg={11} className="flex justify-center flex-col gap-y-10">
          <div className="flex-1 flex flex-col items-center rounded-2xl gap-y-10">
            <HomeButton
              navigate="/validation"
              backgroundImage={backgroundImages.verify}
            >
              VERIFY
            </HomeButton>
            <HomeButton
              navigate="/blog"
              backgroundImage={backgroundImages.blog}
            >
              BLOG
            </HomeButton>
            <HomeButton
              navigate="/support"
              backgroundImage={backgroundImages.support}
            >
              SUPPORT
            </HomeButton>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserHome;
