"use client";
import { Col, Form, Input, Row } from "antd";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RiHome4Fill } from "react-icons/ri";

const AuthLogin = () => {
  const router = useRouter();
  const [auth, setAuth] = React.useState({
    authID: "",
    password: "",
  });
  const [isInValid, setIsInValid] = React.useState(false);
  const [error, setError] = React.useState("");

  // Key Board Listener
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
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
    if (localStorage.getItem("auth-info")) {
      localStorage.removeItem("auth-info");
      localStorage.removeItem("Auth-Token");
    }
  }, []);

  // Handling Input
  const handleFormFieldChange = (fieldName, e) => {
    setIsInValid(false);
    setAuth({ ...auth, [fieldName]: e.target.value });
  };

  // Handling Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (auth.authID === "" || auth.password === "") {
        setIsInValid(true);
        setError("Please Fill the ");
        toast.error("Please Fill All Mandatory Fields");
        return;
      }
      const response = await axios({
        method: "POST",
        url: "/api/v1/auth/sign-in",
        withCredentials: true,
        data: {
          authID: auth.authID,
          password: auth.password,
        },
      });

      if (response.data.status === "Success") {
        toast.success("Signed in Successfully");
        localStorage.setItem(
          "auth-info",
          JSON.stringify(response.data.data.auth)
        );
        localStorage.setItem("Auth-Token", response.data.token);
        setAuth({ authID: "", password: "" });
        router.push("/auth-home");
      } else if (response.data.status === "Bad Request") {
        toast.error(response.data.message);
      } else {
        toast.error("Unknown response status");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in Login: ", error);
    }
  };

  return (
    <div className="h-[100vh] bg-white">
      <Row className="flex justify-center items-center">
        <Col lg={12} className="h-[100vh] hidden lg:block">
          <img
            src="./Auth_SignIn.png"
            alt="Login Image"
            className="h-[100vh] w-full rounded-s-none rounded-[10rem]"
          />
        </Col>
        <Col
          lg={12}
          className="p-5 lg:p-10 xl:p-20 pt-10 h-[100vh] w-full justify-start flex flex-col"
        >
          <div className="flex justify-end items-start">
            <button
              onClick={() => router.push("/")}
              className="btn bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600"
            >
              Home <RiHome4Fill />
            </button>
          </div>
          <div className="flex flex-col justify-center h-[100vh]">
            <label className="text-black flex justify-center font-bold text-5xl">
              Welcome<span className="text-[#f6851b]">&nbsp;Back</span>!
            </label>
            <p className="text-black text-xl flex justify-center mt-3 mb-14">
              Enter your Credentials to access
            </p>

            {/* User Name */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please provide User Name!",
                },
              ]}
              validateStatus={isInValid && !auth.userName ? "error" : ""}
              help={
                isInValid && !auth.userName ? (
                  <p className="text-red-600 text-base font-bold">{`${error} User Name`}</p>
                ) : null
              }
            >
              <label className="text-black text-2xl font-bold">
                User ID<span className="text-red-600">*</span>
              </label>
              <br />
              <Input
                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="User ID.."
                value={auth.authID}
                onChange={(e) => handleFormFieldChange("authID", e)}
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
              validateStatus={isInValid && !auth.password ? "error" : ""}
              help={
                isInValid && !auth.password ? (
                  <p className="text-red-600 text-base font-bold">{`${error} Password`}</p>
                ) : null
              }
            >
              <label className="text-black text-2xl font-bold">
                Password<span className="text-red-600">*</span>
              </label>
              <br />
              <Input.Password
                type="password"
                className="w-full mt-1 text-black h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Password..."
                value={auth.password}
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </Form.Item>

            <div className="text-blue-500 italic underline mt-2 text-xl">
              Forgot password ?
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                className="mt-8 btn hover:text-black bg-gradient-to-r from-green-400 to-green-600 text-xl w-full border-0 text-white rounded-2xl font-bold transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-green-600 hover:-translate-y-2"
              >
                Login
              </button>
            </div>
            <div className="flex font-semibold justify-center">
              <p className="text-black xl:text-base text-xs md:text-sm mt-2">
                By clicking on <i>Login</i> you agree to &nbsp;
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

export default AuthLogin;
