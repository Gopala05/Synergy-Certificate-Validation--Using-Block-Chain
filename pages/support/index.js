import React, { useEffect } from "react";
import { Row, Col, Input } from "antd";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Logo from "../../Components/Logo/Logo";
import Footer from "../../Components/Footer/Footer";
import DashNav from "../../Components/Nav/DashNav";
import { useStateContext } from "../../Context/NFTs";
import emailjs from "@emailjs/browser";

const Support = () => {
  const { isLoading, setIsLoading } = useStateContext();
  const [auth, setAuth] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const toastShownRef = React.useRef(false);
  const router = useRouter();

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  React.useEffect(() => {
    const userData = localStorage.getItem("user-info");
    const authData = localStorage.getItem("auth-info");

    if (!userData && !authData) {
      router.replace("/user-login");
      if (!toastShownRef.current) {
        toast.error("Please Login First", {
          icon: "🚫",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        toastShownRef.current = true;
      }
    } else {
      if (userData) setUser(JSON.parse(userData));
      if (authData) setAuth(JSON.parse(authData));
    }
  }, [router]);

  if (!auth && !user) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!query.trim()) {
        toast.error("Please provide your Query");
        return;
      }
      setIsLoading(true);

      const MailParams = {
        from_name: auth ? `${auth.firstName} ${auth.lastName}` : user.name,
        email_id: auth ? auth.authEmail : user.userEmails[0],
        message: query,
        year: new Date().getFullYear(),
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID_FOR_SUPPORT,
        process.env.NEXT_PUBLIC_TEMPLATE_ID_FOR_SUPPORT,
        MailParams,
        process.env.NEXT_PUBLIC_USER_ID_FOR_SUPPORT
      );

      if (response.status === 200) {
        setIsLoading(false);
        setQuery("");
        toast.success("Email sent successfully!");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error in sending email: ", error);
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <>
      <DashNav />
      <Row className="flex w-full h-full items-center justify-center">
        <Col
          lg={12}
          className="flex flex-col gap-y-10 w-full justify-center items-center lg:pl-32 lg:pr-10 lg:pt-16 pt-24 p-5 xl:pt-24"
        >
          <Row className="text-white w-full text-3xl lg:text-5xl font-semibold flex items-start justify-center gap-y-2.5">
            Facing a Problem,&nbsp;
            <span className="text-[#f6851b]">Let Us Help</span>!
          </Row>
          <div className="flex flex-col w-full border-dashed gap-y-6 lg:gap-y-10 border-2 border-[#0080DC] bg-white/10 p-10 rounded-3xl">
            <Row className="flex flex-col justify-center w-full gap-y-3">
              <div className="text-white text-2xl xl:text-3xl cursor-pointer font-semibold">
                Name :
              </div>
              <div className="border-none rounded-md px-3 py-2 bg-white text-black tex text-xl flex items-center font-semibold cursor-pointer">
                {auth ? `${auth.firstName} ${auth.lastName}` : user.name}
              </div>
            </Row>
            <Row className="flex flex-col justify-center w-full gap-y-3">
              <div className="text-white text-2xl xl:text-3xl cursor-pointer font-semibold">
                Email ID :
              </div>
              <div className="border-none rounded-md px-3 py-2 bg-white text-black tex text-xl flex items-center font-semibold cursor-pointer">
                {auth ? auth.authEmail : user.userEmails?.[0]}
              </div>
            </Row>

            <Row className="flex w-full gap-y-3">
              <div className="text-white text-2xl xl:text-3xl cursor-pointer font-semibold">
                Query :
              </div>
              <Input.TextArea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex w-full text-xl font-semibold"
              />
            </Row>
            <Row className="flex justify-center">
              <button
                onClick={(e) => handleSubmit(e)}
                className="bg-gradient-to-r from-green-400 to-green-600  hover:bg-[#15C586] hover:shadow-green-600 hover:shadow-lg border-none btn flex items-center text-black font-bold text-xl xl:text-2xl px-5 rounded-xl"
              >
                Submit
              </button>
            </Row>
          </div>
        </Col>
        <Col
          lg={12}
          className="lg:flex items-center h-full lg:h-[93vh] hidden justify-center flex-col pr-10 pt-20"
        >
          <img
            src="/Support_Metamask.png"
            alt="Support Image"
            className=" lg:w-[35vw]"
          />
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
    </>
  );
};

export default Support;
