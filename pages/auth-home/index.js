"use client";
import React from "react";
import DashNav from "../../Components/Nav/DashNav";
import { Col, Row } from "antd";
import HomeButton from "../../Components/Button/HomeButton";
import { useRouter } from "next/navigation";
import Logo from "../../Components/Logo/Logo";
import toast from "react-hot-toast";

const backgroundImages = {
  verify: "/Verify.png",
  upload: "/Upload.png",
  blog: "/Blog.jpeg",
  support: "/Support.png",
};

const AuthHome = () => {
  const [auth, setAuth] = React.useState("");
  const toastShownRef = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    const authData = localStorage.getItem("auth-info");
    if (!authData) {
      router.replace("/auth-login");
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
    } else {
      setAuth(JSON.parse(authData));
    }
  }, [router]);

  if (!auth) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  return (
    <div className="flex h-full xl:h-[100vh] w-full">
      <DashNav />
      <Row className="flex w-full items-center lg:mt-10 pt-20 xl:pb-20">
        <Col
          lg={11}
          className="flex w-full justify-start items-start flex-col gap-y-10 lg:pl-16 p-2"
        >
          <Row className="flex w-full justify-center">
            <img src="./Admin.png" alt="Auth Icon" className="lg:w-40 w-32 pt-5 lg:pt-0" />
          </Row>
          {/* Name */}
          <Row className="flex w-full bg-white items-center rounded-2xl h-16 p-2">
            <Col lg={2} className="flex justify-center">
              <img
                src="./User_Name.jpg"
                alt="User Name"
                className="w-10 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white text-black text-xl md:text-2xl flex items-center font-bold cursor-pointer">
                {auth?.firstName + " " + auth?.lastName}
              </div>
            </Col>
          </Row>

          {/* ID */}
          <Row className="flex w-full bg-white items-center rounded-2xl h-16 p-2">
            <Col lg={2} className="flex justify-center">
              <img
                src="./User_ID.jpg"
                alt="User ID"
                className="w-10 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white text-black text-xl md:text-2xl flex items-center font-bold cursor-pointer">
                {auth?.authID}
              </div>
            </Col>
          </Row>

          {/* Email */}
          <Row className="flex w-full bg-white items-center rounded-2xl h-16 p-2">
            <Col lg={2} className="flex justify-center">
              <img
                src="./Mail.jpg"
                alt="User Mail"
                className="w-10 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white text-black text-xl md:text-2xl flex items-center font-bold cursor-pointer">
                {auth?.authEmail}
              </div>
            </Col>
          </Row>

          {/* Role */}
          <Row className="flex w-full bg-white items-center rounded-2xl h-16 p-2">
            <Col lg={2} className="flex justify-center">
              <img
                src="./Role.jpg"
                alt="User Role"
                className="w-12 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white rounded-lg text-black text-xl md:text-2xl flex items-center font-bold cursor-pointer">
                {auth?.role}
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={1} className="hidden lg:flex justify-center ml-12 h-full">
          <div className=" right-0 top-0 bottom-0 border-r-2 border-gray-300"></div>
        </Col>

        <Row className="flex lg:hidden mt-7 w-full px-5">
          <hr className="flex w-full border-2" />
        </Row>

        <Col
          lg={11}
          className="flex w-full justify-center flex-col gap-y-10 p-5"
        >
          <div className="flex-1 flex flex-col items-center rounded-2xl gap-y-10">
            <HomeButton
              navigate="/validation"
              backgroundImage={backgroundImages.verify}
            >
              VERIFY
            </HomeButton>
            <HomeButton
              navigate="/upload"
              backgroundImage={backgroundImages.upload}
            >
              UPLOAD
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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AuthHome;
