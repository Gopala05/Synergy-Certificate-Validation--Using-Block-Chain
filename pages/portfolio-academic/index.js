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
import toast from "react-hot-toast";
import { cn } from "../../utils/utils";

const PortfolioResume = () => {
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
                        src="/Icons/Line.png"
                        alt="Line Icon"
                        className="w-72"
                      />
                    </div>
                    <div className="flex w-full">
                      <button
                        disabled={!user?.sslcCertificate}
                        className={cn(
                          "flex cursor-not-allowed w-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white font-mediium rounded-3xl p-1",
                          user?.sslcCertificate &&
                            "hover:scale-110 transition-all cursor-pointer"
                        )}
                      >
                        <div
                          className={cn(
                            "flex w-full px-6 pl-16 justify-start bg-[#EBB9F8] text-black rounded-3xl py-2 text-4xl",
                            !user?.sslcCertificate && "bg-gray-500 text-white"
                          )}
                        >
                          <div className="flex w-full justify-start gap-x-16">
                            <div className="p-2 px-0">10th Marks </div>
                            <div>
                              <div className="bg-gradient-to-r h-full rounded-full py-6 from-[#FF9C1A] to-[#E80505] px-[2px]"></div>
                            </div>
                            <div className="p-2 px-0">ICSE</div>
                          </div>
                          {user?.sslcCertificate && (
                            <div className="p-2 px-0">
                              <img
                                src="/Icons/Verified.png"
                                alt="Verified Icon"
                                className="w-10"
                              />
                            </div>
                          )}
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
                        src="/Icons/Line.png"
                        alt="Line Icon"
                        className="w-72"
                      />
                    </div>
                    <div className="flex w-full">
                      <button
                        disabled={!user?.puCertificate}
                        className={cn(
                          "flex cursor-not-allowed w-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white font-mediium rounded-3xl p-1",
                          user?.puCertificate &&
                            "hover:scale-110 transition-all cursor-pointer"
                        )}
                      >
                        <div
                          className={cn(
                            "flex w-full px-6 pl-16 justify-start bg-[#EBB9F8] text-black rounded-3xl py-2 text-4xl",
                            !user?.puCertificate && "bg-gray-500 text-white"
                          )}
                        >
                          <div className="flex w-full justify-start gap-x-16">
                            <div className="p-2 px-0">12th Marks </div>
                            <div>
                              <div className="bg-gradient-to-r h-full rounded-full py-6 from-[#FF9C1A] to-[#E80505] px-[2px]"></div>
                            </div>
                            <div className="p-2 px-0">PUC</div>
                          </div>
                          {user?.puCertificate && (
                            <div className="p-2 px-0">
                              <img
                                src="/Icons/Verified.png"
                                alt="Verified Icon"
                                className="w-10"
                              />
                            </div>
                          )}
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
                        src="/Icons/Line.png"
                        alt="Line Icon"
                        className="w-72"
                      />
                    </div>
                    <div className="flex w-full">
                      <button
                        className={cn(
                          "flex cursor-not-allowed w-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white font-mediium rounded-3xl p-1",
                          user?.ugCertificate &&
                            "hover:scale-110 transition-all cursor-pointer"
                        )}
                      >
                        <div
                          className={cn(
                            "flex w-full px-6 pl-16 justify-start bg-[#EBB9F8] text-black rounded-3xl py-2 text-4xl",
                            !user?.ugCertificate && "bg-gray-500 text-white"
                          )}
                        >
                          <div className="flex w-full justify-start gap-x-12">
                            <div className="p-2 px-0">Engineering</div>
                            <div>
                              <div className="bg-gradient-to-r h-full rounded-full py-6 from-[#FF9C1A] to-[#E80505] px-[2px]"></div>
                            </div>
                            <div className="p-2 px-0">VTU</div>
                          </div>
                          {user?.ugCertificate && (
                            <div className="p-2 px-0">
                              <img
                                src="/Icons/Verified.png"
                                alt="Verified Icon"
                                className="w-10"
                              />
                            </div>
                          )}
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
