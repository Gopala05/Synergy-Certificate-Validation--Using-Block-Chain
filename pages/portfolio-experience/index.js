import { useEffect, useRef, useState } from "react";
import DashNav from "../../Components/Nav/DashNav";
import Logo from "../../Components/Logo/Logo";
import { useRouter } from "next/router";
import { useStateContext } from "../../Context/NFTs";
import { useUpgradeHook } from "@/hooks/upgrade-model";
import { Col, Menu, Row } from "antd";
import { usePortfolio } from "@/hooks/usePortfolio";
import PortfolioNav from "../../Components/Portfolio/PortfolioNav";
import PortfolioBasic from "../../Components/Portfolio/PortfolioBasic";
import ResumeCard from "../../Components/Portfolio/ResumeCard";

const PortfolioResume = () => {
  const router = useRouter();
  const toastShownRef = useRef(false);

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const { isLoading } = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      const userData = localStorage.getItem("user-info");
      const authData = localStorage.getItem("auth-info");

      if (!userData && !authData) {
        router.replace("/user-login");
        if (!toastShownRef.current) {
          toast("Please Login First", {
            icon: "🚫",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          toastShownRef.current = true;
        }
      } else if (userData) {
        setUser(JSON.parse(userData));
        useUpgradeHook.getState().initialize();
      } else {
        setAuth(JSON.parse(authData));
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

  if (!auth && !user) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  const Workskills = [
    "Next.js",
    "React.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Figma",
    "JavaScript",
    "MongoDB",
    "SQL",
    "Angular",
    "Flutter",
    "Git",
  ];

  const projects = [
    {
      label: "Synergy - Certificate Validation System",
      link: "https://synergy-certificate-validation-using.onrender.com",
    },
    {
      label: "CRM",
      link: "https://github.com/Gopala05",
    },
    {
      label: "Chat-Application",
      link: "https://chatforever.onrender.com",
    },
    {
      label: "AWS IOT Core Project",
      link: "https://github.com/Gopala05",
    },
    {
      label: "Tour Management System",
      link: "https://github.com/Gopala05/Tour-Management_Frontend.git",
    },
    {
      label: "Quiz App with Timer",
      link: "https://github.com/Gopala05/Quiz-App-Full-Stack.git",
    },
  ];

  const menu = (
    <Menu className="flex flex-col gap-y-2 border-none">
      <Menu.Item key="0" className="border-none">
        <div className="flex w-full flex-col text-2xl p-5 bg-[#282a2c] rounded-md text-white"></div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <DashNav />
      <div className="pt-20 h-[100vh]">
        <Row className="pr-10">
          <Col lg={7}>
            <PortfolioBasic user={user} />
          </Col>
          <Col lg={14} className="flex justify-end items-end w-full">
            <Row className="flex w-full">
              <div className="bg-[#F2F5F9] min-h-[83vh] max-h-[83vh] w-full h-full text-black px-20 py-6 rounded-3xl font-semibold flex flex-col gap-y-8">
                <div className="text-5xl flex w-full justify-start gap-x-10 items-center">
                  <div className="uppercase font-bold">Experience</div>
                  <div className="py-0 h-1 rounded-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] w-1/2"></div>
                </div>
                <div className="flex flex-col">
                  <Row className="py-0.5 flex w-full justify-start">
                    {/* Experience */}
                    <Col lg={24} className="flex justify-start">
                      <div className="flex items-center gap-x-5">
                        <div>
                          <img
                            src="./Icons/Experience.png"
                            alt="Experience Icon"
                            className="w-8"
                          />
                        </div>
                        <div className="text-4xl font-semibold">
                          My Professional Experience!
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-5 flex w-full justify-between">
                    {/* Skill 1 */}
                    <Col lg={11} className="flex justify-center">
                      <ResumeCard
                        bgColor={"bg-[#FFEED9]"}
                        year={"6 Months"}
                        title={"Web Developer"}
                        subtitle={"Quinx Innovation Pvt. Ltd."}
                      />
                    </Col>

                    {/* Skill 2 */}
                    <Col lg={11} className="flex justify-center">
                      <ResumeCard
                        bgColor={"bg-[#FFFFFF]"}
                        year={"1 Months"}
                        title={"DevOps Enginner"}
                        subtitle={"Xcel Corp"}
                      />
                    </Col>
                  </Row>

                  <Row className="py-5 flex w-full justify-between">
                    {/* Skill 3 */}
                    <Col lg={11} className="flex justify-center">
                      <ResumeCard
                        bgColor={"bg-[#FFFFFF]"}
                        year={"1 Year"}
                        title={"Junior Software Developer"}
                        subtitle={"Tvast IT Solutions"}
                      />
                    </Col>

                    {/* Skill 4 */}
                    <Col lg={11} className="flex justify-center">
                      <ResumeCard
                        bgColor={"bg-[#FFEED9]"}
                        year={"2 Months"}
                        title={"IOT Gateway"}
                        subtitle={"Cranes Varsity"}
                      />
                    </Col>
                  </Row>
                  <Row className="flex justify-between mt-6">
                    {/* Work Skills */}
                    <Col lg={11} className="flex flex-col">
                      <div className="text-4xl font-semibold mb-6">
                        Work Skills
                      </div>
                      <div className="flex flex-wrap gap-3 gap-x-3">
                        {Workskills?.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-[#E1E8EF] rounded-lg py-2 px-5 font-medium text-gray-700 text-sm shadow-sm"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </Col>

                    {/* Projects */}
                    <Col lg={11} className="flex flex-col">
                      <div className="text-4xl font-semibold mb-6">
                        Projects
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {projects?.map((project, index) => (
                          // <div className="h-[40rem] w-full flex items-center justify-center ">
                          // <PinContainer
                          //   title="/ui.aceternity.com"
                          //   href="https://twitter.com/mannupaaji"
                          // >
                          //   <div
                          //     key={index}
                          //     className="bg-[#E1E8EF] cursor-pointer rounded-lg py-2 px-5 font-medium text-gray-700 text-sm shadow-sm"
                          //   >
                          //     {project.label}
                          //   </div>
                          // </PinContainer>
                          // </div>
                          <div
                            key={index}
                            className="bg-[#E1E8EF] cursor-pointer rounded-lg py-2 px-5 font-medium text-gray-700 text-sm shadow-sm"
                          >
                            {project.label}
                          </div>
                        ))}
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

export default PortfolioResume;
