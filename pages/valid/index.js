import React from "react";
import DashNav from "../../Components/Nav/DashNav";
import { Button, Col, Row } from "antd";
import Footer from "../../Components/Footer/Footer";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Logo } from "../../Components";

const Valid = () => {
  const [info, setInfo] = React.useState("");
  const [sayCongrats, setSayCongrats] = React.useState(true);
  const router = useRouter();
  const toastShownRef = React.useRef(false);

  // Route Protection
  React.useEffect(() => {
    const NFTdata = localStorage.getItem("NFT");
    if (!NFTdata) {
      router.replace("/validation");
      if (!toastShownRef.current) {
        toast("Verify the Certificate", {
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
      setInfo(JSON.parse(NFTdata));
    }

    const hideGifTimer = setTimeout(() => {
      setSayCongrats(false);
    }, 2000);

    return () => clearTimeout(hideGifTimer);
  }, [router]);

  if (!info) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  // Handling Back Button Click
  const handleBack = () => {
    try {
      localStorage.removeItem("NFT");
      router.push("/validation");
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in Login: ", error);
    }
  };

  return (
    <>
      <DashNav />
      {sayCongrats && (
        <img
          src="./Congrats.gif"
          alt="Congrats GIF"
          className="fixed h-full w-full inset-0 grid place-content-center z-50"
        />
      )}
      <Row className="flex w-full h-full items-center">
        <Col
          lg={13}
          className="flex items-center h-full lg:h-[93vh] justify-center flex-col lg:pl-16 pt-10"
        >
          <div className="flex justify-start w-full mt-5">
            <Button onClick={handleBack} type="primary">
              Back
            </Button>
          </div>

          <div className="border-dashed border-2 border-[#0080DC] bg-white/10 p-5 rounded-3xl mb-10">
            <img
              src={info?.certificate}
              alt="Certificate Image"
              className="max-w-[50vw] max-h-[50vh]"
            />
          </div>
          <div className="flex w-full gap-x-5 justify-center items-center">
            <button className="rounded-full text-2xl font-semibold hover:border-white hover:bg-[#15C586] hover:text-black text-white bg-[#0080DC] py-4 px-8 border-2 border-[#15C586]">
              <a
                download
                href={info?.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-black "
              >
                <span>Download Certificate</span>
              </a>
            </button>
            <a
              download
              href={info?.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <img
                src="./Download_Icon.png"
                alt="Download Icon"
                className="w-14 pt-2"
              />
            </a>
          </div>
        </Col>
        <Col
          lg={11}
          className="flex flex-col gap-y-10 w-full justify-center items-center pt-24"
        >
          {/* Title */}
          <Row className="flex w-full justify-start gap-5 items-center">
            <Col
              lg={5}
              className="flex justify-end text-end text-white text-2xl font-semibold"
            >
              Title:
            </Col>
            <Col lg={12}>
              <Row className="flex w-full bg-white items-center rounded-2xl py-2">
                <Col className="flex flex-grow pl-5 items-center">
                  <div className="border-none bg-white text-black tex text-2xl flex items-center font-bold cursor-pointer">
                    {info?.title}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Certificate ID */}
          <Row className="flex w-full justify-start gap-5 items-center">
            <Col
              lg={5}
              className="flex justify-end text-end text-white text-2xl font-semibold"
            >
              Certificate ID:
            </Col>
            <Col lg={12}>
              <Row className="flex w-full bg-white items-center rounded-2xl py-2">
                <Col className="flex flex-grow pl-5 items-center">
                  <div className="border-none bg-white text-black tex text-2xl flex items-center font-bold cursor-pointer">
                    {info?.certificateID}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* User Email */}
          <Row className="flex w-full justify-start gap-5 items-center">
            <Col
              lg={5}
              className="flex justify-end text-end text-white text-2xl font-semibold"
            >
              Email ID:
            </Col>
            <Col lg={12}>
              <Row className="flex w-full bg-white items-center rounded-2xl py-2">
                <Col className="flex flex-grow pl-5 items-center">
                  <div className="border-none bg-white text-black tex text-2xl flex items-center font-bold cursor-pointer">
                    {info?.userEmail}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Org */}
          <Row className="flex w-full justify-start gap-5 items-center mb-24">
            <Col
              lg={5}
              className="flex justify-end text-end text-white text-2xl font-semibold"
            >
              Organization:
            </Col>
            <Col lg={12}>
              <Row className="flex w-full bg-white items-center rounded-2xl py-2">
                <Col className="flex flex-grow pl-5 items-center">
                  <div className="border-none bg-white text-black tex text-2xl flex items-center font-bold cursor-pointer">
                    {info?.organisation}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Row className="flex w-full">
          <Col lg={24}>
            <Footer />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Valid;
