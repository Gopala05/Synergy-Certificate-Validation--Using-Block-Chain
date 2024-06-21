import { Button, Col, Row } from "antd";
import React from "react";
import {
  RiArrowRightLine,
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
} from "react-icons/ri";

const Contactus = () => {
  return (
    <div id="contact" className="h-[85vh] items-center lg:pt-20">
      <label className="flex justify-center items-center text-5xl font-bold">
        Contact Us
      </label>
      <Row className="flex p-20 pt-12">
        <Col lg={11}>
          <div className="flex justify-start text-3xl font-bold items-center">
            <img src="/Logo.png" alt="Logo" className="w-24" />
            Synergy
          </div>
          <div className="flex justify-center text-xl w-full ml-6 mt-5">
            <p>
              Utilizing advanced encryption and security protocols, e-vaults
              ensure that sensitive information remains protected from
              unauthorized access and tampering. E-vaults used for storing
              educational certificates, legal documents, and other vital records
              due to their convenience, accessibility, and enhanced security
              features.
            </p>
          </div>
          <div className="flex justify-center text-lg ml-6 mt-10 gap-10">
            <Button className="bg-transparent border-[#22674E] border-2 text-white rounded-full px-5 py-8">
              <RiInstagramLine className="w-6 h-6" />
            </Button>

            <Button className="bg-transparent border-[#22674E] border-2 text-white rounded-full px-5 py-8">
              <RiFacebookLine className="w-6 h-6" />
            </Button>

            <Button className="bg-transparent border-[#22674E] border-2 text-white rounded-full px-5 py-8">
              <RiLinkedinLine className="w-6 h-6" />
            </Button>
          </div>
        </Col>
        <Col lg={1} className="flex justify-center mx-12">
          <div className=" right-0 top-0 bottom-0 border-r-2 border-gray-300"></div>
        </Col>
        <Col lg={10}>
          <div className="flex justify-center items-center mt-14">
            <div className="relative flex justify-center items-center w-full">
              <input
                className="w-[50vw] h-14 rounded-full pr-10 bg-[#02291B] text-center hover:bg-[#02291B] border-2 border-[#22674E] hover:border-[#22674E] placeholder-white placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className="relative flex justify-center items-center w-full">
              <input
                className="w-[50vw] h-14 rounded-full pr-10 bg-[#02291B] text-center hover:bg-[#02291B] border-2 border-[#22674E] hover:border-[#22674E] placeholder-white placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className="relative flex justify-center items-center w-full">
              <textarea
                className="w-[50vw] rounded-full pr-10 bg-[#02291B] text-center hover:bg-[#02291B] border-2 border-[#22674E] hover:border-[#22674E] placeholder-white placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Query"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="mt-8 bg-[#15C586] border-0 text-black rounded-full font-bold py-5">
              Send <RiArrowRightLine className="font-bold text-xl" />
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contactus;
