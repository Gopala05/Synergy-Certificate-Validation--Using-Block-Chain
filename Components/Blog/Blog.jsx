import { Col, Input, Row } from "antd";
import React from "react";
import { RiCalendar2Line, RiSearchLine } from "react-icons/ri";

const Blog = () => {
  return (
    <div id="blog" className="h-[100vh] p-20 xl:pt-32 lg:pt-32">
      <label className="text-5xl font-extrabold flex justify-center">
        See our Blog
      </label>
      <p className="text-baseline flex justify-center mt-3">
        Get the latest news, updates, expert insights, and useful tips.
      </p>
      <div className="flex justify-center items-center mt-10">
        <div className="relative flex justify-center items-center w-full">
          <Input
            className="w-[50vw] h-14 rounded-full pr-10 bg-[#02291B] hover:bg-[#02291B] border-2 border-[#22674E] hover:border-[#22674E] placeholder-white placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
            placeholder="Search..."
          />
          <RiSearchLine className="absolute right-72 text-white font-bold" />
        </div>
      </div>
      <div>
        <Row className="flex justify-center mt-12 gap-10 ">
          <Col lg={6}>
            <div className="bg-[#02291B] rounded-lg">
              <img
                src="./Blog1.jpg"
                alt="Blog 1 Image"
                className="w-full bg-white"
              />
              <div className="p-5 border-x-2 border-b-2 border-[#22674E]">
                <div className="mt-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 p-3 py-1.5 rounded-full dark:bg-[#084E36] dark:text-white dark:font-bold">
                    Certificate
                  </span>
                </div>
                <div className="mt-5">
                  <label className="text-xl font-extrabold mt-5">
                    Internship Certificate
                  </label>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <RiCalendar2Line /> Jan 1, 2024
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="bg-[#02291B] rounded-lg">
              <img
                src="./Blog2.jpg"
                alt="Blog 2 Image"
                className="w-full bg-white"
              />
              <div className="p-5 border-x-2 border-b-2 border-[#22674E]">
                <div className="mt-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 p-3 py-1.5 rounded-full dark:bg-[#084E36] dark:text-white dark:font-bold">
                    Validation
                  </span>
                </div>
                <div className="mt-5">
                  <label className="text-xl font-extrabold mt-5">
                    Hackathon Certificate
                  </label>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <RiCalendar2Line /> Mar 21, 2024
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="bg-[#02291B] rounded-lg">
              <img
                src="./Blog3.jpg"
                alt="Blog 3 Image"
                className="w-full bg-white"
              />
              <div className="p-5 border-x-2 border-b-2 border-[#22674E]">
                <div className="mt-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 p-3 py-1.5 rounded-full dark:bg-[#084E36] dark:text-white dark:font-bold">
                    Metamask
                  </span>
                </div>
                <div className="mt-5">
                  <label className="text-xl font-extrabold mt-5">
                    Metamask Wallet
                  </label>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <RiCalendar2Line /> June 5, 2024
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Blog;
