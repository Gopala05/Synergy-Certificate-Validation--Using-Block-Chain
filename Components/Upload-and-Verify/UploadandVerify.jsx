import { Button, Col, Row } from "antd";
import Link from "next/link";
import React from "react";

const UploadandVerify = () => {
  return (
    <div className="xl:px-20 lg:px-10 h-full px-5 lg:mt-10">
      <Row className="flex justify-center items-center">
        <Col lg={14}>
          <label className="text-2xl lg:text-3xl flex justify-center lg:justify-start font-bold">
            Block Chain for Certificates.
          </label>
          <p className="mt-5 text-lg text-center lg:text-left">
            Utilizing advanced encryption and security protocols, e-vaults
            ensure that sensitive information remains protected from
            unauthorized access and tampering.
          </p>
          <div className="flex w-full justify-between lg:justify-start">
            <Link href="/user-login">
              <Button className="hover:scale-110 transition-all mt-8 btn bg-[#15C586] border-0 text-black font-bold">
                Validate Certificate
              </Button>
            </Link>
            <Link href="/auth-login">
              <Button className="hover:scale-110 transition-all lg:ml-8 btn mt-8 bg-[#15C586] border-0 text-black font-bold">
                Upload Certificate
              </Button>
            </Link>
          </div>
        </Col>
        <Col lg={8} className="lg:flex hidden justify-center">
          <img src="/Robot.png" alt="Robot Image" className="w-56" />
        </Col>
      </Row>
    </div>
  );
};

export default UploadandVerify;
