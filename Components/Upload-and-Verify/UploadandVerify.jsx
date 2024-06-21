import { Button, Col, Row } from "antd";
import React from "react";

const UploadandVerify = () => {
  return (
    <div className="px-20 mt-10">
      <Row className="flex justify-center items-center">
        <Col lg={14}>
          <label className="text-3xl font-bold">
            Block Chain for Certificates.
          </label>
          <p className="mt-5 text-lg">
            Utilizing advanced encryption and security protocols, e-vaults
            ensure that sensitive information remains protected from
            unauthorized access and tampering.
          </p>
          <div>
            <Button className="mt-8 bg-[#15C586] border-0 text-black font-bold py-5">
              Validate Certificate
            </Button>
            <Button className="ml-8 mt-8 bg-[#15C586] border-0 text-black font-bold py-5">
              Upload Certificate
            </Button>
          </div>
        </Col>
        <Col lg={8} className="flex justify-center">
          <img src="/Robot.png" alt="Robot Image" className="w-56" />
        </Col>
      </Row>
    </div>
  );
};

export default UploadandVerify;
