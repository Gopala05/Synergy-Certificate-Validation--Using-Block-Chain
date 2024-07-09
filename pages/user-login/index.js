import { Col, Input, Row } from "antd";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserLogin = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    userName: "",
    password: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (user.userName === "" || user.password === "") {
      toast.error("Please fill out all fields");
      return;
    }

    try {
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
        <Col lg={12} className="h-[100vh]">
          <img
            src="./User_SignIn.jpg"
            alt="Login Image"
            className="h-[100vh] w-full px-12 py-10 rounded-3xl rounded-e-none"
          />
        </Col>
        <Col lg={12} className="p-20">
          <label className="text-black flex justify-center font-bold text-5xl">
            Welcome back!
          </label>
          <p className="text-black text-xl flex justify-center mt-3">
            Enter your Credentials to access
          </p>

          <div className="mt-5">
            <label className="text-black text-2xl font-bold">User Name</label>
            <br />
            <Input
              className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="User Name.."
              value={user.userName}
              onChange={(e) => handleFormFieldChange("userName", e)}
            />
          </div>

          <div className="mt-5">
            <label className="text-black text-2xl font-bold">Password</label>
            <br />
            <Input.Password
              type="password"
              className="w-full mt-1 text-black h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="Password.."
              value={user.password}
              onChange={(e) => handleFormFieldChange("password", e)}
            />
          </div>

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
              className="mt-8 bg-[#3A5B22] text-xl w-full border-0 text-white rounded-2xl font-bold py-3"
            >
              Login
            </button>
          </div>
          
        </Col>
      </Row>
    </div>
  );
};

export default UserLogin;
