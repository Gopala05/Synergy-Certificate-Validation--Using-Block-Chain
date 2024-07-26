"use client";
import { Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RiHome4Fill } from "react-icons/ri";
import emailjs from "@emailjs/browser";
import { Logo } from "../../Components";
import { useStateContext } from "../../Context/NFTs";

const AuthForm = () => {
  const { isLoading, setIsLoading } = useStateContext();
  const router = useRouter();
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    designation: "",
    organization: "",
    contact: "",
    email: "",
    estimated: "",
  });
  const [isInValid, setIsInValid] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isEmailInValid, setIsEmailInValid] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Key Borad Listener
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRequest(event);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  // Removing Local Storage
  React.useEffect(() => {
    if (localStorage.getItem("user-info")) {
      localStorage.removeItem("user-info");
      localStorage.removeItem("User-Token");
    }
    if (localStorage.getItem("auth-info")) {
      localStorage.removeItem("auth-info");
      localStorage.removeItem("Auth-Token");
    }
  }, []);

  // Handling Input
  const handleFormFieldChange = (fieldName, e) => {
    setIsInValid(false);
    if (fieldName == "email" && !emailRegex.test(e.target.value)) {
      setIsEmailInValid(true);
      setEmailError("Provide the proper Email");
    }
    if (fieldName == "email" && emailRegex.test(e.target.value)) {
      setIsEmailInValid(false);
      setEmailError("");
    }
    setUser({ ...user, [fieldName]: e.target.value });
  };

  // Handling Request
  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (
        user.firstName === "" ||
        user.lastName === "" ||
        user.designation === "" ||
        user.organization === "" ||
        user.contact === "" ||
        user.email === ""
      ) {
        setIsInValid(true);
        setIsLoading(false);
        setError("Please Fill the");
        toast.error("Please Fill All Mandatory Fields");
        return;
      }

      const MailParams = {
        from_mail: user.email,
        auth_name: user.firstName + " " + user.lastName,
        org_name: user.organization,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        designation: user.designation,
        contact_no: user.contact,
        estimate: user.estimated > 0 ? "None" : user.estimated,
        year: new Date().getFullYear(),
      };

      try {
        const response = await emailjs.send(
          process.env.NEXT_PUBLIC_SERVICE_ID_FOR_REQ,
          process.env.NEXT_PUBLIC_TEMPLATE_ID_FOR_REQ,
          MailParams,
          process.env.NEXT_PUBLIC_USER_ID_FOR_REQ
        );

        if (response.status == 200) {
          setIsLoading(false);
          toast.success(
            "Thank you for supporting us. We will get back to you within 3 - 5 working days."
          );
          router.push("/");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error in sending email: ", error);
        toast.error("Something went wrong, please try again later.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in Login: ", error);
    }
  };

  return (
    <div className="h-full lg:h-[100vh] bg-white">
      <Row className="flex justify-center items-center">
        <Col lg={12} className="h-[100vh] hidden lg:block">
          <img
            src="./Request_Metamask.png"
            alt="Request Image"
            className="h-[100vh] w-full rounded-s-none rounded-[10rem]"
          />
        </Col>
        <Col
          lg={12}
          className="p-5 lg:p-7 xl:p-20 pt-20 xl:pt-5 h-full lg:h-[100vh] w-full justify-start flex flex-col"
        >
          <div className="flex justify-end items-start">
            <button
              onClick={() => router.push("/")}
              className="xl:mt-5 top-5 absolute btn bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600"
            >
              Home <RiHome4Fill />
            </button>
          </div>
          <div className="flex flex-col justify-center h-full lg:h-[100vh] mt-5 xl:mt-0">
            <label className="text-black flex justify-center font-bold lg:text-3xl text-4xl xl:text-5xl">
              Welcome <spam className="text-[#f6851b]">&nbsp;Auth</spam>!
            </label>
            <p className="text-black text-lg lg:text-xl lg:hidden flex xl:flex justify-center mt-3">
              Enter your details to raise a Request
            </p>

            {/* Name */}
            <div className="flex flex-row justify-between gap-x-5 w-full mt-5">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please provide First Name!",
                  },
                ]}
                validateStatus={isInValid && !user.firstName ? "error" : ""}
                help={
                  isInValid && !user.firstName ? (
                    <p className="text-red-600 text-base font-bold">{`${error} First Name`}</p>
                  ) : null
                }
                className="flex-grow"
              >
                <label className="text-black lg:text-lg xl:text-2xl font-bold">
                  First Name<span className="text-red-600">*</span>
                </label>
                <br />
                <Input
                  className="w-full flex-grow text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                  placeholder="First Name.."
                  value={user.firstName}
                  onChange={(e) => handleFormFieldChange("firstName", e)}
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please provide Last Name!",
                  },
                ]}
                validateStatus={isInValid && !user.lastName ? "error" : ""}
                help={
                  isInValid && !user.lastName ? (
                    <p className="text-red-600 text-base font-bold">{`${error} Last Name`}</p>
                  ) : null
                }
                className="flex-grow"
              >
                <label className="text-black lg:text-lg xl:text-2xl font-bold">
                  Last Name<span className="text-red-600">*</span>
                </label>
                <br />
                <Input
                  className="w-full flex-grow text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                  placeholder="Last Name.."
                  value={user.lastName}
                  onChange={(e) => handleFormFieldChange("lastName", e)}
                />
              </Form.Item>
            </div>

            {/* Designation */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide Designation!",
                },
              ]}
              validateStatus={isInValid && !user.designation ? "error" : ""}
              help={
                isInValid && !user.designation ? (
                  <p className="text-red-600 text-base font-bold">{`${error} Designation`}</p>
                ) : null
              }
            >
              <label className="text-black lg:text-lg xl:text-2xl font-bold">
                Designation<span className="text-red-600">*</span>
              </label>
              <br />
              <Input
                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Designation.."
                value={user.designation}
                onChange={(e) => handleFormFieldChange("designation", e)}
              />
            </Form.Item>

            {/* Org */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide Organization Name!",
                },
              ]}
              validateStatus={isInValid && !user.organization ? "error" : ""}
              help={
                isInValid && !user.organization ? (
                  <p className="text-red-600 text-base font-bold">{`${error} Organization Name`}</p>
                ) : null
              }
            >
              <label className="text-black lg:text-lg xl:text-2xl font-bold">
                Organization Name<span className="text-red-600">*</span>
              </label>
              <br />
              <Input
                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Organization Name.."
                value={user.organization}
                onChange={(e) => handleFormFieldChange("organization", e)}
              />
            </Form.Item>

            {/* Contact Number */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide Contact Number!",
                },
              ]}
              validateStatus={isInValid && !user.contact ? "error" : ""}
              help={
                isInValid && !user.contact ? (
                  <p className="text-red-600 text-base font-bold">{`${error} Contact Number`}</p>
                ) : null
              }
            >
              <label className="text-black lg:text-lg xl:text-2xl font-bold">
                Contact Number<span className="text-red-600">*</span>
              </label>
              <br />
              <Input
                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Contact Number.."
                value={user.contact}
                onChange={(e) => handleFormFieldChange("contact", e)}
              />
            </Form.Item>

            {/* Email ID */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide Email ID!",
                },
              ]}
              validateStatus={
                isInValid && !user.email ? "error" : emailError ? "error" : ""
              }
              help={
                isInValid && !user.email ? (
                  <p className="text-red-600 text-base font-bold">{`${error} Email ID`}</p>
                ) : isEmailInValid ? (
                  <p className="text-red-600 text-base font-bold">
                    {emailError}
                  </p>
                ) : null
              }
            >
              <label className="text-black lg:text-lg xl:text-2xl font-bold">
                Email ID<span className="text-red-600">*</span>
              </label>
              <br />
              <Input
                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Email ID.."
                value={user.email}
                onChange={(e) => handleFormFieldChange("email", e)}
              />
            </Form.Item>

            {/* Estimated Number of Users*/}
            <Form.Item>
              <label className="text-black lg:text-lg xl:text-2xl font-bold">
                Estimated Number of Users
              </label>
              <br />
              <Input
                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Estimated Number of Users.."
                value={user.estimated}
                onChange={(e) => handleFormFieldChange("estimated", e)}
              />
            </Form.Item>
            <div className="mt-1 flex justify-center text-left lg:text-justify">
              <Checkbox
                className={`text-sm lg:text-xs xl:text-sm ${
                  checked ? "font-bold" : "font-semibold"
                }`}
                onChange={(e) => setChecked(e.target.checked)}
              >
                I here by declare that, all the details provided above are true
                and correct to the best of my knowledge. <br />I understand and
                agree that this data collected by the Synergy shall be stored
                and used by the Synergy as per the prevalent data protection
                laws/rules/regulations/guidelines as may be set out by the Govt.
                of India or the State Government.
              </Checkbox>
            </div>

            <div className="flex justify-center">
              <button
                disabled={!checked}
                onClick={handleRequest}
                className={`mt-4 btn hover:text-black bg-gradient-to-r from-green-400 to-green-600 text-xl w-full border-0 text-white rounded-2xl font-bold transition-transform duration-300 ease-in-out ${
                  checked
                    ? "hover:shadow-2xl hover:shadow-green-600 hover:-translate-y-2"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Request
              </button>
            </div>
            <div className="flex font-semibold justify-center">
              <p className="text-black xl:text-base text-[0.68rem] md:text-sm mt-2">
                By clicking on <i>Request</i> you agree to&nbsp;
                <a
                  href="/Terms_and_Conditions.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 hover:underline underline"
                >
                  Terms of Services
                </a>
                &nbsp;|&nbsp;
                <a
                  href="/Privacy_Policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 hover:underline underline"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
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

export default AuthForm;
