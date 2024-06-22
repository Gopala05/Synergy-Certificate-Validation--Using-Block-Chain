import { Button, Card, Col, Row } from "antd";
import React from "react";

const AuthLogin = () => {
  return (
    <div className="h-[100vh] bg-white">
      <Row className="flex justify-center items-center">
        <Col lg={12} className="p-20">
          <label className="text-black flex justify-center font-bold text-5xl">
            Welcome back!
          </label>
          <p className="text-black text-xl flex justify-center mt-3">
            Enter your Credentials to access
          </p>

          <div className="mt-5">
            <label className="text-black text-2xl font-bold">User ID</label>
            <br />
            <input
              className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="User ID.."
            />
          </div>

          <div className="mt-5">
            <label className="text-black text-2xl font-bold">Password</label>
            <br />
            <input
              className="w-full mt-1 text-black h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="Password..."
            />
          </div>

          <div className="text-blue-500 italic underline mt-2 text-xl">
            Forgot password ?
          </div>

          <div className="flex justify-center">
            <Button className="mt-8 bg-[#3A5B22] text-xl w-full border-0 text-white rounded-2xl font-bold py-5" >
              Login
            </Button>
          </div>
        </Col>
        <Col lg={12} className="h-[100vh]">
          <img
            src="./Login.jpg"
            alt="Login Image"
            className="h-[100vh] w-full rounded-3xl rounded-e-none"
          />
        </Col>
      </Row>
    </div>
  );
};

export default AuthLogin;
