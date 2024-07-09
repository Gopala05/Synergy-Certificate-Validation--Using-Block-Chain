import React from "react";
import DashNav from "../../Components/Nav/DashNav";
import { Col, Input, Row } from "antd";
import HomeButton from "../../Components/Button/HomeButton";

const backgroundImages = {
  verify: "/Verify.png",
  upload: "/Upload.png",
  blog: "/Blog.jpeg",
  support: "/Support.png",
};

const AuthHome = () => {
  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    const userData = localStorage.getItem("auth-info");
    setUser(JSON.parse(userData));
  }, []);

  return (
    <div className="flex h-[100vh] w-full">
      <DashNav />
      <Row className="flex w-full items-center lg:mt-10 py-20">
        <Col lg={11} className="flex justify-center flex-col gap-y-10 lg:pl-16">
          <Row className="flex w-full justify-center">
            <img src="./Auth_Icon.png" alt="Auth Icon" className="w-40" />
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
                {user?.firstName + " " + user?.lastName}
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
                {user?.authID}
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
                {user?.authEmail}
              </div>
            </Col>
          </Row>

          {/* Role */}
          <Row className="flex w-full bg-white items-center rounded-2xl lg:h-16">
            <Col lg={2} className="flex justify-center">
              <img
                src="./Role.jpg"
                alt="User Role"
                className="w-12 z-10 relative"
              />
            </Col>
            <Col className="flex flex-grow pl-5">
              <div className="border-none bg-white rounded-lg text-black tex text-2xl flex items-center font-bold cursor-pointer">
                {user?.role}
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={1} className="flex justify-center ml-12 h-full">
          <div className=" right-0 top-0 bottom-0 border-r-2 border-gray-300"></div>
        </Col>

        <Col lg={11} className="flex justify-center flex-col gap-y-10 pt-5">
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

export default AuthHome;
