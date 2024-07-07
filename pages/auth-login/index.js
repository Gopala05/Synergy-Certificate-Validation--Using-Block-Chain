import { Col, Row } from "antd";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthLogin = () => {
  const router = useRouter();
  const [auth, setAuth] = React.useState({
    authID: "",
    password: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setAuth({ ...auth, [fieldName]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (auth.authID === "" || auth.password === "") {
      toast.error("Please fill out all fields");
      return;
    }

    try {
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
        <Col lg={12} className="p-20">
          <label className="text-black flex justify-center font-bold text-5xl">
            Welcome back!
          </label>
          <p className="text-black text-xl flex justify-center mt-3">
            Enter your Credentials to access
          </p>

          <div className="mt-5">
            <label className="text-black text-2xl font-bold">User ID</label>
            <br />
            <input
              className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="User ID.."
              value={auth.authID}
              onChange={(e) => handleFormFieldChange("authID", e)}
            />
          </div>

          <div className="mt-5">
            <label className="text-black text-2xl font-bold">Password</label>
            <br />
            <input
              type="password"
              className="w-full mt-1 text-black h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
              placeholder="Password..."
              value={auth.password}
              onChange={(e) => handleFormFieldChange("password", e)}
            />
          </div>

          <div className="text-blue-500 italic underline mt-2 text-xl">
            Forgot password ?
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
        <Col lg={12} className="h-[100vh]">
          <img
            src="./Auth_SignIn.png"
            alt="Login Image"
            className="h-[100vh] py-10 px-12 w-full rounded-3xl rounded-e-none"
          />
        </Col>
      </Row>
    </div>
  );
};

export default AuthLogin;
