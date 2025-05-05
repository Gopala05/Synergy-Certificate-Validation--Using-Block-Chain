import { useEffect, useRef, useState } from "react";
import DashNav from "../../Components/Nav/DashNav";
import Logo from "../../Components/Logo/Logo";
import { useRouter } from "next/router";
import { useStateContext } from "../../Context/NFTs";
import { useUpgradeHook } from "@/hooks/upgrade-model";
import { Col, Form, Input, message, Row } from "antd";
import { usePortfolio } from "@/hooks/usePortfolio";
import PortfolioNav from "../../Components/Portfolio/PortfolioNav";
import PortfolioBasic from "../../Components/Portfolio/PortfolioBasic";
import ContactCard from "../../Components/Portfolio/ContactCard";
import toast from "react-hot-toast";

const PortfolioContact = () => {
  const router = useRouter();
  const toastShownRef = useRef(false);

  const [user, setUser] = useState(null);
  const [viewer, setViewer] = useState(null);
  const { isLoading, setIsLoading } = useStateContext();
  const [sender, setSender] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isEmailInValid, setIsEmailInValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isInValid, setIsInValid] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const fetchData = async () => {
      const userData = localStorage.getItem("portfolio-user");
      const viewerData = localStorage.getItem("user-info");

      if (!userData || !viewerData) {
        router.replace("/portfolio");
        if (!toastShownRef.current) {
          toast("Please Provide the Email ID of the User", {
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
        setIsLoading(false);
        setUser(JSON.parse(userData));
        setViewer(JSON.parse(viewerData));
        useUpgradeHook.getState().initialize();
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    const getPageFromPathname = (pathname) => {
      switch (pathname) {
        case "/portfolio-profile":
          return "Profile";
        case "/portfolio-education":
          return "Education";
        case "/portfolio-experience":
          return "Experience";
        case "/portfolio-academic":
          return "Academic";
        case "/portfolio-non-academic":
          return "Non-Acad";
        default:
          return "Contact";
      }
    };

    const page = getPageFromPathname(router.pathname);
    usePortfolio.getState().initialize(page);
  }, [router.pathname]);

  if (!user || !viewer) {
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

    setSender({ ...sender, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (sender.name === "" || sender.email === "" || sender.message === "") {
        setIsInValid(true);
        setError("Please Provide the");
        toast.error("Please Fill All Mandatory Fields");
        return;
      }

      if (!emailRegex.test(sender.email)) {
        toast.error("Provide the proper Email");
        return;
      }

      const MailParams = {
        from_name: sender.name,
        email_id: sender.email,
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
        setSender({
          name: "",
          email: "",
          message: "",
        });
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
    <div>
      <DashNav />
      <div className="pt-20 h-[100vh] w-full flex items-center justify-between">
        <Row className="pr-10 flex w-full items-center justify-between">
          <Col lg={7}>
            <PortfolioBasic user={user} viewer={viewer} />
          </Col>
          <Col lg={14} className="flex justify-end items-end w-full">
            <Row className="flex w-full">
              <div className="bg-[#F2F5F9] min-h-[83vh] max-h-[83vh] w-full h-full text-black px-20 py-6 rounded-3xl font-semibold flex flex-col gap-y-8">
                <div className="text-5xl flex w-full justify-start gap-x-10 items-center">
                  <div className="uppercase font-bold">Contact</div>
                  <div className="py-0 h-1 rounded-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] w-1/2"></div>
                </div>
                <div className="flex flex-col">
                  <Row className="pb-5 pt-1 flex w-full justify-between">
                    {/* Phone */}
                    <Col lg={11} className="flex justify-center">
                      <ContactCard
                        image={"/Icons/Contact.png"}
                        width={"w-6 pt-1"}
                        bgColor={"bg-[#FFEED9]"}
                        year={"Phone"}
                        title={user?.mobileNumber}
                        subtitle={user?.alternativeMobile || ""}
                      />
                    </Col>

                    {/* Email */}
                    <Col lg={11} className="flex justify-center">
                      <ContactCard
                        image={"/Icons/Contact_Email.png"}
                        width={"w-9"}
                        bgColor={"bg-[#FFFFFF]"}
                        year={"Email ID"}
                        title={user?.userEmails[0]}
                        subtitle={user?.userEmails[1] || ""}
                      />
                    </Col>
                  </Row>

                  <Row className="flex justify-between mt-6">
                    <Col lg={24} className="flex flex-col">
                      <div className="bg-[#F8FBFB] w-full rounded-lg py-5 px-10 flex flex-col items-center ">
                        <div className="text-xl">
                          I am always open to discussing new projects,
                          opportunities in tech world, partnerships and more so
                          mentorship.
                        </div>

                        {/* Name */}
                        <Row className="flex flex-row w-full justify-start gap-x-3 items-center pb-2">
                          <Col lg={3} className="flex justify-start text-2xl">
                            Name:
                          </Col>
                          <Col
                            lg={20}
                            className="flex w-full flex-col justify-center text-start"
                          >
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: "Please provide Name!",
                                },
                              ]}
                              validateStatus={
                                isInValid && !sender.name ? "error" : ""
                              }
                              help={
                                isInValid && !sender.name ? (
                                  <p className="text-red-600 text-base font-bold">{`${error} Name`}</p>
                                ) : null
                              }
                            >
                              <br />
                              <Input
                                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                                placeholder="Name..."
                                value={sender.name}
                                onChange={(e) => handleInput("name", e)}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <hr className="border border-[#E3E3E3] w-full" />

                        {/* Email */}
                        <Row className="flex flex-row w-full justify-start gap-x-3 items-center pb-2">
                          <Col lg={3} className="flex justify-start text-2xl">
                            Email:
                          </Col>
                          <Col
                            lg={20}
                            className="flex w-full flex-col justify-center text-start"
                          >
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: "Please provide Email ID!",
                                },
                              ]}
                              validateStatus={
                                isInValid && !sender.email
                                  ? "error"
                                  : emailError
                                  ? "error"
                                  : ""
                              }
                              help={
                                isInValid && !sender.email ? (
                                  <p className="text-red-600 text-base font-bold">{`${error} Email ID`}</p>
                                ) : isEmailInValid ? (
                                  <p className="text-red-600 text-base font-bold">
                                    {emailError}
                                  </p>
                                ) : null
                              }
                            >
                              <br />
                              <Input
                                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                                placeholder="Email..."
                                value={sender.email}
                                onChange={(e) => handleInput("email", e)}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <hr className="border border-[#E3E3E3] w-full" />

                        {/* Message */}
                        <Row className="flex flex-row w-full justify-start gap-x-3 items-center pb-2">
                          <Col lg={3} className="flex justify-start text-2xl">
                            Message:
                          </Col>
                          <Col
                            lg={20}
                            className="flex w-full flex-col justify-center text-start"
                          >
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: "Please provide Message!",
                                },
                              ]}
                              validateStatus={
                                isInValid && !sender.message ? "error" : ""
                              }
                              help={
                                isInValid && !sender.message ? (
                                  <p className="text-red-600 text-base font-bold">{`${error} Message`}</p>
                                ) : null
                              }
                            >
                              <br />
                              <Input
                                className="w-full text-black mt-1 h-10 rounded-2xl pr-10 border-2 border-[#22674E] placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                                placeholder="Message..."
                                value={sender.message}
                                onChange={(e) => handleInput("message", e)}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <hr className="border border-[#E3E3E3] w-full" />

                        {/* Submit */}
                        <div className="flex w-full justify-center pt-5">
                          <button
                            onClick={(e) => handleSubmit(e)}
                            class="hover:scale-110 transition-all text-xl bg-gradient-to-r px-8 py-3 from-[#FF9C1A] to-[#E80505] text-white font-mediium rounded-full"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Row>
          </Col>
          <Col lg={3} className="flex justify-center items-center pl-10 w-full">
            <PortfolioNav />
          </Col>
        </Row>
      </div>
      {isLoading && (
        <div className="loader">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default PortfolioContact;
