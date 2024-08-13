import { useEffect, useRef, useState } from "react";
import DashNav from "../../Components/Nav/DashNav";
import Logo from "../../Components/Logo/Logo";
import { useRouter } from "next/router";
import { useStateContext } from "../../Context/NFTs";
import { useUpgradeHook } from "@/hooks/upgrade-model";
import { Card, Col, Row } from "antd";
import { usePortfolio } from "@/hooks/usePortfolio";
import PortfolioNav from "../../Components/Portfolio/PortfolioNav";
import PortfolioBasic from "../../Components/Portfolio/PortfolioBasic";
import toast from "react-hot-toast";

const PortfolioNonAcademic = () => {
  const router = useRouter();
  const toastShownRef = useRef(false);

  const [user, setUser] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const { isLoading, getUser, getAllNFTsAPI, getCertificate, setIsLoading } =
    useStateContext();

  const evault = async () => {
    try {
      const resp = await getUser("gaana.srinivas@gmail.com"); // Replace with Dynamic Email
      if (resp.data.status == "OK") {
        const response = await getAllNFTsAPI(resp.data.user.userEmails);

        if (response.data.status === "Success") {
          const fetchedCertificates = [];

          await Promise.all(
            response.data.data.nftsByEmails.map(async (nftsByEmail) => {
              const email = Object.keys(nftsByEmail)[0];
              const nfts = nftsByEmail[email];

              console.log(nftsByEmail);

              await Promise.all(
                nfts.map(async (nft) => {
                  const res = await getCertificate(nft.certificateID);
                  if (res.userEmail === email) {
                    fetchedCertificates.push({ ...nft });
                  }
                })
              );
            })
          );

          setUser(resp.data.user);

          return fetchedCertificates;
        }
      } else {
        toast.error(error.response?.data?.message || "Internal Server Error");
        setError(error.response?.data?.message || "Internal Server Error");
        console.error("Error in fetching All certificate:", error);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Internal Server Error");
      console.error("Error in fetching All certificate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // const userData = localStorage.getItem("user-info");
      // const authData = localStorage.getItem("auth-info");

      try {
        const certificates = await evault();
        console.log(certificates);
        if (certificates.length > 0) {
          setCertificates(certificates);
        } else {
          setIsLoading(false);
          toast.error("Certificates not found");
        }
      } catch (error) {
        console.log(
          "Error in fetching User Data in Portfolio Non academic: ",
          error
        );
      }

      // if (!user) {
      //   router.replace("/user-login");
      //   if (!toastShownRef.current) {
      //     toast("Please Login First", {
      //       icon: "🚫",
      //       style: {
      //         borderRadius: "10px",
      //         background: "#333",
      //         color: "#fff",
      //       },
      //     });
      //     toastShownRef.current = true;
      //   }
      // } else {
      //   useUpgradeHook.getState().initialize();
      // }
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

  if (!user) {
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
              <div className="bg-[#F2F5F9] min-h-[83vh] max-h-[83vh] w-full h-full text-black  py-6 pb-11 rounded-3xl font-semibold flex flex-col gap-y-11">
                <div className="text-5xl px-20 flex w-full justify-start gap-x-10 items-center">
                  <div className="uppercase font-bold">
                    Non Academic Certificates
                  </div>
                  <div className="py-0 h-1 rounded-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] w-1/6"></div>
                </div>
                {/* <div className="flex flex-col gap-y-20 px-40"> */}
                <Row className="flex flex-grow justify-center align-middle overflow-y-scroll w-full h-full px-14">
                  <Col span={24} className="hidden lg:block lg:pb-8">
                    {certificates.length > 0 ? (
                      <div className="flex flex-row w-full h-full justify-center items-center text-3xl text-center text-black">
                        Verified Certifications of
                        <strong className="text-[#f6851b]">
                          &nbsp;{user.name}
                        </strong>
                      </div>
                    ) : (
                      <div className="flex flex-row w-full h-full justify-center items-center text-3xl text-center text-black">
                        No Certificates are Verified for
                        <strong className="text-[#f6851b]">
                          &nbsp;{user.name}
                        </strong>
                      </div>
                    )}
                  </Col>
                  <Col span={24} className="flex flex-col lg:hidden">
                    {certificates.length > 0 ? (
                      <div className="flex w-full h-full justify-center items-center text-3xl text-center text-black">
                        Verified Certifications of
                      </div>
                    ) : (
                      <div className="flex w-full h-full justify-center items-center text-3xl text-center text-black">
                        No Certificates are Verified for
                      </div>
                    )}
                    <div className="flex w-full h-full justify-center items-center text-3xl text-center text-[#f6851b] font-bold mb-5">
                      &nbsp;{user.name}
                    </div>
                  </Col>
                  {certificates?.map((certificate, qIndex) => (
                    <Col
                      key={qIndex}
                      lg={12} 
                      className="w-full lg:px-4 lg:py-4 px-5 py-5"
                    >
                      <Card
                        onClick={() => setSelected(certificate)}
                        className="lg:w-full items-center max-h-[35vh] min-h-[35vh] flex-row border-none bg-gradient-to-r from-[#FF9C1A]/90 to-[#E80505]/90 text-white flex justify-center text-2xl font-bold rounded-2xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:shadow-[#FF9C1A] hover:-translate-y-2"
                      >
                        <h2 className="text-xl text-center font-bold mb-4">
                          {certificate.title}
                        </h2>

                        <img
                          src={certificate?.certificate}
                          alt="Certificate Image"
                          className="lg:w-[25vw] lg:max-w-[20vw] max-h-[25vh] rounded-xl"
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* </div> */}
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

export default PortfolioNonAcademic;
