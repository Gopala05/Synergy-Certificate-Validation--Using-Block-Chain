// comming-soon
import React from "react";
import { Col, Row } from "antd";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

const CommingSoon = () => {
  return (
    <div className="h-[100vh] bg-white">
      <Row>
        <Col lg={12}>
          <img
            src="/Comming_Soon_Metamask.png"
            alt="Coming Soon Image"
            className="h-[100vh] rounded-[20rem] rounded-s-none"
          />
        </Col>
        <Col
          lg={12}
          className="flex flex-col items-center justify-center p-20 text-white"
        >
          <div className="flex w-full justify-end ">
            <Link href="/guide">
              <button className="btn bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600">
                Back <RiArrowGoBackFill />
              </button>
            </Link>
          </div>
          <div className="flex h-full flex-col justify-center items-center">
            <div className="text-8xl font-bold text-black">
              Stay <span className="text-[#f6851b]">Tuned</span>!
            </div>
            <br />
            <p className="text-2xl text-black font-semibold">Coming Soon...</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CommingSoon;
