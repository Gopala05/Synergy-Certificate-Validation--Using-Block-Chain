import { Col, Input, Row } from "antd";
import Link from "next/link";
import React from "react";
import { RiCalendar2Line, RiSearchLine } from "react-icons/ri";

const Blog = () => {
  return (
    <div
      id="blog"
      className="lg:h-[100vh] p-10 pt-24 lg:p-5 lg:pt-24 xl:p-20 flex flex-col justify-center"
    >
      <label className="text-5xl font-extrabold flex justify-center">
        See our Blog
      </label>
      <p className="text-baseline flex text-center lg:text-left justify-center mt-3">
        Get the latest news, updates, expert insights, and useful tips.
      </p>
      <div className="hidden lg:flex justify-center items-center mt-10">
        <div className="relative flex justify-center items-center w-full">
          <input
            className="w-[50vw] h-14 rounded-full pr-10 bg-[#02291B] text-start hover:bg-[#02291B] border-2 border-[#22674E] hover:border-[#22674E] placeholder-white placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
            placeholder="Search..."
          />
          <Link href="/user-login">
            <RiSearchLine className="absolute lg:right-[17rem] lg:top-5 xl:right-[27rem] text-white font-bold" />
          </Link>
        </div>
      </div>
      <div>
        <Row className="flex justify-center lg:mt-20 mt-5 gap-10 ">
          <Col lg={6}>
            <div className="bg-[#02291B] rounded-lg hover:shadow-2xl hover:shadow-green-600 transition-transform duration-300 ease-in-out hover:-translate-y-2">
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
                  <label className="xl:text-2xl lg:text-lg font-extrabold mt-5">
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
            <div className="bg-[#02291B] rounded-lg hover:shadow-2xl hover:shadow-green-600 transition-transform duration-300 ease-in-out hover:-translate-y-2">
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
                  <label className="xl:text-2xl lg:text-lg font-extrabold mt-5">
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
            <div className="bg-[#02291B] rounded-lg hover:shadow-2xl hover:shadow-green-600 transition-transform duration-300 ease-in-out hover:-translate-y-2">
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
                  <label className="xl:text-2xl lg:text-lg font-extrabold mt-5">
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
