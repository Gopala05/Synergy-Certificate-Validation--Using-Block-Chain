import { useEffect, useRef, useState } from "react";
import DashNav from "../../Components/Nav/DashNav";
import Logo from "../../Components/Logo/Logo";
import { useRouter } from "next/router";
import { useStateContext } from "../../Context/NFTs";
import { useUpgradeHook } from "@/hooks/upgrade-model";
import { Col, Row } from "antd";
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

  const hobbies = [
    "Swimming",
    "Gully Cricket",
    "Vollybal",
    "Reading Books and Novels",
    "Singing",
    "Dancing"
  ];

  const softSkills = [
    "Time Management",
    "Mentorship",
    "Impeccable Communication",
    "Flexibility",
    "Research",
    "Writing",
  ];

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
                  <div className="uppercase font-bold">Education</div>
                  <div className="py-0 h-1 rounded-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] w-1/2"></div>
                </div>
                <div className="flex flex-col">
                  <Row className="py-0.5 flex w-full justify-start">
                    {/* Education */}
                    <Col lg={11} className="flex justify-start">
                      <div className="flex items-center gap-x-5">
                        <div>
                          <img
                            src="./Icons/Education.png"
                            alt="Education Icon"
                            className="w-10"
                          />
                        </div>
                        <div className="text-4xl font-semibold">
                          My Qualifications!
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-5 flex w-full justify-between">
                    {/* Primary School */}
                    <Col lg={11} className="flex justify-center">
                      <ResumeCard
                        bgColor={"bg-[#FFEED9]"}
                        year={"2012 - 2016"}
                        title={"Primary School"}
                        subtitle={"Govt School"}
                      />
                    </Col>

                    {/* High School */}
                    <Col lg={11} className="flex justify-center">
                      <ResumeCard
                        bgColor={"bg-[#FFFFFF]"}
                        year={"2016 - 2019"}
                        title={"High School"}
                        subtitle={"Govt School"}
                      />
                    </Col>
                  </Row>

                  <Row className="py-5 flex w-full justify-between">
                    {/* Pre University */}
                    <Col lg={11} className="flex justify-center">
                      <ResumeCard
                        bgColor={"bg-[#FFFFFF]"}
                        year={"2019 - 2021"}
                        title={"Pre University"}
                        subtitle={"SGPTA PU College"}
                      />
                    </Col>

                    {/* Graduation */}
                    <Col lg={11} className="flex justify-center">
                      <ResumeCard
                        bgColor={"bg-[#FFEED9]"}
                        year={"2021 - Present"}
                        title={"Graduation"}
                        subtitle={"KSIT"}
                      />
                    </Col>
                  </Row>
                  <Row className="flex justify-between mt-6">
                    {/* Hobbies */}
                    <Col lg={11} className="flex flex-col">
                      <div className="text-4xl font-semibold mb-6">
                        Hobbies
                      </div>
                      <div className="flex flex-wrap gap-3 gap-x-3">
                        {hobbies?.map((hobby, index) => (
                          <div
                            key={index}
                            className="bg-[#E1E8EF] rounded-lg py-2 px-5 font-medium text-gray-700 text-sm shadow-sm"
                          >
                            {hobby}
                          </div>
                        ))}
                      </div>
                    </Col>

                    {/* Soft Skills */}
                    <Col lg={11} className="flex flex-col">
                      <div className="text-4xl font-semibold mb-6">
                        Soft Skills
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {softSkills?.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-[#E1E8EF] rounded-lg py-2 px-5 font-medium text-gray-700 text-sm shadow-sm"
                          >
                            {skill}
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
