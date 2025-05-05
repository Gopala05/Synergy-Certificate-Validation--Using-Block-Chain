"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input, Row, Col, Radio, Card, Form, Button } from "antd";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Logo from "../../Components/Logo/Logo";
import Footer from "../../Components/Footer/Footer";
import DashNav from "../../Components/Nav/DashNav";
import { useStateContext } from "../../Context/NFTs";
import { RiArrowGoBackFill } from "react-icons/ri";

const AcademicCertificates = () => {
  const {
    isLoading,
    setIsLoading,
    getCertificate,
    getSingleNFTAPI,
    getUser,
    getAllNFTsAPI,
  } = useStateContext();

  const router = useRouter();
  const toastShownRef = useRef(false);

  const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isInValid, setIsInValid] = useState(false);
  const [error, setError] = useState("");
  const [option, setOption] = useState("X");
  const [first_field, setFirstField] = useState("Board");
  const [field1, setField1] = useState("");
  const [second_field, setSecondField] = useState("Registeration Number");
  const [field2, setField2] = useState("");
  const [third_field, setThirdField] = useState("Passout Year");
  const [field3, setField3] = useState("");

  // Flipping the Card
  const handleFlip = async (e) => {
    const selectedOption = e.target.value;
    setOption(selectedOption);

    if (selectedOption === "X" || selectedOption === "XII") {
      setFirstField("Board");
      setSecondField("Registeration Number");
      setThirdField("Passout Year");
    } else {
      setFirstField("University");
      setSecondField("USN");
      setThirdField("Sem");
    }
    setIsFlipped(!isFlipped);
  };

  const handleClear = () => {
    setIsInValid(false);
    setError("");
    setField1("");
    setField2("");
    setField3("");
  };

  // For Key Borad Event Listening
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleVerification(event);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  // Remove the localStorage
  useEffect(() => {
    if (localStorage.getItem("cert-user")) localStorage.removeItem("cert-user");
    if (localStorage.getItem("NFT")) localStorage.removeItem("NFT");
    if (localStorage.getItem("NFTs")) localStorage.removeItem("NFTs");
  }, []);

  // If User is Not Logged IN
  useEffect(() => {
    const userData = localStorage.getItem("user-info");
    const authData = localStorage.getItem("auth-info");
    if (!userData && !authData) {
      router.replace("/user-login");
      if (!toastShownRef.current) {
        toast("Please Login First", {
          icon: "🚫",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        toastShownRef.current = true;
      }
    } else if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setAuth(JSON.parse(authData));
    }
  }, [router]);

  if (!auth && !user) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  // Fetching the Certificate From the Database
  const fetchDatabaseData = async (body) => {
    try {
      const response = await getSingleNFTAPI(body);
      return response.data;
    } catch (error) {
      setIsInValid(true);
      setError(error.response?.data?.message || "Internal Server Error");
      console.error("Error in fetching Database certificate:", error);
    }
  };

  // Fetching Certificate From the Block Chain Network
  const fetchNFT = async (certID) => {
    try {
      const response = await getCertificate(certID);
      return response;
    } catch (error) {
      setIsInValid(true);
      setError(error.response?.data?.message || "Internal Server Error");
      console.error("Error in fetching certificate on Net:", error);
    }
  };

  // Verification Handling
  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      if (!field1 && !field2 && !field3) {
        setIsInValid(true);
        setError("Please fill this Field");
        return;
      }
      if (!field1) {
        setIsInValid(true);
        setError(`Please Provide the ${first_field} Name`);
        return;
      }
      if (!field2) {
        setIsInValid(true);
        setError(`Please Provide the ${second_field}`);
        return;
      }
      if (!field3) {
        setIsInValid(true);
        setError(`Please Provide the ${third_field}`);
        return;
      }
      setIsLoading(true);

      // handld the Query
      const body = JSON.stringify({
        certificateID: id,
        userEmail: email,
      });

      const certificateInDB = await fetchDatabaseData(body);
      const certificateOnNet = await fetchNFT(id);

      if (certificateInDB && certificateOnNet) {
        if (
          certificateInDB.data.NFT.certificateID ===
            certificateOnNet.certificateID &&
          certificateInDB.data.NFT.userEmail === certificateOnNet.userEmail
        ) {
          setIsLoading(false);
          toast.success("Certificate found!");
          localStorage.setItem("NFT", JSON.stringify(certificateInDB.data.NFT));

          router.push("/valid");
          setID("");
          setEmail("");
        } else {
          setIsLoading(false);
          setIsInValid(true);
          setError(error.response?.data?.message || "Internal Server Error");
          toast.error("Certificate not found");
          setID("");
          setEmail("");
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsInValid(true);
      setError(error.response?.data?.message || "Internal Server Error");
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in Certificate Fetch: ", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="h-screen xl:h-full">
      <DashNav />
      <Row className="flex w-full h-full items-center">
        <div className="absolute top-28 left-4 lg:top-28 z-30">
          <button
            onClick={() => router.back()}
            type="primary"
            className="btn bg-gradient-to-r from-green-400 to-green-600 text-black font-bold text-lg"
          >
            <RiArrowGoBackFill />
            Back
          </button>
        </div>
        <Col
          lg={12}
          className="hidden lg:flex items-center h-full lg:h-[93vh] justify-center flex-col gap-y-10 lg:pl-16 xl:pl-40"
        >
          <img
            src="/Academic_Metamask.png"
            alt="Academic Metamask Image"
            className=" lg:w-[40vw] mt-[13vh]"
          />
        </Col>
        <Col
          lg={11}
          sm={24}
          className="flex flex-col w-full gap-y-8 lg:gap-y-10 justify-center items-center lg:pr-20 pt-10 lg:pt-20 xl:pr-32 lg:mt-0"
        >
          <Row className="text-white lg:block flex lg:w-auto w-full text-[2.1rem] justify-center lg:justify-start md:text-5xl xl:text-6xl font-semibold">
            Choose your&nbsp;
            <span className="text-[#f6851b]">Qualification</span>!
          </Row>
          <div className="flex lg:w-full justify-start">
            <div className="lg:max-w-[90vw] lg:w-[80vw] xl:h-[50vh] flex flex-col justify-center border-dashed border-2 border-[#0080DC] bg-white/10 p-10 rounded-3xl">
              <div className={`relative Card ${isFlipped ? "cardFlip" : ""}`}>
                <div className={`${isFlipped ? "back" : "front"}`}>
                  {/* Radio Buttons */}
                  <div className="mb-5 text-sm md:text-md lg:text-2xl">
                    <Radio.Group
                      value={option}
                      onChange={(e) => {
                        handleFlip(e), handleClear();
                      }}
                      className="flex w-full gap-x-20 justify-around items-center"
                    >
                      <Radio
                        value="X"
                        style={{
                          // fontSize: "1rem",
                          color: "white",
                          fontWeight: "normal",
                        }}
                        className="xl:text-2xl"
                      >
                        X
                      </Radio>
                      <Radio
                        value="XII"
                        style={{
                          // fontSize: "1rem",
                          color: "white",
                          fontWeight: "normal",
                        }}
                        className="xl:text-2xl"
                      >
                        XII
                      </Radio>
                      <Radio
                        value="UG"
                        style={{
                          // fontSize: "1rem",
                          color: "white",
                          fontWeight: "normal",
                        }}
                        className="xl:text-2xl"
                      >
                        UG
                      </Radio>
                    </Radio.Group>
                  </div>

                  {/* Field 1 - Board or University */}
                  <div>
                    <label className="uppercase text-xl xl:text-2xl font-semibold">
                      {first_field}
                    </label>
                    <div>
                      <Form.Item
                        className="mt-2"
                        rules={[
                          {
                            required: true,
                            message: `Please provide your ${first_field} Name!`,
                          },
                        ]}
                        validateStatus={isInValid && !field1 ? "error" : ""}
                        help={
                          isInValid && !field1 ? (
                            <p className="text-red-600 text-base font-bold mb-4">
                              {error}
                            </p>
                          ) : null
                        }
                      >
                        <Input
                          placeholder={`Enter your ${first_field} Name`}
                          value={field1}
                          className="h-[4vh] placeholder:text-gray-700"
                          onChange={(e) => {
                            setField1(e.target.value), setIsInValid(false);
                          }}
                        ></Input>
                      </Form.Item>
                    </div>
                  </div>

                  {/* Field 2 - Registeration Number ot USN */}
                  <div>
                    <label className="uppercase text-xl xl:text-2xl font-semibold">
                      {second_field}
                    </label>
                    <div>
                      <Form.Item
                        className="mt-2"
                        rules={[
                          {
                            required: true,
                            message: `Please provide your ${second_field}!`,
                          },
                        ]}
                        validateStatus={isInValid && !field2 ? "error" : ""}
                        help={
                          isInValid && !field2 ? (
                            <p className="text-red-600 text-base font-bold mb-4">
                              {error}
                            </p>
                          ) : null
                        }
                      >
                        <Input
                          placeholder={`Enter your ${second_field}`}
                          value={field2}
                          className="h-[4vh] placeholder:text-gray-700"
                          onChange={(e) => {
                            setField2(e.target.value), setIsInValid(false);
                          }}
                        ></Input>
                      </Form.Item>
                    </div>
                  </div>

                  {/* Field 3 - Passout Year ot Sem */}
                  <div>
                    <label className="uppercase text-xl xl:text-2xl font-semibold">
                      {third_field}
                    </label>
                    <Form.Item
                      className="mt-2"
                      rules={[
                        {
                          required: true,
                          message: `Please provide your ${third_field}!`,
                        },
                      ]}
                      validateStatus={isInValid && !field3 ? "error" : ""}
                      help={
                        isInValid && !field3 ? (
                          <p className="text-red-600 text-base font-bold mb-4">
                            {error}
                          </p>
                        ) : null
                      }
                    >
                      <Input
                        placeholder={`Enter your ${third_field}`}
                        value={field3}
                        className="h-[4vh] placeholder:text-gray-700"
                        onChange={(e) => {
                          setField3(e.target.value), setIsInValid(false);
                        }}
                      ></Input>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <Row className="flex justify-center cursor-not-allowed">
                <button
                  disabled
                  onClick={(e) => handleVerification(e)}
                  className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 disabled:text-black/50 cursor-not-allowed  btn flex items-center font-bold text-xl px-5 rounded-xl"
                >
                  Coming Soon...
                </button>
                {/* <button
                  onClick={(e) => handleVerification(e)}
                  className="bg-gradient-to-r from-green-400 to-green-600 hover:bg-[#15C586] hover:shadow-green-600 hover:shadow-lg border-none btn flex items-center text-black font-bold text-xl px-5 rounded-xl"
                >
                  Verify
                </button> */}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="flex w-full bottom-0 absolute">
        <Col lg={24} className="flex flex-col w-full">
          <Footer />
        </Col>
      </Row>
      {isLoading && (
        <div className="loader">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default AcademicCertificates;
