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
import AcademicButton from "../../Components/Portfolio/AcademicButton";

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
              <div className="bg-[#F2F5F9] min-h-[83vh] max-h-[83vh] w-full h-full text-black px-20 py-6 pb-11 rounded-3xl font-semibold flex flex-col gap-y-11">
                <div className="text-5xl flex w-full justify-start gap-x-10 items-center">
                  <div className="uppercase font-bold">
                    Academic Certificates
                  </div>
                  <div className="py-0 h-1 rounded-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] w-1/3"></div>
                </div>
                <div className="flex flex-col gap-y-20 px-40">
                  {/* 10th */}
                  <div className="flex w-full flex-col justify-center items-center">
                    <div className="uppercase text-4xl font-semibold">
                      10th marks
                    </div>
                    <div>
                      <img
                        src="./Icons/Line.png"
                        alt="Line Icon"
                        className="w-72"
                      />
                    </div>
                    <div className="flex w-full">
                      <button class="flex hover:scale-110 transition-all w-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white font-mediium rounded-3xl p-1  ">
                        <div class="flex w-full px-6 pl-16 justify-start bg-[#EBB9F8] text-black rounded-3xl py-2 text-4xl">
                          <div className="flex w-full justify-start gap-x-16">
                            <div className="p-2 px-0">10th Marks </div>
                            <div>
                              <div className="bg-gradient-to-r h-full rounded-full py-6 from-[#FF9C1A] to-[#E80505] px-[2px] "></div>
                            </div>
                            <div className="p-2 px-0">ICSE</div>
                          </div>
                          <div className="p-2 px-0">
                            <img
                              src="./Icons/Verified.png"
                              alt="Verified Icon"
                              className="w-10"
                            />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 12th */}
                  <div className="flex w-full flex-col justify-center items-center">
                    <div className="uppercase text-4xl font-semibold">
                      12th marks
                    </div>
                    <div>
                      <img
                        src="./Icons/Line.png"
                        alt="Line Icon"
                        className="w-72"
                      />
                    </div>
                    <div className="flex w-full">
                      <button class="flex hover:scale-110 transition-all shadow-lg shadow-black/30 w-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white font-mediium rounded-3xl p-1  ">
                        <div class="flex w-full px-6 pl-16 justify-start bg-[#EBB9F8] text-black rounded-3xl py-2 text-4xl">
                          <div className="flex w-full justify-start gap-x-16">
                            <div className="p-2 px-0">12th Marks </div>
                            <div>
                              <div className="bg-gradient-to-r h-full rounded-full py-6 from-[#FF9C1A] to-[#E80505] px-[2px] "></div>
                            </div>
                            <div className="p-2 px-0">PUC</div>
                          </div>
                          <div className="p-2 px-0">
                            <img
                              src="./Icons/Verified.png"
                              alt="Verified Icon"
                              className="w-10"
                            />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* GRADUATION */}
                  <div className="flex w-full flex-col justify-center items-center">
                    <div className="uppercase text-4xl font-semibold">
                      GRADUATION
                    </div>
                    <div>
                      <img
                        src="./Icons/Line.png"
                        alt="Line Icon"
                        className="w-72"
                      />
                    </div>
                    <div className="flex w-full">
                      <button class="flex hover:scale-110 transition-all shadow-lg shadow-black/30 w-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white font-mediium rounded-3xl p-1  ">
                        <div class="flex w-full px-6 pl-16 justify-start bg-[#EBB9F8] text-black rounded-3xl py-2 text-4xl">
                          <div className="flex w-full justify-start gap-x-12">
                            <div className="p-2 px-0">Engineering</div>
                            <div>
                              <div className="bg-gradient-to-r h-full rounded-full py-6 from-[#FF9C1A] to-[#E80505] px-[2px] "></div>
                            </div>
                            <div className="p-2 px-0">VTU</div>
                          </div>
                          <div className="p-2 px-0">
                            <img
                              src="./Icons/Verified.png"
                              alt="Verified Icon"
                              className="w-10"
                            />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
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
