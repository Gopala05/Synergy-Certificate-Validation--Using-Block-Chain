import React from "react";
import DashNav from "../../Components/Nav/DashNav";
import { Col, Row } from "antd";

const Valid = ({ info }) => {
  return (
    <div className="h-[100vh]">
      <DashNav />
      <Row className="flex h-full w-full items-center py-20">
        <Col
          lg={12}
          className="flex justify-center items-center flex-col gap-y-10 lg:pl-16"
        >
          <div className="border-dashed border-4 border-[#0080DC] bg-white/10  p-5 rounded-3xl">
            <img
              //   src={info.url}
              src="https://gateway.pinata.cloud/ipfs/QmPFX39GWeasHPzDGcqBpcbiHs4ULgR6X9fk2N37h7FqU3"
              alt="Certificate Image"
              className=""
            />
          </div>
          <a download href="https://gateway.pinata.cloud/ipfs/QmPFX39GWeasHPzDGcqBpcbiHs4ULgR6X9fk2N37h7FqU3" >
            <button className="rounded-full text-2xl font-semibold text-white bg-[#0080DC] py-4 px-8 border-2 border-[#15C586]">
                Download Certificate
            </button>
          </a>
        </Col>
        <Col lg={12}></Col>
      </Row>
    </div>
  );
};

export default Valid;
