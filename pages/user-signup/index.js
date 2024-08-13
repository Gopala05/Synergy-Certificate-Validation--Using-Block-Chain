"use client";
import { Avatar, Col, Form, Input, Row, Upload } from "antd";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiHome4Fill } from "react-icons/ri";
import { Edit2Icon, Edit3Icon, UserIcon } from "lucide-react";

const UserSignUp = () => {
  const router = useRouter();
  const [isInValid, setIsInValid] = React.useState(false);
  const [error, setError] = React.useState("");
  const [passInvalid, setPassInvalid] = React.useState(false);
  const [passErrror, setPassError] = React.useState("");
  const [confPassInvalid, setConfPassInvalid] = React.useState(false);
  const [confPassErrror, setConfPassError] = React.useState("");
  const [isEmailInValid, setIsEmailInValid] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [firstField, setFirstField] = React.useState("Aadhar Number");
  const [buttonName, setButtonName] = React.useState("Get OTP");
  const [aadharInvalid, setAadharInvalid] = React.useState(false);
  const [aadharError, setAadharError] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [avatarImage, setAvatarImage] = React.useState("/User_Name.jpg");
  const [file, setFile] = React.useState();
  const [user, setUser] = React.useState({
    aadhar: "",
    otp: "",
    userName: "",
    userEmails: "",
    password: "",
    confirmPassword: "",
  });
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Key Board Event Listener
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      if (!verified && firstField == "OTP") handleOTPVerification();
      if (!verified && firstField == "Aadhar Number") handleOTP();
      if (verified) handleSignUp(event);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  // localStorage Remover
  React.useEffect(() => {
    if (localStorage.getItem("user-info")) {
      localStorage.removeItem("user-info");
      localStorage.removeItem("User-Token");
    }
  }, []);

  // Handling Input
  const handleFormFieldChange = (fieldName, e) => {
    setIsInValid(false);
    if (fieldName == "aadhar" && e.target.value.length !== 12) {
      setAadharInvalid(true);
      setAadharError("Aadhar Should be 12 characters numeric only");
    }
    if (fieldName == "aadhar" && e.target.value.length == 12) {
      setAadharInvalid(false);
      setAadharError("");
    }
    if (fieldName == "userEmails" && !emailRegex.test(e.target.value)) {
      setIsEmailInValid(true);
      setEmailError("Provide the proper Email");
    }
    if (fieldName == "userEmails" && emailRegex.test(e.target.value)) {
      setIsEmailInValid(false);
      setEmailError("");
    }
    if (fieldName == "password" && !passwordRegex.test(e.target.value)) {
      setPassInvalid(true);
      setPassError(
        "Password Should be at least 8 characters long, Should have 1 Upper Case, 1 Lower Case and 1 Special Character"
      );
    }
    if (fieldName == "password" && passwordRegex.test(e.target.value)) {
      setPassInvalid(false);
      setPassError("");
    }
    if (fieldName == "confirmPassword" && user.password != e.target.value) {
      setConfPassInvalid(true);
      setConfPassError("The Password and Confirm Password do Not Match");
    }
    if (fieldName == "confirmPassword" && user.password == e.target.value) {
      setConfPassInvalid(false);
      setConfPassError("");
    }

    setUser({ ...user, [fieldName]: e.target.value });
  };

  // Handling Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      if (
        user.aadhar === "" ||
        user.otp === "" ||
        user.userName === "" ||
        user.userEmails === "" ||
        user.password === "" ||
        user.confirmPassword === ""
      ) {
        setIsInValid(true);
        setError("Please Provide the");
        toast.error("Please Fill All Mandatory Fields");
        return;
      }

      if (user.aadhar !== 12) {
        setAadharInvalid(true);
        setAadharError("Aadhar Should be 12 characters numeric only");
      }

      if (!emailRegex.test(user.email)) {
        toast.error("Provide the proper Email");
        return;
      }

      if (!passwordRegex.test(user.password)) {
        toast.error(
          "Password must be minimum 8 characters and include at least 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character"
        );
        return;
      }

      if (user.password !== user.confirmPassword) {
        toast.error("Password and Confirm Password do not match");
        return;
      }

      const response = await axios({
        method: "POST",
        url: "/api/v1/users/sign-up",
        withCredentials: true,
        data: {
          name: user.name,
          userName: user.userName,
          userEmails: user.userEmails,
          password: user.password,
          confirmPassword: user.confirmPassword,
        },
      });

      if (response.data.status === "Success") {
        setUser({
          name: "",
          userName: "",
          userEmails: "",
          password: "",
          confirmPassword: "",
        });
        localStorage.setItem(
          "user-info",
          JSON.stringify(response.data.data.user)
        );
        localStorage.setItem("User-Token", response.data.token);
        toast.success("Registered Successfully");
        router.push("/user-home");
      } else if (response.data.status === "Bad Request") {
        toast.error(response.data.message);
      } else {
        toast.error("Unknown response status");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in Sign Up: ", error);
    }
  };

  const handleImage = (file) => {
    const reader = new FileReader();
    setFile(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarImage(reader.result);
    };
  };

  const handleOTP = async () => {
    if (!user.aadhar) return toast.error("Plese Provide the aadhar number");
    // const aadharExists = await checkAadhar(user.aadhar);
    if (true) {
      setFirstField("OTP");
      setButtonName("Verify");
    }
  };

  const handleOTPVerification = async () => {
    if (!user.otp) return toast.error("Plese Provide the OTP");
    // const otpValid = await checkOTP(user.aadhar, user.otp);
    if (true) {
      setFirstField("Aadhar number");
      setButtonName("Verified");
      setVerified(true);
    }
  };

  return (
    <div className="h-full lg:h-[100vh] bg-white">
      <Row className="flex justify-center items-center">
        <Col lg={12} className="h-[100vh] hidden lg:block">
          <img
            src="./User_SignUp.png"
            alt="Sign Up Image"
            className="h-[100vh] w-full rounded-[10rem] rounded-s-none"
          />
        </Col>
        <Col
          lg={12}
          className="p-5 lg:p-7 xl:p-20 xl:pt-3 pt-5 h-full lg:h-[100vh] w-full justify-start flex flex-col"
        >
          <div className="flex justify-end items-start">
            <button
              onClick={() => router.push("/")}
              className="btn bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600"
            >
              Home <RiHome4Fill />
            </button>
          </div>

          <div className="flex flex-col justify-center h-full lg:h-[100vh] mt-5 lg:mt-2 xl:mt-0">
            <label className="text-black flex justify-center font-bold text-4xl xl:text-5xl">
              Welcome<spam className="text-[#f6851b]">&nbsp;User</spam>!
            </label>
            <p className="text-black text-xl justify-center hidden xl:flex mt-3">
              Enter your details to get Registered
            </p>

            {/* Profile */}
            <Form.Item className="flex justify-center items-center mb-0 mt-4">
              <div className="relative">
                <Upload
                  name="avatar"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handleImage(file);
                    return false;
                  }}
                >
                  <Avatar
                    shape="circle"
                    icon={<UserIcon />}
                    size={100}
                    src={avatarImage}
                    className="border-2 border-black"
                  />
                  <div className="absolute bottom-0 right-0 p-1">
                    <Edit3Icon className="text-black border-2 border-black bg-white rounded-full p-1 cursor-pointer" />
                  </div>
                </Upload>
              </div>
            </Form.Item>

            {/* Aadhar */}
            <div className="flex w-full gap-x-5 items-center">
              <Form.Item
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Please provide Aashar Number!",
                  },
                ]}
                validateStatus={
                  isInValid && !user.aadhar
                    ? "error"
                    : aadharInvalid
                    ? "error"
                    : ""
                }
                help={
                  isInValid && !user.aadhar ? (
                    <p className="text-red-600 text-base font-bold">{`${error} Aadhar Number`}</p>
                  ) : aadharInvalid ? (
                    <p className="text-red-600 text-base font-bold">
                      {aadharError}
                    </p>
                  ) : null
                }
              >
                <label className="text-black text-xl xl:text-2xl font-bold">
                  {firstField}
                  <span className="text-red-600">*</span>
                </label>
                <br />
                <Input
                  type="number"
                  disabled={verified}
                  className="w-full text-black mt-1 h-5 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                  placeholder={
                    firstField == "OTP" ? "OTP..." : "Aadhar Number..."
                  }
                  value={firstField == "OTP" ? user.otp : user.aadhar}
                  onChange={(e) =>
                    firstField == "OTP"
                      ? handleFormFieldChange("otp", e)
                      : handleFormFieldChange("aadhar", e)
                  }
                />
              </Form.Item>
              <button
                disabled={verified || user.aadhar.length == 0 || aadharInvalid}
                onClick={() =>
                  firstField == "OTP" ? handleOTPVerification() : handleOTP()
                }
                className="btn mt-1 disabled:from-gray-500 disabled:to-gray-500 disabled:hover:cursor-not-allowed disabled:text-white bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600"
              >
                {buttonName}
              </button>
            </div>

            {/* Email ID */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide Email ID!",
                },
              ]}
              validateStatus={
                isInValid && !user.userEmails
                  ? "error"
                  : emailError
                  ? "error"
                  : ""
              }
              help={
                isInValid && !user.userEmails ? (
                  <p className="text-red-600 text-base font-bold">{`${error} Email ID`}</p>
                ) : isEmailInValid ? (
                  <p className="text-red-600 text-base font-bold">
                    {emailError}
                  </p>
                ) : null
              }
            >
              <label className="text-black text-xl xl:text-2xl font-bold">
                Email<span className="text-red-600">*</span>
              </label>
              <br />
              <Input
                disabled={!verified}
                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Email..."
                value={user.userEmails}
                onChange={(e) => handleFormFieldChange("userEmails", e)}
              />
            </Form.Item>

            {/* User Name */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide User Name!",
                },
              ]}
              validateStatus={isInValid && !user.userName ? "error" : ""}
              help={
                isInValid && !user.userName ? (
                  <p className="text-red-600 text-base font-bold">{`${error} User Name`}</p>
                ) : null
              }
            >
              <label className="text-black text-xl xl:text-2xl font-bold">
                User Name<span className="text-red-600">*</span>
              </label>
              <br />
              <Input
                disabled={!verified}
                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="User Name..."
                value={user.userName}
                onChange={(e) => handleFormFieldChange("userName", e)}
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide Password!",
                },
              ]}
              validateStatus={
                isInValid && !user.password
                  ? "error"
                  : passInvalid
                  ? "error"
                  : ""
              }
              help={
                isInValid && !user.password ? (
                  <p className="text-red-600 text-base font-bold">{`${error} Password`}</p>
                ) : passInvalid ? (
                  <p className="text-red-600 text-base font-bold">
                    {passErrror}
                  </p>
                ) : null
              }
            >
              <label className="text-black text-xl xl:text-2xl font-bold">
                Password<span className="text-red-600">*</span>
              </label>
              <br />
              <Input.Password
                disabled={!verified}
                type="password"
                className="w-full mt-1 text-black h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Password..."
                value={user.password}
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide your Full Name!",
                },
              ]}
              validateStatus={
                isInValid && !user.confirmPassword
                  ? "error"
                  : confPassInvalid
                  ? "error"
                  : ""
              }
              help={
                isInValid && !user.confirmPassword ? (
                  <p className="text-red-600 text-base font-bold">{`Please Confirm your Password`}</p>
                ) : confPassInvalid ? (
                  <p className="text-red-600 text-base font-bold">
                    {confPassErrror}
                  </p>
                ) : null
              }
            >
              <label className="text-black text-xl xl:text-2xl font-bold">
                Confirm Password<span className="text-red-600">*</span>
              </label>
              <br />
              <Input.Password
                type="password"
                disabled={user.password ? false : true}
                className="w-full mt-1 text-black h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Confirm Password..."
                value={user.confirmPassword}
                onChange={(e) => handleFormFieldChange("confirmPassword", e)}
              />
            </Form.Item>

            <div className="text-blue-500 flex w-full justify-between italic underline mt-2 lg:mt-0 xl:mt-2 text-xl">
              <Link
                href="/user-login"
                className="text-blue-500 italic underline text-sm lg:text-base xl:text-xl"
              >
                Already have an account ?
              </Link>
              <Link
                href="/auth-form"
                className="text-blue-500 italic underline text-sm lg:text-base xl:text-xl xl:mt-2"
              >
                Request for Auth Credentials ?
              </Link>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSignUp}
                className="mt-8 lg:mt-3 xl:mt-8 btn bg-gradient-to-r from-green-400 to-green-600 text-xl w-full border-0 text-white hover:text-black rounded-2xl font-bold transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-green-600 hover:-translate-y-2"
              >
                Register
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-black font-semibold xl:text-base text-[0.68rem] md:text-sm mt-2">
                By clicking on <i>Register</i> you agree to &nbsp;
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
    </div>
  );
};

export default UserSignUp;
