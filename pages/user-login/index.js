"use client";
import { Col, Form, Input, Row } from "antd";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiHome4Fill } from "react-icons/ri";

const UserLogin = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    userName: "",
    password: "",
  });
  const [isInValid, setIsInValid] = React.useState(false);
  const [error, setError] = React.useState("");

  // Key Borad Listener
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
    if (localStorage.getItem("user-info")) {
      localStorage.removeItem("user-info");
      localStorage.removeItem("User-Token");
    }
  }, []);

  // Handling Input
  const handleFormFieldChange = (fieldName, e) => {
    setIsInValid(false);
    setUser({ ...user, [fieldName]: e.target.value });
  };

  // Handling Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (user.userName === "" || user.password === "") {
        setIsInValid(true);
        setError("Please Fill the");
        toast.error("Please Fill All Mandatory Fields");
        return;
      }

      const response = await axios({
        method: "POST",
        url: "/api/v1/users/sign-in",
        withCredentials: true,
        data: {
          userName: user.userName,
          password: user.password,
        },
      });

      if (response.data.status === "Success") {
        setUser({ userName: "", password: "" });
        localStorage.setItem(
          "user-info",
          JSON.stringify(response.data.data.user)
        );
        localStorage.setItem("User-Token", response.data.token);
        toast.success("Signed in Successfully");
        router.push("/user-home");
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
            src="./User_Sign_In.png"
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
              className="mt-8 btn bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600"
            >
              Home <RiHome4Fill />
            </button>
          </div>
          <div className="flex flex-col justify-center h-[100vh]">
            <label className="text-black flex justify-center font-bold text-5xl">
              Welcome <spam className="text-[#f6851b]">&nbsp;Back</spam>!
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
              validateStatus={isInValid && !user.userName ? "error" : ""}
              help={
                isInValid && !user.userName ? (
                  <p className="text-red-600 text-base font-bold">{`${error} User Name`}</p>
                ) : null
              }
            >
              <label className="text-black text-2xl font-bold">
                User Name<span className="text-red-600">*</span>
              </label>
              <br />
              <Input
                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="User Name.."
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
              validateStatus={isInValid && !user.password ? "error" : ""}
              help={
                isInValid && !user.password ? (
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
                className="w-full mt-1 text-black h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Password.."
                value={user.password}
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </Form.Item>

            <div className="text-blue-500 flex w-full justify-between italic underline mt-2 text-xl">
              Forgot password ?
              <Link
                href="/user-signup"
                className="text-blue-500 italic underline text-xl"
              >
                Dont have an account ?
              </Link>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                className="mt-8 btn bg-gradient-to-r from-green-400 to-green-600 text-xl w-full border-0 text-white hover:text-black rounded-2xl font-bold transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-green-600 hover:-translate-y-2"
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

export default UserLogin;
