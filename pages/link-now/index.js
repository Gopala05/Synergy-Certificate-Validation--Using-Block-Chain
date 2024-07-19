import { Col, Form, Input, Row } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { RiHome4Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import axios from "axios";
import decryptText from "../../utils/Decrypt";
import emailjs from "@emailjs/browser";
import { useStateContext } from "../../Context/NFTs";
import { Logo } from "../../Components";

const LinkNow = () => {
  const { isLoading, setIsLoading } = useStateContext();
  const router = useRouter();
  const [user, setUser] = React.useState({
    userName: "",
    password: "",
  });
  const [isInValid, setIsInValid] = React.useState(false);
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const toastShownRef = React.useRef(false);

  React.useEffect(() => {
    if (router.query && router.query.email) {
      setEmail(router.query.email);
    }
  }, [router.query]);

  // Key Borad Listener
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCheck(event);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  // Handling Input
  const handleFormFieldChange = (fieldName, e) => {
    setIsInValid(false);
    setUser({ ...user, [fieldName]: e.target.value });
  };

  // Handling Check
  const handleCheck = async (e) => {
    e.preventDefault();

    if (email) {
      setIsLoading(true);
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

          const emailDecrypt = decryptText(email);

          const res = await axios({
            method: "POST",
            url: "/api/v1/link/create/",
            withCredentials: true,
            data: {
              senderEmail: emailDecrypt,
              receiverEmail: response.data.data.user.userEmails[0],
            },
          });

          if (res.data.status == "Created") {
            const id = res.data.data.Request._id;
            const MailParams = {
              from_user: emailDecrypt,
              to_mail: response.data.data.user.userEmails[0],
              confirm_url: `https://synergy-certificate-validation-using-block-chain.vercel.app/confirm?id=${id}`,
              reject_url: `https://synergy-certificate-validation-using-block-chain.vercel.app/reject?id=${id}`,
              year: new Date().getFullYear(),
            };

            try {
              const response = await emailjs.send(
                process.env.NEXT_PUBLIC_SERVICE_ID_FOR_LINKNOW,
                process.env.NEXT_PUBLIC_TEMPLATE_ID_FOR_LINKNOW,
                MailParams,
                process.env.NEXT_PUBLIC_USER_ID_FOR_LINKNOW
              );

              if (response.status == 200) {
                setIsLoading(false);
                toast.success(
                  `Conformation Email sent to ${response.data.data.user.userEmails[0]} Successfully`
                );
                router.push("/");
              }
            } catch (error) {
              setIsLoading(false);
              console.error("Error in sending email: ", error);
              toast.error("Something went wrong, please try again later.");
            }
          } else {
            setIsLoading(false);
            toast.error(
              error.response?.data?.message || "Internal Server Error"
            );
          }
        } else if (response.data.status === "Bad Request") {
          setIsLoading(false);
          toast.error(response.data.message);
        } else {
          setIsLoading(false);
          toast.error(error.response?.data?.message || "Internal Server Error");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response?.data?.message || "Internal Server Error");
        console.error("Error in Link Now: ", error);
      }
    } else {
      setIsLoading(false);
      toast.error("Invalid request");
    }
  };

  // Handling Route Protection
  React.useEffect(() => {
    const navigate = () => {
      if (!email) {
        router.replace("/404");
        if (!toastShownRef.current) {
          toast.error("Invalid Request", {
            icon: "🚫",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          toastShownRef.current = true;
        }
      }
    };

    const intervalId = setInterval(navigate, 3000); // Fetch data every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval
  }, [router.query, email]);

  if (!email) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  return (
    <div className="h-[100vh] bg-white">
      <Row className="flex justify-center items-center">
        <Col
          lg={12}
          className="p-20 pt-10 h-[100vh] w-full justify-start flex flex-col"
        >
          <div className="flex justify-start items-start">
            <button
              onClick={() => router.push("/")}
              className="btn bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600"
            >
              Home <RiHome4Fill />
            </button>
          </div>
          <div className="flex flex-col justify-center h-[100vh]">
            <label className="text-black flex justify-center font-bold text-5xl">
              Link Your
              <span className="text-[#f6851b]">&nbsp;Accounts Now</span>!
            </label>
            <p className="text-black text-xl flex justify-center mt-3">
              Enter your Credentials to link the accounts
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
              <label className="text-black text-2xl font-bold">User ID</label>
              <br />
              <Input
                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="User ID.."
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
              <label className="text-black text-2xl font-bold">Password</label>
              <br />
              <Input.Password
                type="password"
                className="w-full mt-1 text-black h-10 rounded-2xl pr-10 border-2 border-[#22674E] hover:border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Password..."
                value={user.password}
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </Form.Item>

            <div className="flex justify-center">
              <button
                onClick={handleCheck}
                className="mt-8 btn hover:text-black bg-gradient-to-r from-green-400 to-green-600 text-xl w-full border-0 text-white rounded-2xl font-bold transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-green-600 hover:-translate-y-2"
              >
                Confirm
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-black text-base mt-2">
                By clicking on <i>confirm</i> you agree to
                <u className="ml-2 text-blue-800">Terms of Services</u> |{" "}
                <u className="text-blue-800">Privacy Policy</u>
              </p>
            </div>
          </div>
        </Col>
        <Col lg={12} className="h-[100vh] hidden lg:block">
          <img
            src="./Link_Now_Metamask.png"
            alt="Link Now Image"
            className="h-[100vh] text-black w-full rounded-3xl rounded-e-none"
          />
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

export default LinkNow;
