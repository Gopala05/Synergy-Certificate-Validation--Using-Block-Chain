import { Button, Col, Row } from "antd";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import TypewriterComponent from "typewriter-effect";

const Home = () => {
  return (
    <>
      <div
        id="home"
        className="flex overflow-x-hidden px-10 lg:px-2 xl:px-20 lg:pt-20 pt-24"
      >
        <div>
          <Row className="flex justify-center items-center">
            <Col
              lg={11}
              md={11}
              sm={24}
              className="flex h-full flex-col justify-center xl:pt-20"
            >
              <h1 className="text-6xl xl:text-7xl font-bold text-center lg:text-left">
                <TypewriterComponent
                  options={{
                    strings: ["SYNERGY"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <p className="mt-10 text-baseline text-center xl:text-[1.5rem] lg:text-justify xl:text-justify tracking-wide">
                A Block Chain Based System to Store and verify the Certificates
                by Creating an NFT. Connect your Metamask wallet to upload your
                Certificates and to ensure validation and Security. Enter your
                Certicate credentials to Verify your Certificate.
              </p>
              <div className="flex w-full justify-center items-center lg:justify-start">
                <Link href="/user-login">
                  <Button className="hover:scale-110 transition-all mt-8 btn xl:text-[1.3rem] bg-[#15C586] border-0 text-black font-bold flex items-center">
                    <span>Explore More</span>
                    <ArrowRight />
                  </Button>
                </Link>
              </div>
            </Col>
            <Col
              lg={11}
              md={11}
              sm={24}
              className="items-center justify-center flex"
            >
              <motion.img
                src="/Astronaut.png"
                alt="Astronaut Image"
                className="xl:w-[25vw] mr-14 md:mr-0"
                animate={{
                  x: [0, 60, 0],
                  y: [0, -10, 0],
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
      <Row className="flex justify-end">
        <img
          src="/Grass.png"
          alt="Grass Image"
          className="absoulte xl:w-[70vw] w-[150vw] mt-5 h-[10rem] lg:w-[80vw] lg:h-full max-w-[150vw] lg:max-w-[100vw] lg:mt-0"
        />
      </Row>
      <div className="lg:flex justify-center hidden relative -top-20 lg:-top-14 xl:-top-8">
        <div className="xl:w-[85vw] lg:w-[90vw] bg-[#02291B] border-[#22674E] border-4 p-2 xl:p-5 rounded-xl">
          <Row className="justify-center items-center">
            <Col
              lg={8}
              md={8}
              sm={24}
              className="flex items-center justify-center"
            >
              <Link href="/user-login">
                <Button className="bg-transparent border-[#22674E] border-4 text-white lg:text-3xl xl:text-4xl font-bold p-8 px-14">
                  SYNERGY
                </Button>
              </Link>
            </Col>
            <Col lg={5} className="flex items-center justify-center">
              <img
                src="/Certificate.png"
                alt="Certificate Icon"
                className="w-32 lg:w-24"
              />
            </Col>
            <Col
              lg={5}
              md={5}
              sm={24}
              className="flex items-center justify-center"
            >
              <img src="/NFT.png" alt="NFT Icon" className="w-28 lg:w-20" />
            </Col>
            <Col
              lg={5}
              md={5}
              sm={24}
              className="flex items-center justify-center"
            >
              <img
                src="/Verification.png"
                alt="Verification Icon"
                className="w-28 lg:w-20"
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;
