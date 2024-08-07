"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input, Row, Col, Radio, Card, Form, Button } from "antd";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Logo from "../../Components/Logo/Logo";
import Footer from "../../Components/Footer/Footer";
import DashNav from "../../Components/Nav/DashNav";
import { useStateContext } from "../../Context/NFTs";

const ValidationPage = () => {
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
  const [option, setOption] = useState("Evault");
  const [first_field, setFirstField] = useState("");
  const second_field = useState("Email ID");

  // Flipping the Card
  const handleFlip = async (e) => {
    const selectedOption = e.target.value;
    setOption(selectedOption);

    if (selectedOption === "Evault") {
      setFirstField("");
    } else {
      setFirstField("Certificate ID");
    }
    setIsFlipped(!isFlipped);
  };

  const handleClear = () => {
    setIsInValid(false);
    setError("");
    setEmail("");
    setID("");
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

  // Fetching All the Certificate
  const evault = async () => {
    try {
      const resp = await getUser(email);
      if (resp.data.status == "OK") {
        const response = await getAllNFTsAPI(resp.data.user.userEmails);

        if (response.data.status === "Success") {
          const fetchedCertificates = [];

          await Promise.all(
            response.data.data.nftsByEmails.map(async (nftsByEmail) => {
              const email = Object.keys(nftsByEmail)[0];
              const nfts = nftsByEmail[email];

              await Promise.all(
                nfts.map(async (nft) => {
                  const res = await getCertificate(nft.certificateID);
                  if (res.userEmail === email) {
                    fetchedCertificates.push({ ...nft });
                  }
                })
              );
            })
          );

          localStorage.setItem("cert-user", JSON.stringify(resp.data.user));
          return fetchedCertificates;
        }
      } else {
        toast.error(error.response?.data?.message || "Internal Server Error");
        setError(error.response?.data?.message || "Internal Server Error");
        console.error("Error in fetching All certificate:", error);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Internal Server Error");
      console.error("Error in fetching All certificate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Verification Handling
  const handleVerification = async (e) => {
    e.preventDefault();

    if (option != "Evault") {
      try {
        if (!id && !email) {
          setIsInValid(true);
          setError("Please fill this Field");
          return;
        }
        if (!id) {
          setIsInValid(true);
          setError("Please Provide the Certificate ID");
          return;
        }
        if (!email) {
          setIsInValid(true);
          setError("Please Provide the Email ID");
          return;
        }
        setIsLoading(true);
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
            localStorage.setItem(
              "NFT",
              JSON.stringify(certificateInDB.data.NFT)
            );

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
    } else {
      try {
        if (!email) {
          setIsInValid(true);
          setError("Please Provide the Email ID");
          return;
        }
        setIsLoading(true);
        const certificates = await evault();
        if (certificates.length > 0) {
          localStorage.setItem("NFTs", JSON.stringify(certificates));
          setEmail("");
          router.push("/evault");
        } else {
          setIsLoading(false);
          setIsInValid(true);
          setError(error.response?.data?.message || "Internal Server Error");
          toast.error("Certificates not found");
          setEmail("");
        }
      } catch (error) {
        setIsLoading(false);
        setIsInValid(true);
        setError(error.response?.data?.message || "Internal Server Error");
        toast.error(error.response?.data?.message || "Internal Server Error");
        console.error("Error in Certificate Fetch: ", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen xl:h-full">
      <DashNav />
      <Row className="flex w-full h-full items-center">
        <Col
          lg={12}
          className="hidden lg:flex items-center h-full lg:h-[93vh] justify-center flex-col gap-y-10 lg:pl-16 xl:pl-40"
        >
          <img
            src="/Verify_Metamask.png"
            alt="Verify Image"
            className=" lg:w-[40vw] mt-[10vh]"
          />
        </Col>
        <Col
          lg={11}
          sm={24}
          className="flex flex-col w-full gap-y-20 lg:gap-y-10 justify-center items-center lg:pr-20 pt-10 lg:pt-20 xl:pr-32 lg:mt-0"
        >
          <Row className="text-white lg:block flex lg:w-auto w-full text-4xl justify-center lg:justify-start md:text-5xl xl:text-6xl font-semibold">
            Find your&nbsp;<span className="text-[#f6851b]">Certificate</span>!
          </Row>
          <div className="flex w-full justify-start flex-row">
            <div className="max-w-[90vw] lg:w-[80vw] xl:h-[40vh] flex flex-col justify-center border-dashed border-2 border-[#0080DC] bg-white/10 p-10 rounded-3xl">
              <div className={`relative Card ${isFlipped ? "cardFlip" : ""}`}>
                <div className={`${isFlipped ? "back" : "front"}`}>
                  {/* Radio Buttons */}
                  <div className="mb-5 text-sm md:text-md lg:text-2xl">
                    <Radio.Group
                      value={option}
                      onChange={(e) => {
                        handleFlip(e), handleClear();
                      }}
                      className="flex w-full gap-x-5 items-center"
                    >
                      <Radio
                        value="Evault"
                        style={{
                          // fontSize: "1rem",
                          color: "white",
                          fontWeight: "normal",
                        }}
                        className="xl:text-2xl"
                      >
                        Evault
                      </Radio>
                      <Radio
                        value="Specific Certificate"
                        style={{
                          // fontSize: "1rem",
                          color: "white",
                          fontWeight: "normal",
                        }}
                        className="xl:text-2xl"
                      >
                        Specific Certificate
                      </Radio>
                    </Radio.Group>
                  </div>

                  {/* Certificate ID */}
                  {first_field && (
                    <div>
                      <label className="text-xl xl:text-2xl font-semibold">
                        {first_field}
                      </label>
                      <Form.Item
                        className="mt-2"
                        rules={[
                          {
                            required: true,
                            message: "Please provide your Certificate ID!",
                          },
                        ]}
                        validateStatus={isInValid && !id ? "error" : ""}
                        help={
                          isInValid && !id ? (
                            <p className="text-red-600 text-base font-bold mb-4">
                              {error}
                            </p>
                          ) : null
                        }
                      >
                        <Input
                          placeholder="Provide the Certificate ID"
                          value={id}
                          className="h-[4vh]"
                          onChange={(e) => {
                            setID(e.target.value), setIsInValid(false);
                          }}
                        ></Input>
                      </Form.Item>
                    </div>
                  )}

                  {/* Email ID */}
                  <div>
                    <label className="text-xl xl:text-2xl font-semibold">
                      {second_field}
                    </label>
                    <div>
                      <Form.Item
                        className="mt-2"
                        rules={[
                          {
                            required: true,
                            message: "Please provide your Email ID!",
                          },
                        ]}
                        validateStatus={isInValid && !email ? "error" : ""}
                        help={
                          isInValid && !email ? (
                            <p className="text-red-600 text-base font-bold">
                              {error}
                            </p>
                          ) : null
                        }
                      >
                        <Input
                          placeholder="Provide the Email ID"
                          value={email}
                          className="h-[4vh]"
                          onChange={(e) => {
                            setEmail(e.target.value), setIsInValid(false);
                          }}
                        ></Input>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <Row className="flex justify-center">
                <button
                  onClick={(e) => handleVerification(e)}
                  className="bg-gradient-to-r from-green-400 to-green-600 hover:bg-[#15C586] hover:shadow-green-600 hover:shadow-lg border-none btn flex items-center text-black font-bold text-xl px-5 rounded-xl"
                >
                  Verify
                </button>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="flex w-full bottom-0 lg:absolute">
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

export default ValidationPage;
