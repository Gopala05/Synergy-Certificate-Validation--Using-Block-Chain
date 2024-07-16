import React from "react";
import { Col, Row } from "antd";
import { RiArrowRightLine } from "react-icons/ri";
import Link from "next/link";

const About = () => {
  return (
    <div id="about" className="h-[100vh] flex flex-col p-20 justify-center">
      <label className="flex justify-center text-5xl font-extrabold">
        About
      </label>
      <p className="flex justify-center mt-2">
        A Block Chain based System to Store and Verify the Certificates.
      </p>

      <Row className="flex px-10 mt-20 w-full">
        {/* Metamask */}
        <Col lg={11}>
          <div className="flex justify-center items-center ml-9">
            <img src="/Metamask.png" alt="Metamask Icon" className="w-16" />
            <span className="font-extrabold text-xl">Metamask</span>
          </div>
          <div className="flex justify-end items-center">
            <Row className="flex justify-end">
              <Col lg={12}>
                <p className="text-lg">
                  Creating an NFT on Sepolia Ethereum involves deploying a smart
                  contract , which defines the properties and functions for
                  NFTs.
                </p>
              </Col>
            </Row>
          </div>
          <div className="flex justify-end items-center">
            <Row className="flex w-full justify-end mt-5">
              <Col lg={12} className="flex items-center gap-1">
                <Link href="/user-login" className="underline">
                  Find out more
                </Link>
                <RiArrowRightLine />
              </Col>
            </Row>
          </div>
        </Col>

        <Col lg={1} className="flex justify-center ml-12">
          <div className=" right-0 top-0 bottom-0 border-r-4 border-gray-300"></div>
        </Col>

        {/* NFT Tokens */}
        <Col lg={11}>
          <div className="flex justify-start items-center px-10">
            <img src="/NFT_Icon.png" alt="Metamask Icon" className="w-16" />
            <span className="font-extrabold text-xl">NFT Tokens</span>
          </div>
          <div className="flex justify-center w-full items-center">
            <Row className="flex justify-center">
              <Col lg={12} className="mr-40">
                <p className="text-lg">
                  An NFT is Created for each certificate through the ETH and a
                  transaction is created. The Certificate is Validated through
                  the transaction.
                </p>
              </Col>
            </Row>
          </div>
          <div className="flex justify-center items-center">
            <Row className="flex w-full justify-center mt-5">
              <Col lg={12} className="flex items-center gap-1 mr-20">
                <Link href="/user-login" className="underline">
                  Find out more
                </Link>
                <RiArrowRightLine />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="flex px-10 mt-10 w-full">
        <Col lg={9} className="ml-32">
          <hr className="border-2" />
        </Col>
        <Col lg={2}></Col>
        <Col lg={9}>
          <hr className="border-2" />
        </Col>
      </Row>

      <Row className="flex px-10 mt-16 w-full">
        {/* Certificate */}
        <Col lg={11}>
          <div className="flex justify-center items-center ml-9">
            <img
              src="/Certificate_Icon.png"
              alt="Certificate Icon"
              className="w-14"
            />
            <span className="ml-2 font-extrabold text-xl">Certificate</span>
          </div>
          <div className="flex justify-end items-center">
            <Row className="flex justify-end">
              <Col lg={12}>
                <p className="text-lg">
                  View validated Certificates that are Stored with a proper
                  validation in our System which can be accessed by the proper
                  Credentials.
                </p>
              </Col>
            </Row>
          </div>
          <div className="flex justify-end items-center">
            <Row className="flex w-full justify-end mt-5">
              <Col lg={12} className="flex items-center gap-1">
                <Link href="/user-login" className="underline">
                  Find out more
                </Link>
                <RiArrowRightLine />
              </Col>
            </Row>
          </div>
        </Col>

        <Col lg={1} className="flex justify-center ml-12">
          <div className=" right-0 top-0 bottom-0 border-r-4 border-gray-300"></div>
        </Col>

        {/* Validation*/}
        <Col lg={11}>
          <div className="flex justify-start items-center px-10">
            <img
              src="/Validation_Icon.png"
              alt="Validation Icon"
              className="w-14"
            />
            <span className="ml-2 font-extrabold text-xl">Validation</span>
          </div>
          <div className="flex justify-center w-full items-center">
            <Row className="flex justify-center">
              <Col lg={12} className="mr-40">
                <p className="text-lg">
                  Validation ensures the ownership of a digital asset by
                  verifying its metadata and transaction history on the
                  blockchain.
                </p>
              </Col>
            </Row>
          </div>
          <div className="flex justify-center items-center">
            <Row className="flex w-full justify-center mt-5">
              <Col lg={12} className="flex items-center gap-1 mr-20">
                <Link href="/user-login" className="underline">
                  Find out more
                </Link>
                <RiArrowRightLine />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default About;
