import React from "react";
import DashNav from "../../Components/Nav/DashNav";
import { Col, Row } from "antd";

const Guide = () => {
  return (
    <div className="h-[100vh]">
      <DashNav />
      <Row>
        <Col
          lg={12}
          className="flex flex-col items-center justify-center text-white"
        >
          <div className="text-8xl font-bold">
            Stay <span className="text-[#f6851b]">Tuned</span>!
          </div>
          <br />
          <p className="text-2xl font-semibold">Coming Soon...</p>
        </Col>
        <Col lg={12}>
          <img
            src="/Coming_Soon_Metamask.jpeg"
            alt="Coming Soon Image"
            className="w-[50vw] h-[100vh] rounded-[20rem] rounded-e-none"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Guide;
