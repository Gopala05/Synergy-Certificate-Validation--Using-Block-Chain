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
import ProfileInfoCard from "../../Components/Portfolio/ProfileInfoCard";

const PortfolioProfile = () => {
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
  return (
    <div>
      <DashNav />
      <div className="pt-20 h-[100vh]">
        <Row className="pr-10">
          <Col lg={7}>
            <PortfolioBasic user={user} />
          </Col>
          <Col lg={14} className="flex justify-end items-end w-full">
            <Row>
              <div className="bg-[#F2F5F9] min-h-[83vh] max-h-[83vh] w-full h-full text-black px-20 py-5 rounded-3xl font-semibold flex flex-col gap-y-8">
                <div className="text-5xl flex w-full justify-start gap-x-10 items-center">
                  <div className="uppercase font-bold">About Me</div>
                  <div className="py-0 h-1 rounded-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] w-1/2"></div>
                </div>
                <div className="tracking-wider text-justify">
                  Hello there! I'm thrilled to welcome you to my portfolio. I am
                  a passionate and versatile full-stack developer with a keen
                  interest in exploring the latest cutting-edge technologies. My
                  journey in the world of web development has been nothing short
                  of exhilarating, and I constantly strive to enhance my skills
                  and embrace emerging trends in the industry.
                </div>
                <div className="flex flex-col">
                  <div className="text-4xl font-semibold">What I do!</div>
                  <Row className="py-5 flex w-full justify-between">
                    {/* Web Development */}
                    <Col lg={11} className="flex justify-center">
                      <ProfileInfoCard
                        image={"./Icons/Coding.png"}
                        imageWidth={"w-8"}
                        title={"Web Development"}
                        description={
                          "With a focus on user-centric design and cutting-edge technologies, I thrive on building intuitive and efficient apps"
                        }
                        bgColor={"bg-[#FFEED9]"}
                      />
                    </Col>

                    {/* App Development */}
                    <Col lg={11} className="flex justify-center">
                      <ProfileInfoCard
                        image={"./Icons/Android.png"}
                        imageWidth={"w-10"}
                        title={"App Development"}
                        description={
                          "I'm always eager to dive into new projects that leverage Next.js and discover innovative ways to create fast, scalable, and user-friendly applications"
                        }
                        bgColor={"bg-[#FFFFFF]"}
                      />
                    </Col>
                  </Row>

                  <Row className="py-5 flex w-full justify-between">
                    {/* UI/UX Designing */}
                    <Col lg={11} className="flex justify-center">
                      <ProfileInfoCard
                        image={"./Icons/UI-UX.png"}
                        imageWidth={"w-8"}
                        title={"UI/UX Designing"}
                        description={
                          "Crafting visually appealing and intuitive user interfaces that offer a delightful user experience is something I'm truly fanatic about"
                        }
                        bgColor={"bg-[#FFFFFF]"}
                      />
                    </Col>

                    {/* Mentorship */}
                    <Col lg={11} className="flex justify-center">
                      <ProfileInfoCard
                        image={"./Icons/Mentorship.png"}
                        imageWidth={"w-8"}
                        title={"Mentorship"}
                        description={
                          "I have also found great joy in sharing my knowledge with others. Being a technical mentor allows me to give back to the community that has supported me throughout my career"
                        }
                        bgColor={"bg-[#FFEED9]"}
                      />
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

export default PortfolioProfile;
