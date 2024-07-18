import { Button, Card, Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";

const Home = () => {
  return (
    <>
      <div id="home" className="flex overflow-x-hidden px-20 lg:pt-20">
        <div>
          <Row className="flex justify-center items-center">
            <Col lg={11} className="flex h-full flex-col justify-center">
              <h1 className="text-6xl font-bold">SYNERGY</h1>
              <p className="mt-10 text-baseline">
                A Block Chain Based System to Store and verify the Certificates
                by Creating an NFT. Connect your Metamask wallet to upload your
                Certificates and to ensure validation and Security. Enter your
                Certicate credentials to Verify your Certificate.
              </p>
              <Link href="/user-login">
                <Button className="mt-8 btn bg-[#15C586] border-0 text-black font-bold">
                  Explore More{" "}
                  <RiArrowRightSLine className="font-bold text-xl" />
                </Button>
              </Link>
            </Col>
            <Col lg={11} className="items-center justify-center flex">
              <img
                src="/Astronaut.png"
                alt="Astronaut Image"
                className="lg:w-[25vw]"
              />
            </Col>
            {/* <Col lg={11} className="gap-y-16 items-center justify-center flex mt-14">
              <img
                src="/Metamask_Astro.png"
                alt="Astronaut Image"
                className="lg:w-[25vw]"
              />
            </Col> */}
          </Row>
        </div>
      </div>
      <Row className="flex justify-end">
        <img src="/Grass.png" alt="Grass Image" className="absoulte w-[70vw]" />
      </Row>
      <div className="flex justify-center relative -top-20">
        <div className="w-[85vw] bg-[#02291B] border-[#22674E] border-4 p-5 rounded-xl">
          <Row className="justify-center items-center">
            <Col lg={9} className="flex items-center justify-center">
              <Link href="/user-login">
                <Button className="bg-transparent border-[#22674E] border-4 text-white text-4xl font-bold p-8 px-14">
                  SYNERGY
                </Button>
              </Link>
            </Col>
            <Col lg={5} className="flex items-center justify-center">
              <img
                src="/Certificate.png"
                alt="Certificate Icon"
                className="w-32"
              />
            </Col>
            <Col lg={5} className="flex items-center justify-center">
              <img src="/NFT.png" alt="NFT Icon" className="w-28" />
            </Col>
            <Col lg={5} className="flex items-center justify-center">
              <img
                src="/Verification.png"
                alt="Verification Icon"
                className="w-28"
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;
