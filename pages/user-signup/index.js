import { Col, Input, Row } from "antd";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserSignUp = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "",
    userName: "",
    userEmails: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    if (fieldName == "password") {
      toast.error("Password Should be at least 8 characters long");
    }
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      user.name === "" ||
      user.userName === "" ||
      user.userEmails === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    try {
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

  return (
    <div className="h-[100vh] bg-white">
      <Row className="flex justify-center items-center">
        <Col lg={12} className="h-[100vh]">
          <img
            src="./User_SignUp.png"
            alt="Sign Up Image"
            className="h-[100vh] w-full px-2 py-2 rounded-3xl rounded-s-none"
          />
        </Col>
        <Col lg={12} className="p-20">
          <label className="text-black flex justify-center font-bold text-5xl">
            Welcome!
          </label>
          <p className="text-black text-xl flex justify-center mt-3">
            Enter your details to get Registered
          </p>

          <div className="mt-5">
            <label className="text-black text-2xl font-bold">
              Full Name<span className="text-red-600">*</span>
            </label>
            <br />
            <Input
              className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="Full Name.."
              value={user.name}
              onChange={(e) => handleFormFieldChange("name", e)}
            />
          </div>

          <div className="mt-5">
            <label className="text-black text-2xl font-bold">
              User Name<span className="text-red-600">*</span>
            </label>
            <br />
            <Input
              className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="User Name.."
              value={user.userName}
              onChange={(e) => handleFormFieldChange("userName", e)}
            />
          </div>

          <div className="mt-5">
            <label className="text-black text-2xl font-bold">
              Email<span className="text-red-600">*</span>
            </label>
            <br />
            <Input
              className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="Email.."
              value={user.userEmails}
              onChange={(e) => handleFormFieldChange("userEmails", e)}
            />
          </div>

          <div className="mt-5">
            <label className="text-black text-2xl font-bold">
              Password<span className="text-red-600">*</span>
            </label>
            <br />
            <Input.Password
              type="password"
              className="w-full mt-1 text-black h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="Password.."
              value={user.password}
              onChange={(e) => handleFormFieldChange("password", e)}
            />
          </div>

          <div className="mt-5 mb-5">
            <label className="text-black text-2xl font-bold">
              Confirm Password<span className="text-red-600">*</span>
            </label>
            <br />
            <Input.Password
              type="password"
              className="w-full mt-1 text-black h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="Confirm Password.."
              value={user.confirmPassword}
              onChange={(e) => handleFormFieldChange("confirmPassword", e)}
            />
          </div>

          <Link
            href="/user-login"
            className="text-blue-500 italic underline text-xl"
          >
            Already have an account ?
          </Link>

          <div className="flex justify-center">
            <button
              onClick={handleSignUp}
              className="mt-8 bg-[#3A5B22] text-xl w-full border-0 text-white rounded-2xl font-bold py-2"
            >
              Register
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserSignUp;
