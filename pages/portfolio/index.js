"use client";
import { useState, useEffect, useRef } from "react";
import { Input, Row, Col, Form } from "antd";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Logo from "../../Components/Logo/Logo";
import Footer from "../../Components/Footer/Footer";
import DashNav from "../../Components/Nav/DashNav";
import { useStateContext } from "../../Context/NFTs";

const Portfolio = () => {
  const { isLoading, setIsLoading, getUser, getUserDetails } =
    useStateContext();

  const router = useRouter();
  const toastShownRef = useRef(false);

  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [isInValid, setIsInValid] = useState(false);
  const [error, setError] = useState("");
  const [isEmailInValid, setIsEmailInValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // For Key Borad Event Listening
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleVerification(event);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  // Remove the localStorage
  useEffect(() => {
    if (localStorage.getItem("portfolio-user"))
      localStorage.removeItem("portfolio-user");
  }, []);

  // If User is Not Logged IN
  useEffect(() => {
    const userData = localStorage.getItem("user-info");
    if (!userData) {
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
    }
  }, [router]);

  if (!user) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  // Handling Input
  const handleInput = (fieldName, e) => {
    setIsInValid(false);
    if (fieldName == "email" && !emailRegex.test(e.target.value)) {
      setIsEmailInValid(true);
      setEmailError("Provide the proper Email");
    }
    if (fieldName == "email" && emailRegex.test(e.target.value)) {
      setIsEmailInValid(false);
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  // Verification Handling
  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        setIsInValid(true);
        setError("Please Provide the Email ID");
        return;
      }
      setIsLoading(true);

      // Handing User Fetching
      const userPresent = await getUser(email);

      if (userPresent.data.user.userName) {
        const userDetails = await getUserDetails(
          userPresent.data.user.userName
        );

        console.log(userDetails)

        if (userDetails) {
          setIsLoading(false);

          localStorage.setItem("portfolio-user", JSON.stringify(userDetails));

          router.push("/portfolio-profile");
          setEmail("");
        } else {
          setIsLoading(false);
          setIsInValid(true);
          setError(
            userDetails?.data?.message ||
              "Something went wrong, try again later"
          );
          toast.error(`User Details with Email ID ${email} not found`);
          setEmail("");
        }
      } else {
        setIsLoading(false);
        setIsInValid(true);
        setError(
          userPresent?.data?.message || "Something went wrong, try again later"
        );
        toast.error(`User with Email ID ${email} not found`);
        setEmail("");
      }
    } catch (error) {
      setIsLoading(false);
      setIsInValid(true);
      setError(error.response?.data?.message || "Internal Server Error");
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in User Fetching at Portfolio: ", error);
    }
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
            className=" lg:w-[40vw] mt-[13vh]"
          />
        </Col>
        <Col
          lg={11}
          sm={24}
          className="flex flex-col w-full gap-y-20 lg:gap-y-10 justify-center items-center lg:pr-20 pt-10 lg:pt-20 xl:pr-32 lg:mt-0"
        >
          <Row className="text-white lg:block flex lg:w-auto w-full text-5xl justify-center lg:justify-start md:text-5xl xl:text-6xl font-semibold">
            Find &nbsp;<span className="text-[#f6851b]">Portfolio</span>!
          </Row>
          <div className="flex lg:w-full justify-start flex-row">
            <div className="max-w-[90vw] lg:w-[80vw] xl:h-[40vh] flex flex-col justify-center border-dashed border-2 border-[#0080DC] bg-white/10 p-10 rounded-3xl">
              {/* Email ID */}
              <div>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please provide Email ID!",
                    },
                  ]}
                  validateStatus={
                    isInValid && !email ? "error" : emailError ? "error" : ""
                  }
                  help={
                    isInValid && !email ? (
                      <p className="text-red-600 text-base font-bold">{`${error}`}</p>
                    ) : isEmailInValid ? (
                      <p className="text-red-600 text-base font-bold">
                        {emailError}
                      </p>
                    ) : null
                  }
                >
                  <label className="text-white text-2xl font-bold">
                    Email ID
                  </label>
                  <br />
                  <Input
                    className="w-full flex flex-wrap text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                    placeholder="Email ID.."
                    value={email}
                    onChange={(e) => handleInput("email", e)}
                  />
                </Form.Item>
              </div>
              <Row className="flex justify-center">
                <button
                  onClick={(e) => handleVerification(e)}
                  className="bg-gradient-to-r from-green-400 to-green-600 hover:bg-[#15C586] hover:shadow-green-600 hover:shadow-lg border-none btn flex items-center text-black font-bold text-xl px-5 rounded-xl"
                >
                  Find
                </button>
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

export default Portfolio;
