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
import toast from "react-hot-toast";
import Link from "next/link";

const PortfolioExperience = () => {
  const router = useRouter();
  const toastShownRef = useRef(false);

  const [user, setUser] = useState(null);
  const [viewer, setViewer] = useState(null);
  const { isLoading, setIsLoading } = useStateContext();

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

  return (
    <div>
      <DashNav />
      <div className="pt-20 h-[100vh]">
        <Row className="pr-10">
          <Col lg={7}>
            <PortfolioBasic user={user} viewer={viewer} />
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

                  <Row className="py-5 flex w-full justify-between gap-y-6">
                    {user?.experienceTitles?.map((exp, index) => (
                      <Col lg={11} className="flex justify-center" key={index}>
                        <ResumeCard
                          bgColor={
                            index == 1
                              ? "bg-[#FFFFFF]"
                              : index == 2
                              ? "bg-[#FFFFFF]"
                              : "bg-[#FFEED9]"
                          }
                          year={user?.experiencePeriods[index]}
                          title={exp}
                          subtitle={user?.experiencesFrom[index]}
                        />
                      </Col>
                    ))}
                  </Row>
                  <Row className="flex justify-between mt-6">
                    {/* Work Skills */}
                    <Col lg={11} className="flex flex-col">
                      <div className="text-4xl font-semibold mb-6">
                        Work Skills
                      </div>
                      <div className="flex flex-wrap gap-3 gap-x-3">
                        {user?.workSkills?.map((skill, index) => (
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
                        {user?.projects?.map((project, index) => (
                          <Link
                            href={user?.projectsURL[index]}
                            target="_blank"
                            key={index}
                          >
                            <div className="dropdown dropdown-hover">
                              <div
                                tabindex="0"
                                role="button"
                                className="bg-[#E1E8EF] cursor-pointer rounded-lg py-2 px-5 font-medium text-gray-700 text-sm shadow-sm"
                              >
                                {project}
                              </div>
                              <ul
                                tabindex="0"
                                className="dropdown-content menu bg-[#E1E8EF] rounded-box z-[1] p-2 shadow"
                              >
                                <li>{user?.projectsURL[index]}</li>
                              </ul>
                            </div>
                          </Link>
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

export default PortfolioExperience;
