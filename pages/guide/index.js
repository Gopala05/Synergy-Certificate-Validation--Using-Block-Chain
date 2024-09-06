import React from "react";
import DashNav from "../../Components/Nav/DashNav";
import { Col, Row } from "antd";
import FlowButton from "../../Components/Button/FlowButton";
import { useRouter } from "next/router";
import Logo from "../../Components/Logo/Logo";
import Footer from "../../Components/Footer/Footer";

const backgroundImages = {
  verify: "/Verify.png",
  upload: "/Upload.png",
  support: "/Support.png",
  portfolio: "/Portfolio.jpg",
};

const Guide = () => {
  const [auth, setAuth] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const router = useRouter();
  const toastShownRef = React.useRef(false);

  React.useEffect(() => {
    const userData = localStorage.getItem("user-info");
    const authData = localStorage.getItem("auth-info");

    if (!userData && !authData) {
      router.replace("/user-login");
      if (!toastShownRef.current) {
        toast.error("Please Login First", {
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
      if (userData) setUser(JSON.parse(userData));
      if (authData) setAuth(JSON.parse(authData));
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
    <div className="h-[100vh]">
      <DashNav />

      <Row className="flex pt-20 w-full h-full justify-center items-center">
        <Col
          lg={12}
          className="w-full hidden lg:flex justify-center items-center"
        >
          <img
            src="/Guide_Metamask.png"
            alt="Guide Image"
            className="w-[40vw]"
          />
        </Col>
        <Col
          lg={12}
          className="flex flex-col h-full items-center gap-y-10 text-white lg:p-14 p-5"
        >
          <div className="text-6xl lg:text-7xl font-bold bg-gradient-to-br from-white to-[#f6851b] bg-clip-text text-white">
            GUIDE
          </div>
          <div className="uppercase flex-1 flex flex-col items-center gap-y-10">
            <FlowButton
              navigate="/verification-flow"
              backgroundImage={backgroundImages.verify}
            >
              Verification Flow
            </FlowButton>
            <FlowButton
              navigate="/upload-flow"
              backgroundImage={backgroundImages.upload}
            >
              Upload Flow
            </FlowButton>
            <FlowButton
              navigate="/support-flow"
              backgroundImage={backgroundImages.support}
            >
              Support Flow
            </FlowButton>
            <FlowButton
              navigate="/portfolio-flow"
              backgroundImage={backgroundImages.portfolio}
            >
              Portfolio Flow
            </FlowButton>
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

export default Guide;
