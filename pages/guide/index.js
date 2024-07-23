import React from "react";
import DashNav from "../../Components/Nav/DashNav";
import { Col, Row } from "antd";
import FlowButton from "../../Components/Button/FlowButton";

const backgroundImages = {
  verify: "/Verify.png",
  upload: "/Upload.png",
  support: "/Support.png",
};

const Guide = () => {
  return (
    <div className="h-[100vh]">
      <DashNav />

      <Row className="flex pt-20 w-full h-full justify-center items-center">
        <Col lg={12} className="w-full flex justify-center items-center">
          <img
            src="/Guide_Metamask.png"
            alt="Guide Image"
            className="w-[40vw]"
          />
        </Col>
        <Col
          lg={12}
          className="flex flex-col items-center gap-y-20 justify-center text-white"
        >
          <div className="text-8xl font-bold bg-gradient-to-br from-white to-[#f6851b] bg-clip-text text-white">
            SYNERGY
          </div>
          <div className="flex-1 flex flex-col items-center gap-y-10">
            <FlowButton
              navigate="/comming-soon"
              backgroundImage={backgroundImages.verify}
            >
              Certificate Verification Flow
            </FlowButton>
            <FlowButton
              navigate="/comming-soon"
              backgroundImage={backgroundImages.upload}
            >
              Certificate Upload Flow
            </FlowButton>
            <FlowButton
              navigate="/comming-soon"
              backgroundImage={backgroundImages.support}
            >
              Support Flow
            </FlowButton>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Guide;
